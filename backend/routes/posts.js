const express = require('express');
const slugify = require('slugify');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router();

const makeSlug = async (title, excludeId = null) => {
  let slug = slugify(title, { lower: true, strict: true });
  let exists = await Post.findOne({ slug, ...(excludeId && { _id: { $ne: excludeId } }) });
  let counter = 1;
  while (exists) {
    slug = `${slugify(title, { lower: true, strict: true })}-${counter++}`;
    exists = await Post.findOne({ slug, ...(excludeId && { _id: { $ne: excludeId } }) });
  }
  return slug;
};

// ─── PUBLIC ROUTES ────────────────────────────────────────────────

// GET /api/posts  — published posts with pagination, search, filter
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, tag, search, author, featured } = req.query;
    const query = { status: 'published', visibility: 'public' };

    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (author) query.author = author;
    if (featured) query.isFeatured = true;
    if (search) query.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate('category', 'name slug')
        .populate('tags', 'name slug')
        .populate('author', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select('-content -seoMeta -password'),
      Post.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) { next(err); }
});

// GET /api/posts/recent
router.get('/recent', async (req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published', visibility: 'public' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug featuredImage createdAt readingTime')
      .populate('category', 'name slug');
    res.json({ success: true, data: posts });
  } catch (err) { next(err); }
});

// GET /api/posts/popular
router.get('/popular', async (req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published', visibility: 'public' })
      .sort({ views: -1 })
      .limit(5)
      .select('title slug featuredImage views readingTime')
      .populate('category', 'name slug');
    res.json({ success: true, data: posts });
  } catch (err) { next(err); }
});

// GET /api/posts/:slug  — single post by slug (public)
router.get('/:slug', async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name bio avatar socialLinks');

    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
});

// ─── ADMIN ROUTES ─────────────────────────────────────────────────

// GET /api/posts/admin/all  — all posts for admin
router.get('/admin/all', protect, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) query.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate('category', 'name')
        .populate('author', 'name')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select('-content'),
      Post.countDocuments(query),
    ]);

    const stats = {
      total: await Post.countDocuments(),
      published: await Post.countDocuments({ status: 'published' }),
      draft: await Post.countDocuments({ status: 'draft' }),
      scheduled: await Post.countDocuments({ status: 'scheduled' }),
    };

    res.json({ success: true, data: posts, stats, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
});

// GET /api/posts/admin/:id  — single post by ID for editing
router.get('/admin/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name');
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
});

// POST /api/posts  — create post
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, ...rest } = req.body;
    const slug = rest.slug || await makeSlug(title);
    const post = await Post.create({ title, slug, ...rest });
    await post.populate(['category', 'tags', 'author']);
    res.status(201).json({ success: true, data: post });
  } catch (err) { next(err); }
});

// PUT /api/posts/:id  — update post
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { title, slug: newSlug, ...rest } = req.body;
    let slug = newSlug;
    if (!slug && title) slug = await makeSlug(title, req.params.id);
    else if (slug) {
      const existing = await Post.findOne({ slug, _id: { $ne: req.params.id } });
      if (existing) slug = await makeSlug(slug, req.params.id);
    }
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, slug, ...rest },
      { new: true, runValidators: true }
    ).populate(['category', 'tags', 'author']);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
});

// DELETE /api/posts/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) { next(err); }
});

// DELETE /api/posts/bulk  — bulk delete
router.post('/bulk-delete', protect, async (req, res, next) => {
  try {
    const { ids } = req.body;
    await Post.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: `${ids.length} posts deleted` });
  } catch (err) { next(err); }
});

module.exports = router;
