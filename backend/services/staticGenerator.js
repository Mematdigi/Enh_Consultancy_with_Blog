const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const Post = require('../models/Post');

// Path to the frontend build directory
const DIST_DIR = path.join(__dirname, '../../frontend/dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://enh.consulting';

// The sitemap ALWAYS advertises the real public domain, regardless of what
// SITE_ORIGIN is set to for internal Puppeteer prerendering (e.g. if that's
// pointed at 127.0.0.1). Search engines must never see a localhost URL.
const PUBLIC_URL = 'https://enh.consulting';

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

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

function getTemplate() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.warn(`[StaticGenerator] Base index.html template not found at ${INDEX_HTML_PATH}. Run 'npm run build' in frontend first.`);
    return null;
  }
  const raw = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  return emptyRootDiv(raw);
}

function injectMeta(html, { title, description, canonicalUrl, ogType = 'website', siteName = 'ENH Consulting', locale = 'en_US', image }) {
  let updatedHtml = html;
  const esc = (str) => String(str ?? '').replace(/"/g, '&quot;');

  const titleRegex = /<title>[^<]*<\/title>/i;
  const newTitle = `<title>${title}</title>`;
  if (titleRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(titleRegex, newTitle);
  } else {
    updatedHtml = updatedHtml.replace('<head>', `<head>${newTitle}`);
  }

  const descRegex = /<meta[^>]*name=["']description["'][^>]*>/gi;
  const newDesc = `<meta name="description" content="${esc(description)}" data-rh="true">`;
  if (descRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(descRegex, newDesc);
  } else {
    updatedHtml = updatedHtml.replace('</head>', `${newDesc}</head>`);
  }

  const canonicalRegex = /<link[^>]*rel=["']canonical["'][^>]*>/gi;
  const newCanonical = `<link rel="canonical" href="${canonicalUrl}" data-rh="true">`;
  if (canonicalRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(canonicalRegex, newCanonical);
  } else {
    updatedHtml = updatedHtml.replace('</head>', `${newCanonical}</head>`);
  }

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

function stripInitialDataScript(html) {
  return html.replace(/<script>\s*window\.__INITIAL_DATA__\s*=[\s\S]*?<\/script>/, '');
}

let browserInstance = null;

async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browserInstance;
}

async function closeBrowser() {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

async function prerenderHtml(url, waitSelector) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    if (waitSelector) {
      await page.waitForSelector(waitSelector, { timeout: 15000 }).catch(() => {
        console.warn(`[StaticGenerator] Selector "${waitSelector}" never appeared on ${url} — capturing whatever rendered anyway.`);
      });
    }
    await new Promise((r) => setTimeout(r, 400));
    return await page.content();
  } finally {
    await page.close();
  }
}

// ── Sitemap ──────────────────────────────────────────────────────
// These marketing pages don't change often. If you redesign/rewrite one,
// bump its lastmod here manually. The /blog list itself gets "today" every
// generation since its content (which posts appear) changes constantly.
const STATIC_PAGES = [
  { loc: '/', lastmod: '2026-06-06', priority: '1.0' },
  { loc: '/about', lastmod: '2026-06-06', priority: '0.8' },
  { loc: '/contact', lastmod: '2026-06-06', priority: '0.6' },
  { loc: '/consulting', lastmod: '2026-06-06', priority: '0.9' },
  { loc: '/ai-consulting-services-in-dubai', lastmod: '2026-06-06', priority: '0.9' },
  { loc: '/business-consulting-services-in-dubai', lastmod: '2026-06-06', priority: '0.9' },
  { loc: '/digital-marketing-consulting-services-in-dubai', lastmod: '2026-06-06', priority: '0.9' },
  { loc: '/edtech-consulting-services-in-dubai', lastmod: '2026-06-06', priority: '0.9' },
  { loc: '/it-consulting-services-in-dubai', lastmod: '2026-06-06', priority: '0.9' },
  { loc: '/startup-consulting-services-in-dubai', lastmod: '2026-06-06', priority: '0.9' },
];

function formatDate(d) {
  return new Date(d).toISOString().split('T')[0];
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrlTag(loc, lastmod, priority) {
  return `<url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n</url>`;
}

/**
 * Regenerates sitemap.xml from the live Post collection.
 *
 * This is the piece that used to be a hand-maintained file — every time a
 * post was published it had to be added here manually, which is why the
 * sitemap you pasted only had 4 old blog URLs despite many more being live.
 * Now it's a plain Mongo query (no Puppeteer, cheap and fast), so it's safe
 * to call this on every publish/update/delete without worrying about cost.
 */
async function generateSitemap() {
  try {
    const posts = await Post.find({ status: 'published', visibility: 'public' })
      .select('slug updatedAt createdAt')
      .sort({ createdAt: -1 });

    const urlTags = [];

    for (const page of STATIC_PAGES) {
      urlTags.push(buildUrlTag(`${PUBLIC_URL}${page.loc}`, page.lastmod, page.priority));
    }

    // /blog list page — lastmod tracks "today" since its content (which
    // posts show up) changes whenever any post is published/edited.
    urlTags.push(buildUrlTag(`${PUBLIC_URL}/blog`, formatDate(new Date()), '0.8'));

    for (const post of posts) {
      const lastmod = formatDate(post.updatedAt || post.createdAt);
      urlTags.push(buildUrlTag(`${PUBLIC_URL}/blog/${post.slug}`, lastmod, '0.7'));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${urlTags.join('\n\n')}\n\n</urlset>\n`;

    ensureDirectoryExistence(SITEMAP_PATH);
    fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
    console.log(`[SitemapGenerator] Successfully generated sitemap.xml (${STATIC_PAGES.length + 1} static + ${posts.length} blog URLs).`);
  } catch (error) {
    console.error(`[SitemapGenerator] Error generating sitemap.xml:`, error);
  }
}

async function generateBlogListPage() {
  try {
    const template = getTemplate();
    if (!template) return;

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
    console.log(`[StaticGenerator] Wrote shell for blog.html, prerendering...`);

    try {
      const renderedHtml = await prerenderHtml(canonicalUrl, '.showcase-card, [class*="grid"] a');
      const finalHtml = stripInitialDataScript(renderedHtml);
      fs.writeFileSync(outputPath, finalHtml, 'utf8');
      console.log(`[StaticGenerator] Successfully prerendered blog.html`);
    } catch (renderErr) {
      console.error(`[StaticGenerator] Prerender failed for blog.html, keeping shell version:`, renderErr.message);
    }

    const staleIndexPath = path.join(DIST_DIR, 'blog', 'index.html');
    if (fs.existsSync(staleIndexPath)) {
      fs.unlinkSync(staleIndexPath);
      console.log(`[StaticGenerator] Removed stale blog/index.html left over from react-snap.`);
    }
  } catch (error) {
    console.error(`[StaticGenerator] Error generating blog.html:`, error);
  }
}

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
    console.log(`[StaticGenerator] Wrote shell for blog/${post.slug}.html, prerendering...`);

    const renderUrl = canonicalUrl.replace('https://enh.consulting', SITE_ORIGIN);

    try {
      const renderedHtml = await prerenderHtml(renderUrl, '.blog-content');
      const finalHtml = stripInitialDataScript(renderedHtml);
      fs.writeFileSync(outputPath, finalHtml, 'utf8');
      console.log(`[StaticGenerator] Successfully prerendered blog/${post.slug}.html`);
    } catch (renderErr) {
      console.error(`[StaticGenerator] Prerender failed for ${post.slug}, keeping shell version (meta tags only, no rendered content):`, renderErr.message);
    }

    // New post live (or an existing one just got edited/republished) —
    // keep sitemap.xml in sync automatically, no manual step required.
    await generateSitemap();
  } catch (error) {
    console.error(`[StaticGenerator] Error generating post page for ${post?.slug}:`, error);
  }
}

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
  // Fire-and-forget: pull the deleted post's URL back out of the sitemap too.
  generateSitemap();
}

async function regenerateAllBlogPages() {
  try {
    console.log(`[StaticGenerator] Starting full regeneration of static blog pages...`);

    await generateBlogListPage();

    const query = { status: 'published', visibility: 'public' };
    const posts = await Post.find(query)
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('author', 'name bio avatar socialLinks');

    for (const post of posts) {
      await generatePostPage(post); // already calls generateSitemap() internally
    }

    console.log(`[StaticGenerator] Completed full regeneration of static blog pages (${posts.length} posts).`);
  } catch (error) {
    console.error(`[StaticGenerator] Error in full regeneration:`, error);
  } finally {
    await closeBrowser();
  }
}

process.on('SIGINT', async () => { await closeBrowser(); process.exit(0); });
process.on('SIGTERM', async () => { await closeBrowser(); process.exit(0); });

module.exports = {
  generateBlogListPage,
  generatePostPage,
  deletePostPage,
  regenerateAllBlogPages,
  generateSitemap,
};