import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import BlogHeader from '../../components/public/BlogHeader';
import BlogSidebar from '../../components/public/BlogSidebar';
import PostCard from '../../components/public/PostCard';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/posts?page=${page}&limit=9`);
        const all = data.data;
        if (page === 1 && all.length > 0) {
          setFeatured(all[0]);
          setPosts(all.slice(1));
        } else {
          setPosts(all);
        }
        setPagination(data.pagination);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [page]);

const postUrl = window.location.href;
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'linear-gradient(135deg, rgb(255, 244, 225) 0%, rgb(253, 237, 206) 60%, rgb(255, 215, 138) 100%)' }}>
      {/* <BlogHeader /> */}
      <Helmet>
        <title>AI Consulting and Development Company in Dubai | ENH Consulting</title>
        <meta name="description" content="ENH Consulting is an AI consulting and development company in Dubai helping startups & SMEs with strategy, custom tools & marketing. Book a free call today." />
        <link rel="canonical" href={postUrl} />
      </Helmet>

      <main className="  mx-auto px-4 sm:px-6 py-10">
        {/* Hero featured post */}
        {featured && page === 1 && (
          <Link to={`/blog/${featured.slug}`} className="block mb-10 group">
            <div className="relative rounded-3xl overflow-hidden bg-ink-900 aspect-[21/9] shadow-xl">
              {featured.featuredImage?.url ? (
                <img src={featured.featuredImage.url} alt={featured.featuredImage.alt} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-ink-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {featured.category && (
                  <span className="inline-block mb-3 px-3 py-1 bg-brand-500 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                    {featured.category.name}
                  </span>
                )}
                <h1 className="font-serif text-white text-3xl md:text-4xl font-bold leading-tight mb-3 line-clamp-2">
                  {featured.title}
                </h1>
                {featured.excerpt && (
                  <p className="text-white/70 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl">{featured.excerpt}</p>
                )}
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <span>{featured.author?.name || 'Author'}</span>
                  <span>·</span>
                  <span>{format(new Date(featured.createdAt), 'MMM d, yyyy')}</span>
                  {featured.readingTime && <><span>·</span><span>{featured.readingTime} min read</span></>}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Posts grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-ink-100 overflow-hidden animate-pulse">
                    <div className="aspect-[16/9] bg-ink-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-ink-100 rounded w-1/3" />
                      <div className="h-4 bg-ink-100 rounded w-5/6" />
                      <div className="h-3 bg-ink-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-ink-400">
                <p className="text-5xl mb-4">📭</p>
                <p className="text-lg">No posts published yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {posts.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="btn-secondary text-sm disabled:opacity-40">← Prev</button>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-brand-600 text-white' : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-50'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
                  className="btn-secondary text-sm disabled:opacity-40">Next →</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <BlogSidebar />
          </div>
        </div>
      </main>

      <footer className="border-t border-ink-100 mt-16 py-8 text-center text-ink-400 text-sm">
        <p>© {new Date().getFullYear()} Blog CMS · Built with React & Node.js</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/feed.xml" target="_blank" className="hover:text-brand-600">RSS Feed</a>
          <a href="/sitemap.xml" target="_blank" className="hover:text-brand-600">Sitemap</a>
          <Link to="/admin/login" className="hover:text-brand-600">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
