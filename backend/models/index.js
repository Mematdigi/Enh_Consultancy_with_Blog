const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ─── CATEGORY ─────────────────────────────────────────────────────
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);
const Category = mongoose.model('Category', categorySchema);

// ─── TAG ──────────────────────────────────────────────────────────
const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);
const Tag = mongoose.model('Tag', tagSchema);

// ─── AUTHOR ───────────────────────────────────────────────────────
const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    avatar: { type: String, default: '' },
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true }
);
const Author = mongoose.model('Author', authorSchema);

// ─── MEDIA ────────────────────────────────────────────────────────
const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    filename: { type: String, required: true },
    originalName: { type: String },
    alt: { type: String, default: '' },
    size: { type: Number },
    mimetype: { type: String },
    publicId: { type: String }, // for cloudinary
  },
  { timestamps: true }
);
const Media = mongoose.model('Media', mediaSchema);

// ─── COMMENT ──────────────────────────────────────────────────────
const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    body: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: false },
    website: { type: String },
  },
  { timestamps: true }
);
const Comment = mongoose.model('Comment', commentSchema);

// ─── USER (ADMIN) ─────────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = { Category, Tag, Author, Media, Comment, User };
