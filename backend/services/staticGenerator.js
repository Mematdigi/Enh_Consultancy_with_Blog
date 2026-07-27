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
 * Strips whatever is currently inside <div id="root">...</div>.
 *
 * Why this exists: dist/index.html is produced by react-snap, which
 * prerenders the "/" route and bakes the fully-rendered Home page markup
 * into #root. That's fine for the home page itself, but this file is also
 * reused as the BASE TEMPLATE for /blog and /blog/:slug pages. Without
 * stripping, every blog/post page we generate would inherit the Home
 * page's leftover content in #root. This does a depth-aware scan (not a
 * naive regex) so it correctly finds the matching closing </div> even
 * though the Home page markup is full of nested divs.
 */
function emptyRootDiv(html) {
  const openTagRegex = /<div[^>]*\bid=["']root["'][^>]*>/i;
  const openMatch = openTagRegex.exec(html);
  if (!openMatch) return html;

  const contentStart = openMatch.index + openMatch[0].length;
  const divTagRegex = /<\/?div\b[^>]*>/gi;
  divTagRegex.lastIndex = contentStart;

  let depth = 1;
  let closeIndex = -1;
  let tagMatch;
  while ((tagMatch = divTagRegex.exec(html)) !== null) {
    const isClosing = tagMatch[0].startsWith('</');
    const isSelfClosing = /\/>\s*$/.test(tagMatch[0]);
    if (isClosing) {
      depth--;
      if (depth === 0) {
        closeIndex = tagMatch.index;
        break;
      }
    } else if (!isSelfClosing) {
      depth++;
    }
  }

  if (closeIndex === -1) {
    console.warn('[StaticGenerator] Could not find matching </div> for #root — leaving template untouched to avoid corrupting HTML.');
    return html;
  }

  return html.slice(0, contentStart) + html.slice(closeIndex);
}

/**
 * Reads the base template index.html and strips out any pre-rendered
 * content react-snap left inside #root, so blog/post pages start from a
 * genuinely empty root for React to hydrate into.
 */
function getTemplate() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.warn(`[StaticGenerator] Base index.html template not found at ${INDEX_HTML_PATH}. Run 'npm run build' in frontend first.`);
    return null;
  }
  const raw = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  return emptyRootDiv(raw);
}

/**
 * Clean up existing tags in head and replace/inject title, description,
 * canonical link, and full Open Graph / Twitter Card meta — mirrors exactly
 * what the client-side <Helmet> renders, so crawlers and pre-hydration
 * paint see the same meta as the fully hydrated React page.
 *
 * `image` is optional: { url, width, height, alt }. Pages without a
 * specific image (e.g. the blog list) can omit it.
 */
function injectMeta(html, { title, description, canonicalUrl, ogType = 'website', siteName = 'ENH Consulting', locale = 'en_US', image }) {
  let updatedHtml = html;
  const esc = (str) => String(str ?? '').replace(/"/g, '&quot;');

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
  const newDesc = `<meta name="description" content="${esc(description)}" data-rh="true">`;
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

  // Strip any existing og:*/twitter:* tags first so repeated regeneration
  // never accumulates duplicates (idempotent).
  updatedHtml = updatedHtml.replace(/\s*<meta[^>]*property=["']og:[^"']+["'][^>]*>/gi, '');
  updatedHtml = updatedHtml.replace(/\s*<meta[^>]*name=["']twitter:[^"']+["'][^>]*>/gi, '');

  const ogTags = [
    `<meta property="og:type" content="${esc(ogType)}" />`,
    `<meta property="og:site_name" content="${esc(siteName)}" />`,
    `<meta property="og:locale" content="${esc(locale)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonicalUrl)}" />`,
  ];

  const twitterTags = [
    `<meta name="twitter:card" content="${image?.url ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  ];

  if (image?.url) {
    ogTags.push(`<meta property="og:image" content="${esc(image.url)}" />`);
    if (image.width) ogTags.push(`<meta property="og:image:width" content="${esc(image.width)}" />`);
    if (image.height) ogTags.push(`<meta property="og:image:height" content="${esc(image.height)}" />`);
    if (image.alt) ogTags.push(`<meta property="og:image:alt" content="${esc(image.alt)}" />`);
    twitterTags.push(`<meta name="twitter:image" content="${esc(image.url)}" />`);
  }

  updatedHtml = updatedHtml.replace('</head>', `${ogTags.join('\n    ')}\n    ${twitterTags.join('\n    ')}\n  </head>`);

  return updatedHtml;
}

/**
 * Inject hydration data (window.__INITIAL_DATA__) before </body>.
 *
 * NOTE: This intentionally does NOT touch <div id="root">. The root div is
 * left exactly as it comes from the build (empty) so the real React app is
 * the single source of truth for markup. We only pre-seed the data it needs,
 * so first paint doesn't wait on an API round trip, and crawlers get meta
 * tags without a second, hand-maintained copy of the UI to keep in sync.
 */
function injectInitialData(html, initialData) {
  let updatedHtml = html;

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
 * Only meta tags + initial data are injected — React renders all content.
 */
async function generateBlogListPage() {
  try {
    const template = getTemplate();
    if (!template) return;

    // Fetch the first page of blogs (same query the client-side API call uses)
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

    let html = injectMeta(template, { title, description, canonicalUrl });
    html = injectInitialData(html, { posts, page: 1, featured });

    const outputPath = path.join(DIST_DIR, 'blog.html');
    ensureDirectoryExistence(outputPath);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`[StaticGenerator] Successfully generated blog.html`);

    // react-snap crawls the "/blog" route at build time and creates its own
    // blog/index.html (stale, build-time content) alongside our blog.html.
    // Since /blog is canonical (no trailing slash) and blog.html is the file
    // we want served for it, we remove react-snap's leftover index.html so
    // there's no second, stale file competing for the same route.
    const staleIndexPath = path.join(DIST_DIR, 'blog', 'index.html');
    if (fs.existsSync(staleIndexPath)) {
      fs.unlinkSync(staleIndexPath);
      console.log(`[StaticGenerator] Removed stale blog/index.html left over from react-snap.`);
    }
  } catch (error) {
    console.error(`[StaticGenerator] Error generating blog.html:`, error);
  }
}

/**
 * Generate the pre-rendered HTML for a single Blog Post Page (/blog/:slug)
 * Only meta tags + initial data are injected — React renders all content.
 */
async function generatePostPage(post) {
  try {
    if (!post || post.status !== 'published') return;

    const template = getTemplate();
    if (!template) return;

    const title = post.seoMeta?.metaTitle || post.title;
    const description = post.seoMeta?.metaDescription || post.excerpt || post.title;
    const canonicalUrl = `https://enh.consulting/blog/${post.slug}`;
    const image = post.featuredImage?.url
      ? { url: post.featuredImage.url, width: 150, height: 138, alt: post.featuredImage.alt }
      : undefined;

    let html = injectMeta(template, { title, description, canonicalUrl, ogType: 'website', image });
    html = injectInitialData(html, post);

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