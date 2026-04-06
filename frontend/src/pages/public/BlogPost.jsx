import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import BlogHeader from '../../components/public/BlogHeader';
import BlogSidebar from '../../components/public/BlogSidebar';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

// ── Table of Contents generator ──────────────────────────────────
function buildTOC(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const headings = div.querySelectorAll('h2, h3');
  return Array.from(headings).map((h, i) => ({
    id: `toc-${i}`,
    text: h.textContent,
    level: parseInt(h.tagName[1]),
  }));
}

function TableOfContents({ toc }) {
  if (!toc.length) return null;
  return (
    <div className="bg-ink-50 rounded-2xl border border-ink-100 p-5 mb-8">
      <h4 className="font-semibold text-ink-700 text-sm uppercase tracking-wider mb-3">Table of Contents</h4>
      <ul className="space-y-1.5">
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a href={`#${item.id}`}
              className="text-sm text-ink-600 hover:text-brand-600 transition-colors leading-snug block">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Comment form ──────────────────────────────────────────────────
function CommentForm({ postId, onSubmitted }) {
  const [form, setForm] = useState({ name: '', email: '', body: '', website: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/comments', { ...form, post: postId });
      toast.success('Comment submitted! It will appear after approval.');
      setForm({ name: '', email: '', body: '', website: '' });
      onSubmitted?.();
    } catch { toast.error('Failed to submit comment'); }
    finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-serif font-bold text-ink-800 text-xl">Leave a Comment</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Name *</label>
          <input type="text" className="input" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className="label">Email *</label>
          <input type="email" className="input" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </div>
      </div>
      <div>
        <label className="label">Website</label>
        <input type="url" className="input" placeholder="https://…" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
      </div>
      <div>
        <label className="label">Comment *</label>
        <textarea className="textarea h-28" required value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary">
        {submitting ? 'Submitting…' : 'Post Comment'}
      </button>
    </form>
  );
}

// ── Share buttons ─────────────────────────────────────────────────
function ShareButtons({ title, url }) {
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-ink-600">Share:</span>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-full hover:opacity-80 transition-opacity">
        𝕏 Twitter
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-full hover:opacity-80 transition-opacity">
        Facebook
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 text-white text-xs font-medium rounded-full hover:opacity-80 transition-opacity">
        LinkedIn
      </a>
      <button onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink-100 text-ink-700 text-xs font-medium rounded-full hover:bg-ink-200 transition-colors">
        📋 Copy Link
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [toc, setToc] = useState([]);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const { data } = await api.get(`/posts/${slug}`);
        const p = data.data;
        setPost(p);
        setToc(buildTOC(p.content));

        // Inject heading IDs and set content
        setTimeout(() => {
          if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll('h2, h3');
            headings.forEach((h, i) => { h.id = `toc-${i}`; });

            // Add copy buttons to code blocks
            contentRef.current.querySelectorAll('pre').forEach((pre) => {
              if (!pre.querySelector('.copy-code-btn')) {
                const btn = document.createElement('button');
                btn.className = 'copy-code-btn';
                btn.textContent = 'Copy';
                btn.onclick = () => {
                  const code = pre.querySelector('code');
                  navigator.clipboard.writeText(code?.textContent || pre.textContent).then(() => {
                    btn.textContent = 'Copied!';
                    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
                  });
                };
                pre.style.position = 'relative';
                pre.appendChild(btn);
              }
            });

            // Image preview modal
            contentRef.current.querySelectorAll('img').forEach((img) => {
              img.style.cursor = 'zoom-in';
              img.onclick = () => {
                const overlay = document.createElement('div');
                overlay.className = 'img-preview-overlay';
                const clone = document.createElement('img');
                clone.src = img.src;
                clone.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;';
                overlay.appendChild(clone);
                overlay.onclick = () => document.body.removeChild(overlay);
                document.body.appendChild(overlay);
              };
            });
          }
        }, 100);

        // Load related posts
        if (p.category?._id) {
          const rel = await api.get(`/posts?category=${p.category._id}&limit=4`);
          setRelated(rel.data.data.filter((r) => r._id !== p._id).slice(0, 3));
        }

        // Load comments
        const comm = await api.get(`/comments/post/${p._id}`);
        setComments(comm.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen" style={{ backgroundColor: 'linear-gradient(135deg, rgb(255, 244, 225) 0%, rgb(253, 237, 206) 60%, rgb(255, 215, 138) 100%)' }}>
      {/* <BlogHeader /> */}
      <div className="  mx-auto px-4 py-16 text-center text-ink-400">
        <div className="animate-pulse space-y-4 max-w-2xl mx-auto">
          <div className="h-8 bg-ink-100 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-ink-100 rounded w-1/2 mx-auto" />
          <div className="aspect-[16/7] bg-ink-100 rounded-2xl mt-8" />
        </div>
      </div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen" style={{ backgroundColor: 'linear-gradient(135deg, rgb(255, 244, 225) 0%, rgb(253, 237, 206) 60%, rgb(255, 215, 138) 100%)' }}>
      {/* <BlogHeader /> */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="font-serif text-2xl font-bold text-ink-900 mb-2">Post Not Found</h1>
        <Link to="/" className="btn-primary mt-4 inline-flex">← Back to Blog</Link>
      </div>
    </div>
  );

  const postUrl = window.location.href;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'linear-gradient(135deg, rgb(255, 244, 225) 0%, rgb(253, 237, 206) 60%, rgb(255, 215, 138) 100%)' }}>
      {/* <BlogHeader /> */}

      {/* Featured Image */}
      {post.featuredImage?.url && (
        <div className="w-full max-h-[480px] overflow-hidden">
          <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} className="w-full object-cover max-h-[480px]" />
        </div>
      )}

      <main className="  mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              {post.category && (
                <Link to={`/category/${post.category.slug}`} className="inline-block mb-3 text-xs font-semibold text-brand-600 uppercase tracking-wider hover:text-brand-700">
                  {post.category.name}
                </Link>
              )}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 leading-tight mb-4">{post.title}</h1>

              <div className="flex items-center gap-4 flex-wrap">
                {post.author && (
                  <div className="flex items-center gap-2">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-sm font-bold">{post.author.name[0]}</div>
                    )}
                    <span className="text-sm font-medium text-ink-700">{post.author.name}</span>
                  </div>
                )}
                <span className="text-ink-300">·</span>
                <span className="text-sm text-ink-500">{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
                {post.readingTime && (
                  <>
                    <span className="text-ink-300">·</span>
                    <span className="text-sm text-ink-500">{post.readingTime} min read</span>
                  </>
                )}
                <span className="text-ink-300">·</span>
                <span className="text-sm text-ink-500">{post.views || 0} views</span>
              </div>

              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <Link key={tag._id} to={`/tag/${tag.slug}`}
                      className="text-xs px-2.5 py-1 bg-ink-100 text-ink-600 rounded-full hover:bg-brand-100 hover:text-brand-700 transition-colors">
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Table of Contents */}
            <TableOfContents toc={toc} />

            {/* Content */}
            <div
              ref={contentRef}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share */}
            <div className="mt-10 pt-8 border-t border-ink-100">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Author Bio */}
            {post.author?.bio && (
              <div className="mt-8 bg-white rounded-2xl border border-ink-100 p-6 flex items-start gap-4">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-2xl font-bold flex-shrink-0">{post.author.name[0]}</div>
                )}
                <div>
                  <p className="font-semibold text-ink-900">About {post.author.name}</p>
                  <p className="text-ink-500 text-sm mt-1 leading-relaxed">{post.author.bio}</p>
                  <div className="flex gap-3 mt-2">
                    {Object.entries(post.author.socialLinks || {}).map(([k, v]) =>
                      v ? <a key={k} href={v} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline capitalize">{k} ↗</a> : null
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mt-10">
                <h2 className="font-serif text-2xl font-bold text-ink-900 mb-5">Related Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link key={r._id} to={`/blog/${r.slug}`} className="group">
                      <div className="aspect-[16/9] rounded-xl overflow-hidden bg-ink-100 mb-2">
                        {r.featuredImage?.url && (
                          <img src={r.featuredImage.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-ink-800 group-hover:text-brand-600 transition-colors line-clamp-2">{r.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="mt-10 pt-8 border-t border-ink-100">
              {comments.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-ink-900 mb-5">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h2>
                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div key={c._id} className="bg-white rounded-2xl border border-ink-100 p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm">{c.name[0]}</div>
                          <div>
                            <p className="font-semibold text-ink-900 text-sm">{c.name}</p>
                            <p className="text-xs text-ink-400">{format(new Date(c.createdAt), 'MMM d, yyyy')}</p>
                          </div>
                        </div>
                        <p className="text-ink-700 text-sm leading-relaxed">{c.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-ink-100 p-6">
                <CommentForm postId={post._id} onSubmitted={() => {}} />
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
