const express = require('express');
const slugify = require('slugify');
const { Category } = require('../models');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/categories  — all categories with post count
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const withCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Post.countDocuments({ category: cat._id, status: 'published' });
        return { ...cat.toObject(), postCount: count };
      })
    );
    res.json({ success: true, data: withCount });
  } catch (err) { next(err); }
});

// GET /api/categories/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const cat = await Category.findOne({ slug: req.params.slug });
    if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: cat });
  } catch (err) { next(err); }
});

// POST /api/categories
router.post('/', protect, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const cat = await Category.create({ name, slug, description });
    res.status(201).json({ success: true, data: cat });
  } catch (err) { next(err); }
});

// PUT /api/categories/:id
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const cat = await Category.findByIdAndUpdate(req.params.id, { name, slug, description }, { new: true });
    res.json({ success: true, data: cat });
  } catch (err) { next(err); }
});

// DELETE /api/categories/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
