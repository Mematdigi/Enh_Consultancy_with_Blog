const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, trim: true, maxlength: 500 },
    content: { type: String, required: true },
    featuredImage: {
      url: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'draft',
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'password'],
      default: 'public',
    },
    password: { type: String },
    scheduledAt: { type: Date },
    seoMeta: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      ogImage: { type: String },
    },
    readingTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Full-text search index
postSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

// Calculate reading time before save
postSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
    this.readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
