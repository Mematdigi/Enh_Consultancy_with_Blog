// ── TAGS ──────────────────────────────────────────────────────────
const express = require('express');
const slugify = require('slugify');
const { Tag, Author, Media, Comment } = require('../models');
const Post = require('../models/Post');
const upload = require('../config/upload');
const { protect } = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

// ─── TAGS ROUTER ──────────────────────────────────────────────────
const tagRouter = express.Router();

tagRouter.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    const withCount = await Promise.all(
      tags.map(async (tag) => {
        const count = await Post.countDocuments({ tags: tag._id, status: 'published' });
        return { ...tag.toObject(), postCount: count };
      })
    );
    res.json({ success: true, data: withCount });
  } catch (err) { next(err); }
});

tagRouter.post('/', protect, async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const tag = await Tag.create({ name, slug });
    res.status(201).json({ success: true, data: tag });
  } catch (err) { next(err); }
});

tagRouter.put('/:id', protect, async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const tag = await Tag.findByIdAndUpdate(req.params.id, { name, slug }, { new: true });
    res.json({ success: true, data: tag });
  } catch (err) { next(err); }
});

tagRouter.delete('/:id', protect, async (req, res, next) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Tag deleted' });
  } catch (err) { next(err); }
});

// ─── AUTHORS ROUTER ───────────────────────────────────────────────
const authorRouter = express.Router();

authorRouter.get('/', async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json({ success: true, data: authors });
  } catch (err) { next(err); }
});

authorRouter.post('/', protect, upload.single('avatar'), async (req, res, next) => {
  try {
    const { name, bio, socialLinks } = req.body;
    const avatar = req.file ? (process.env.UPLOAD_TYPE === 'cloudinary' ? req.file.path : `/uploads/${req.file.filename}`) : '';
    const author = await Author.create({
      name, bio, avatar,
      socialLinks: typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks,
    });
    res.status(201).json({ success: true, data: author });
  } catch (err) { next(err); }
});

authorRouter.put('/:id', protect, upload.single('avatar'), async (req, res, next) => {
  try {
    const { name, bio, socialLinks } = req.body;
    const updateData = { name, bio, socialLinks: typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks };
    if (req.file) updateData.avatar = process.env.UPLOAD_TYPE === 'cloudinary' ? req.file.path : `/uploads/${req.file.filename}`;
    const author = await Author.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, data: author });
  } catch (err) { next(err); }
});

authorRouter.delete('/:id', protect, async (req, res, next) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Author deleted' });
  } catch (err) { next(err); }
});

// ─── MEDIA ROUTER ─────────────────────────────────────────────────
const mediaRouter = express.Router();

mediaRouter.get('/', protect, async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = search ? { originalName: { $regex: search, $options: 'i' } } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [media, total] = await Promise.all([
      Media.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Media.countDocuments(query),
    ]);
    res.json({ success: true, data: media, pagination: { total, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
});

mediaRouter.post('/upload', protect, upload.array('images', 10), async (req, res, next) => {
  try {
    const files = req.files;
    const savedMedia = await Promise.all(
      files.map((file) => {
        const url = process.env.UPLOAD_TYPE === 'cloudinary' ? file.path : `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${file.filename}`;
        return Media.create({
          url,
          filename: file.filename || file.public_id,
          originalName: file.originalname,
          alt: '',
          size: file.size,
          mimetype: file.mimetype,
          publicId: file.public_id || null,
        });
      })
    );
    res.status(201).json({ success: true, data: savedMedia });
  } catch (err) { next(err); }
});

mediaRouter.put('/:id', protect, async (req, res, next) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, { alt: req.body.alt }, { new: true });
    res.json({ success: true, data: media });
  } catch (err) { next(err); }
});

mediaRouter.delete('/:id', protect, async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: 'Media not found' });

    if (process.env.UPLOAD_TYPE !== 'cloudinary') {
      const filePath = path.join(__dirname, '../uploads', media.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Media deleted' });
  } catch (err) { next(err); }
});

// ─── COMMENTS ROUTER ──────────────────────────────────────────────
const commentRouter = express.Router();

commentRouter.get('/', protect, async (req, res, next) => {
  try {
    const { approved } = req.query;
    const query = approved !== undefined ? { approved: approved === 'true' } : {};
    const comments = await Comment.find(query).populate('post', 'title slug').sort({ createdAt: -1 });
    res.json({ success: true, data: comments });
  } catch (err) { next(err); }
});

commentRouter.get('/post/:postId', async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId, approved: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: comments });
  } catch (err) { next(err); }
});

commentRouter.post('/', async (req, res, next) => {
  try {
    const { post, name, email, body, website } = req.body;
    const comment = await Comment.create({ post, name, email, body, website });
    res.status(201).json({ success: true, data: comment, message: 'Comment submitted for review' });
  } catch (err) { next(err); }
});

commentRouter.put('/:id/approve', protect, async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json({ success: true, data: comment });
  } catch (err) { next(err); }
});

commentRouter.delete('/:id', protect, async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Comment deleted' });
  } catch (err) { next(err); }
});

module.exports = { tagRouter, authorRouter, mediaRouter, commentRouter };
