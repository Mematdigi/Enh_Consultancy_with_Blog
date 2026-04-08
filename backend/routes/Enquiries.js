const express = require('express');
const Enquiry = require('../models/Enquiry');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ─── Validation helper ─────────────────────────────────────────────────────────
const REQUIRED_BY_SOURCE = {
  'banner-quote':      ['email'],
  'home-contact':      ['name', 'email'],
  'home-newsletter':   ['name', 'email'],
  'footer-subscribe':  ['email'],
  'svp-hero':          ['name', 'phone', 'email'],
  'svp-contact':       ['name', 'phone', 'email'],
};

function validateEnquiry(body) {
  const { source } = body;
  const required = REQUIRED_BY_SOURCE[source];
  if (!required) return `Invalid source: "${source}"`;

  for (const field of required) {
    if (!body[field] || !body[field].toString().trim()) {
      return `Field "${field}" is required for source "${source}"`;
    }
  }

  // Basic email format check
  const emailField = body.email;
  if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField)) {
    return 'Invalid email address';
  }

  return null; // no error
}

// ─── PUBLIC: POST /api/enquiries ───────────────────────────────────────────────
// Accepts form submissions from all frontend forms
router.post('/', async (req, res, next) => {
  try {
    const error = validateEnquiry(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const {
      name, fullName, email, phone, message,
      subject, service, website, source,
    } = req.body;

    const enquiry = await Enquiry.create({
      name: name || fullName,
      fullName,
      email,
      phone,
      message,
      subject,
      service,
      website,
      source,
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. We will get back to you shortly.',
      data: { id: enquiry._id },
    });
  } catch (err) {
    next(err);
  }
});

// ─── ADMIN: GET /api/enquiries ─────────────────────────────────────────────────
// List all enquiries with pagination, filter by source / status
router.get('/', protect, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, source, status, search } = req.query;
    const query = {};

    if (source) query.source = source;
    if (status) query.status = status;
    if (search) {
      const re = new RegExp(search, 'i');
      query.$or = [{ name: re }, { email: re }, { phone: re }, { message: re }];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [enquiries, total] = await Promise.all([
      Enquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Enquiry.countDocuments(query),
    ]);

    // Summary counts per status
    const [totalAll, newCount, readCount, repliedCount, archivedCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.countDocuments({ status: 'read' }),
      Enquiry.countDocuments({ status: 'replied' }),
      Enquiry.countDocuments({ status: 'archived' }),
    ]);

    res.json({
      success: true,
      data: enquiries,
      stats: { total: totalAll, new: newCount, read: readCount, replied: repliedCount, archived: archivedCount },
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─── ADMIN: GET /api/enquiries/:id ────────────────────────────────────────────
router.get('/:id', protect, async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'read' } },   // auto-mark as read when opened
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
});

// ─── ADMIN: PUT /api/enquiries/:id ────────────────────────────────────────────
// Update status and/or adminNote
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { status, adminNote } = req.body;
    const update = {};
    if (status)    update.status    = status;
    if (adminNote !== undefined) update.adminNote = adminNote;

    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
});

// ─── ADMIN: DELETE /api/enquiries/:id ─────────────────────────────────────────
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (err) {
    next(err);
  }
});

// ─── ADMIN: POST /api/enquiries/bulk-delete ───────────────────────────────────
router.post('/bulk-delete', protect, async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No IDs provided' });
    }
    await Enquiry.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: `${ids.length} enquiries deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;