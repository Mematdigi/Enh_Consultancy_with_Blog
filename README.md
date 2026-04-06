# 📰 Blog CMS — Complete Setup Guide

A full-stack Blog CMS with React frontend and Node.js + MongoDB backend.

---

## 📁 Project Structure

```
blog-cms/
├── backend/                  ← Node.js + Express + MongoDB
│   ├── config/
│   │   ├── database.js       ← MongoDB connection
│   │   └── upload.js         ← Multer (local or Cloudinary)
│   ├── middleware/
│   │   ├── auth.js           ← JWT protect middleware
│   │   └── errorHandler.js   ← Global error handler
│   ├── models/
│   │   ├── Post.js           ← Post schema
│   │   └── index.js          ← Category, Tag, Author, Media, Comment, User
│   ├── routes/
│   │   ├── auth.js           ← Login, register, me
│   │   ├── posts.js          ← Full post CRUD + admin routes
│   │   ├── categories.js     ← Category CRUD
│   │   ├── tags.js           ← Tag CRUD
│   │   ├── media.js          ← Media upload + library
│   │   ├── authors.js        ← Author management
│   │   ├── comments.js       ← Comment submission + approval
│   │   └── feed.js           ← /feed.xml + /sitemap.xml
│   ├── utils/
│   │   └── seed.js           ← Database seeder
│   ├── uploads/              ← Local file uploads (auto-created)
│   ├── server.js             ← Express entry point
│   ├── .env.example          ← Environment variable template
│   └── package.json
│
└── frontend/                 ← React + Vite + TailwindCSS
    ├── src/
    │   ├── components/
    │   │   ├── admin/
    │   │   │   └── AdminLayout.jsx    ← Sidebar + layout
    │   │   ├── editor/
    │   │   │   ├── RichEditor.jsx     ← Full rich text editor
    │   │   │   ├── ImageInsertModal.jsx
    │   │   │   ├── LinkModal.jsx
    │   │   │   └── FeaturedImageUploader.jsx
    │   │   └── public/
    │   │       ├── BlogHeader.jsx
    │   │       ├── BlogSidebar.jsx
    │   │       └── PostCard.jsx
    │   ├── context/
    │   │   └── authStore.js           ← Zustand auth state
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminLogin.jsx
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── PostsList.jsx
    │   │   │   ├── PostEditor.jsx     ← Main editor with sidebar
    │   │   │   ├── MediaLibrary.jsx
    │   │   │   ├── CategoriesManager.jsx
    │   │   │   ├── TagsManager.jsx
    │   │   │   ├── AuthorsManager.jsx
    │   │   │   └── CommentsManager.jsx
    │   │   └── public/
    │   │       ├── BlogHome.jsx       ← Hero + grid + sidebar
    │   │       ├── BlogPost.jsx       ← Single post with TOC + comments
    │   │       ├── CategoryPage.jsx
    │   │       ├── TagPage.jsx
    │   │       └── SearchPage.jsx
    │   ├── utils/
    │   │   └── api.js                 ← Axios instance with JWT
    │   ├── styles/
    │   │   └── index.css              ← Tailwind + custom classes
    │   ├── App.jsx                    ← All routes
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 STEP-BY-STEP SETUP

### Prerequisites
- Node.js v18+ installed
- MongoDB (local install OR free MongoDB Atlas account)
- npm or yarn

---

### STEP 1 — Clone / Copy the project

Place the `blog-cms` folder wherever you want on your machine.

---

### STEP 2 — Backend Setup

```bash
cd blog-cms/backend

# Install dependencies
npm install

# Copy the env file
cp .env.example .env
```

Now open `.env` and set your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-cms   # OR your Atlas URI
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRE=7d

# For local file storage (default — no Cloudinary needed):
UPLOAD_TYPE=local

# For Cloudinary storage (optional):
# UPLOAD_TYPE=cloudinary
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**If using local MongoDB:** Make sure MongoDB is running:
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Windows — start MongoDB service from Services panel
# or: net start MongoDB

# Linux
sudo systemctl start mongod
```

**If using MongoDB Atlas:**
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Get your connection string and paste it as `MONGODB_URI`
4. Whitelist your IP in Network Access

---

### STEP 3 — Seed the database

```bash
cd blog-cms/backend

# This creates the admin user + sample categories/tags/author
npm run seed
```

Output will show:
```
✅ Admin user created: admin@blog.com / admin123456
✅ Category: Technology
...
🎉 Seed complete!
```

---

### STEP 4 — Start the Backend

```bash
cd blog-cms/backend

# Development (auto-restart)
npm run dev

# Production
npm start
```

Backend runs at: http://localhost:5000

Test it: http://localhost:5000/api/health → should return `{"status":"ok"}`

---

### STEP 5 — Frontend Setup

```bash
cd blog-cms/frontend

# Install dependencies
npm install
```

---

### STEP 6 — Start the Frontend

```bash
cd blog-cms/frontend
npm run dev
```

Frontend runs at: http://localhost:3000

The Vite proxy automatically forwards `/api/*` calls to the backend.

---

### STEP 7 — Access the App

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Public blog |
| http://localhost:3000/admin/login | Admin login |
| http://localhost:3000/admin/dashboard | Admin dashboard |
| http://localhost:5000/api/health | API health check |
| http://localhost:5000/feed.xml | RSS feed |
| http://localhost:5000/sitemap.xml | Sitemap |

**Login credentials:**
- Email: `admin@blog.com`
- Password: `admin123456`

---

## 🌐 DEPLOYING TO PRODUCTION

### Backend (Node.js)

**Option A — Any VPS / EC2 (Nginx + PM2):**

```bash
# Install PM2 globally
npm install -g pm2

# In backend folder
pm2 start server.js --name blog-cms-backend
pm2 save
pm2 startup

# Nginx config example:
# server {
#   server_name api.yourdomain.com;
#   location / { proxy_pass http://localhost:5000; }
# }
```

**Option B — Render.com (free tier):**
1. Push to GitHub
2. New Web Service → connect repo → set root dir to `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add all environment variables in Render dashboard

### Frontend (React)

**Option A — Build + serve via Nginx:**

```bash
cd frontend
npm run build
# dist/ folder is created — serve with Nginx
```

**Option B — Vercel / Netlify (recommended):**
1. Push frontend to GitHub
2. Connect on Vercel/Netlify
3. Set root directory: `frontend`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add env variable: `VITE_API_URL=https://api.yourdomain.com`

> ⚠️ For production, update `vite.config.js` proxy to use your real backend URL,
> or use `VITE_API_URL` in the axios config.

---

## 🖼 IMAGE UPLOADS

### Local (default — development)
Images are saved to `backend/uploads/` and served at `http://localhost:5000/uploads/filename.jpg`

### Cloudinary (recommended for production)
1. Sign up free at https://cloudinary.com
2. Get your Cloud Name, API Key, API Secret from dashboard
3. Set in `.env`:
   ```env
   UPLOAD_TYPE=cloudinary
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```

---

## ✏️ RICH TEXT EDITOR FEATURES

The editor (no external library) supports:

| Feature | How |
|---------|-----|
| Bold / Italic / Underline / Strike | Toolbar buttons |
| H1–H6 | Heading dropdown |
| Text color / Highlight | Color pickers |
| Bullet list / Numbered list | Toolbar buttons |
| Align Left/Center/Right/Justify | Toolbar buttons |
| Indent / Outdent | Toolbar buttons |
| Blockquote | Toolbar button |
| Code block (with copy button) | Toolbar button |
| Insert Link (with alt, target) | 🔗 button → modal |
| Insert Image (upload/URL/library) | 🖼 button → modal |
| YouTube embed | ▶ button → paste URL |
| Horizontal Rule | — button |
| Undo / Redo | ↩ ↪ buttons |
| Clear formatting | ✕ button |
| Image click → preview overlay | Click any image |
| Paste clean from Word/HTML | Auto-stripped |

---

## 🔒 SECURITY NOTES

1. **Change `JWT_SECRET`** to a long random string in production
2. **Change default admin password** after first login
3. **Enable CORS properly** — update `FRONTEND_URL` in `.env`
4. **Use HTTPS** in production (Certbot/Let's Encrypt with Nginx)
5. Registration is disabled in production after first user is created

---

## 📦 API ENDPOINTS REFERENCE

### Auth
```
POST   /api/auth/register      Create first admin user
POST   /api/auth/login         Login → returns JWT token
GET    /api/auth/me            Get current user (protected)
PUT    /api/auth/change-password  (protected)
```

### Posts (Public)
```
GET    /api/posts              Paginated published posts
GET    /api/posts/recent       Latest 5 posts
GET    /api/posts/popular      Most viewed posts
GET    /api/posts/:slug        Single post (increments view)
```

### Posts (Admin — requires Bearer token)
```
GET    /api/posts/admin/all    All posts for admin
GET    /api/posts/admin/:id    Post by ID for editing
POST   /api/posts              Create post
PUT    /api/posts/:id          Update post
DELETE /api/posts/:id          Delete post
POST   /api/posts/bulk-delete  Bulk delete {ids:[]}
```

### Other
```
GET    /api/categories         All categories with post count
POST   /api/categories         Create (protected)
PUT    /api/categories/:id     Update (protected)
DELETE /api/categories/:id     Delete (protected)

GET    /api/tags               All tags
POST   /api/media/upload       Upload images (protected)
GET    /api/media              Media library (protected)

GET    /api/comments/post/:id  Approved comments for post
POST   /api/comments           Submit comment
PUT    /api/comments/:id/approve  Approve (protected)

GET    /feed.xml               RSS Feed
GET    /sitemap.xml            Sitemap
```

---

## 🛠 COMMON ISSUES

**Port 5000 already in use:**
```bash
# Change PORT in backend .env to 5001
# Then update frontend/vite.config.js proxy target
```

**MongoDB connection refused:**
```bash
# Make sure MongoDB is running
mongod --dbpath /data/db
```

**Images not showing in production:**
- Switch to Cloudinary upload mode
- Or configure Nginx to serve the `/uploads` folder

**CORS errors:**
- Make sure `FRONTEND_URL` in `.env` matches your frontend URL exactly

---

## 🎨 CUSTOMIZATION

**Change site name:** Update `BlogHeader.jsx` and `index.html` title

**Add navigation links:** Edit `BlogHeader.jsx` nav section

**Change color scheme:** Edit `tailwind.config.js` → `colors.brand`

**Add new fields to posts:** Edit `models/Post.js` + `PostEditor.jsx`

**Change posts per page:** Edit `limit` values in API calls

---

Built with ❤️ using React, Node.js, Express, MongoDB, TailwindCSS
