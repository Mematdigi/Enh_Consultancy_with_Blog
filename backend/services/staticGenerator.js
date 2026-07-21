const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');

// Path to the frontend build directory
const DIST_DIR = path.join(__dirname, '../../frontend/dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

/**
 * Ensures that a directory exists, creating it if necessary.
 */
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

/**
 * Reads the base template index.html.
 */
function getTemplate() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.warn(`[StaticGenerator] Base index.html template not found at ${INDEX_HTML_PATH}. Run 'npm run build' in frontend first.`);
    return null;
  }
  return fs.readFileSync(INDEX_HTML_PATH, 'utf8');
}

/**
 * Clean up existing tags in head and replace/inject title, description, and canonical link
 */
function injectMeta(html, { title, description, canonicalUrl }) {
  let updatedHtml = html;

  // Replace Title
  const titleRegex = /<title>[^<]*<\/title>/i;
  const newTitle = `<title>${title}</title>`;
  if (titleRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(titleRegex, newTitle);
  } else {
    updatedHtml = updatedHtml.replace('<head>', `<head>${newTitle}`);
  }

  // Replace Description (both standard and react-helmet-async / data-rh versions)
  const descRegex = /<meta[^>]*name=["']description["'][^>]*>/gi;
  const newDesc = `<meta name="description" content="${description.replace(/"/g, '&quot;')}" data-rh="true">`;
  if (descRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(descRegex, newDesc);
  } else {
    updatedHtml = updatedHtml.replace('</head>', `${newDesc}</head>`);
  }

  // Replace Canonical Link
  const canonicalRegex = /<link[^>]*rel=["']canonical["'][^>]*>/gi;
  const newCanonical = `<link rel="canonical" href="${canonicalUrl}" data-rh="true">`;
  if (canonicalRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(canonicalRegex, newCanonical);
  } else {
    updatedHtml = updatedHtml.replace('</head>', `${newCanonical}</head>`);
  }

  // Inject Open Graph tags for better social sharing
  const ogTags = `
    <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
  `;
  updatedHtml = updatedHtml.replace('</head>', `${ogTags}</head>`);

  return updatedHtml;
}

/**
 * Inject page content inside <div id="root"> and hydration data
 */
function injectContentAndData(html, rootHtml, initialData) {
  let updatedHtml = html;

  // Inject content inside root div
  const rootDivRegex = /(<div[^>]*id=["']root["'][^>]*>)(<\/div>)/i;
  if (rootDivRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(rootDivRegex, `$1${rootHtml}$2`);
  }

  // Inject Initial Data script before </body>
  const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')};</script>`;
  if (updatedHtml.includes('</body>')) {
    updatedHtml = updatedHtml.replace('</body>', `${dataScript}</body>`);
  } else {
    updatedHtml += dataScript;
  }

  return updatedHtml;
}

/**
 * Generate the pre-rendered HTML for the Blog Home Page (/blog)
 */
async function generateBlogListPage() {
  try {
    const template = getTemplate();
    if (!template) return;

    // Fetch the first page of blogs (similar to API query)
    const limit = 9;
    const query = { status: 'published', visibility: 'public' };
    const posts = await Post.find(query)
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-content -seoMeta -password');

    let featured = null;
    let blogList = [...posts];
    if (posts.length > 0) {
      featured = posts[0];
      blogList = posts.slice(1);
    }

    const title = 'ENH Consulting Blogs | Expert Tech & AI Insights';
    const description = 'Stay updated with the latest tech, AI, consulting, & business solutions through ENH Consulting Blogs. Discover expert tips to grow your business in Dubai, UAE.';
    const canonicalUrl = 'https://enh.consulting/blog';

    // Build static HTML list representation
    let rootHtml = `
      <div class="min-h-screen bg-gradient-to-br from-[#fff4e1] via-[#fdedce] to-[#ffd78a]">
        <main class="mx-auto px-4 py-8 sm:px-6 sm:py-10">
          <h1 class="text-3xl font-bold mb-8">ENH Consulting Blogs</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
    `;

    if (featured) {
      rootHtml += `
        <article class="featured-post mb-8 p-5 bg-white rounded-2xl shadow-md">
          <h2><a href="/blog/${featured.slug}">${featured.title}</a></h2>
          <p>${featured.excerpt || ''}</p>
        </article>
      `;
    }

    rootHtml += blogList.map(post => `
      <article class="bg-white rounded-2xl p-5 border border-ink-100">
        <h3><a href="/blog/${post.slug}">${post.title}</a></h3>
        <p>${post.excerpt || ''}</p>
      </article>
    `).join('');

    rootHtml += `
          </div>
        </main>
      </div>
    `;

    let html = injectMeta(template, { title, description, canonicalUrl });
    html = injectContentAndData(html, rootHtml, { posts, page: 1, featured });

    const outputPath = path.join(DIST_DIR, 'blog.html');
    ensureDirectoryExistence(outputPath);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`[StaticGenerator] Successfully generated blog.html`);
  } catch (error) {
    console.error(`[StaticGenerator] Error generating blog.html:`, error);
  }
}

/**
 * Generate the pre-rendered HTML for a single Blog Post Page (/blog/:slug)
 */
async function generatePostPage(post) {
  try {
    if (!post || post.status !== 'published') return;

    const template = getTemplate();
    if (!template) return;

    const title = `${post.seoMeta?.metaTitle || post.title} | ENH Consulting Blogs`;
    const description = post.seoMeta?.metaDescription || post.excerpt || post.title;
    const canonicalUrl = `https://enh.consulting/blog/${post.slug}`;

    const authorName = post.author?.name || 'Author';
    const dateStr = post.createdAt ? new Date(post.createdAt).toDateString() : '';

    const rootHtml = `
      <div class="min-h-screen" style="background-color: linear-gradient(135deg, rgb(255, 244, 225) 0%, rgb(253, 237, 206) 60%, rgb(255, 215, 138) 100%)">
        <main class="mx-auto px-4 sm:px-6 py-10">
          <article class="blog-article">
            <header class="mb-8">
              <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-4">${post.title}</h1>
              <div class="flex items-center gap-4">
                <span>By ${authorName}</span> · 
                <span>${dateStr}</span>
              </div>
            </header>
            <div class="blog-content">${post.content}</div>
          </article>
        </main>
      </div>
    `;

    let html = injectMeta(template, { title, description, canonicalUrl });
    html = injectContentAndData(html, rootHtml, post);

    const outputPath = path.join(DIST_DIR, 'blog', `${post.slug}.html`);
    ensureDirectoryExistence(outputPath);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`[StaticGenerator] Successfully generated blog/${post.slug}.html`);
  } catch (error) {
    console.error(`[StaticGenerator] Error generating post page for ${post?.slug}:`, error);
  }
}

/**
 * Delete a pre-rendered HTML page for a single Blog Post
 */
function deletePostPage(slug) {
  try {
    const filePath = path.join(DIST_DIR, 'blog', `${slug}.html`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`[StaticGenerator] Successfully deleted blog/${slug}.html`);
    }
  } catch (error) {
    console.error(`[StaticGenerator] Error deleting blog/${slug}.html:`, error);
  }
}

/**
 * Regenerate all blog lists and individual blog post pages.
 */
async function regenerateAllBlogPages() {
  try {
    console.log(`[StaticGenerator] Starting full regeneration of static blog pages...`);
    
    // Generate the list page
    await generateBlogListPage();

    // Fetch and generate all published, public posts
    const query = { status: 'published', visibility: 'public' };
    const posts = await Post.find(query)
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name bio avatar socialLinks');

    for (const post of posts) {
      await generatePostPage(post);
    }
    
    console.log(`[StaticGenerator] Completed full regeneration of static blog pages (${posts.length} posts).`);
  } catch (error) {
    console.error(`[StaticGenerator] Error in full regeneration:`, error);
  }
}

module.exports = {
  generateBlogListPage,
  generatePostPage,
  deletePostPage,
  regenerateAllBlogPages,
};
