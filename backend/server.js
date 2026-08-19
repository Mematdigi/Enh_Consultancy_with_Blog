const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');
const mediaRoutes = require('./routes/media');
const authorRoutes = require('./routes/authors');
const commentRoutes = require('./routes/comments');
const feedRoutes = require('./routes/feed');
const enquiryRoutes = require('./routes/Enquiries'); // ← NEW
const { generateSitemap } = require('./services/staticGenerator');

const app = express();

// Connect to MongoDB
connectDB().then(() => {
  const { regenerateAllBlogPages } = require('./services/staticGenerator');
  regenerateAllBlogPages();
});

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/enquiries', enquiryRoutes); // ← NEW
app.use('/', feedRoutes); // /feed.xml and /sitemap.xml

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV}`);
});
generateSitemap();

module.exports = app;