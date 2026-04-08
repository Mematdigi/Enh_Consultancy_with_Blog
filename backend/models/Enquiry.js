const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    // ── Common fields ──────────────────────────────────────────────
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    message: { type: String, trim: true },

    // ── Extended fields (per form) ─────────────────────────────────
    subject: { type: String, trim: true },         // Home contact form
    service: { type: String, trim: true },          // Banner / Newsletter / SVP contact
    website: { type: String, trim: true },          // SVP hero form
    fullName: { type: String, trim: true },         // Banner quote form alias

    // ── Source tracking ────────────────────────────────────────────
    source: {
      type: String,
      enum: [
        'banner-quote',         // banner.jsx Request A Quote
        'home-contact',         // Home.jsx ContactSection
        'home-newsletter',      // Home.jsx Newsletter
        'footer-subscribe',     // Footer.jsx Subscribe
        'svp-hero',             // ServiceViewPage HeroBanner
        'svp-contact',          // ServiceViewPage ContactSection
      ],
      required: true,
    },

    // ── Admin workflow ─────────────────────────────────────────────
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    adminNote: { type: String, trim: true },
  },
  { timestamps: true }
);

// Index for quick admin queries
enquirySchema.index({ source: 1, status: 1, createdAt: -1 });
enquirySchema.index({ email: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);