const express = require('express');
const Post = require('../models/Post');
const { Category } = require('../models');

const router = express.Router();

// GET /feed.xml  — RSS Feed
router.get('/feed.xml', async (req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('category', 'name')
      .populate('author', 'name');

    const siteUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const items = posts.map((p) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${siteUrl}/blog/${p.slug}</link>
        <guid>${siteUrl}/blog/${p.slug}</guid>
        <pubDate>${new Date(p.createdAt).toUTCString()}</pubDate>
        <description><![CDATA[${p.excerpt || ''}]]></description>
        ${p.category ? `<category>${p.category.name}</category>` : ''}
      </item>`).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog CMS</title>
    <link>${siteUrl}</link>
    <description>Latest blog posts</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

    res.set('Content-Type', 'application/rss+xml');
    res.send(rss);
  } catch (err) { next(err); }
});

// GET /sitemap.xml
router.get('/sitemap.xml', async (req, res, next) => {
  try {
    const siteUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const posts = await Post.find({ status: 'published' }).select('slug updatedAt');
    const categories = await Category.find().select('slug updatedAt');

    const postUrls = posts.map((p) => `
  <url>
    <loc>${siteUrl}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    const catUrls = categories.map((c) => `
  <url>
    <loc>${siteUrl}/category/${c.slug}</loc>
    <lastmod>${new Date(c.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${postUrls}
  ${catUrls}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (err) { next(err); }
});

module.exports = router;
