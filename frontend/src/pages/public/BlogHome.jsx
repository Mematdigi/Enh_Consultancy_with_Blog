import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import BlogHeader from '../../components/public/BlogHeader';
import BlogSidebar from '../../components/public/BlogSidebar';
import PostCard from '../../components/public/PostCard';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import { imageUrl } from '../../lib/imageUrl'; // ← adjust path if your lib folder differs

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
        const all = Array.isArray(data?.data) ? data.data : [];
        if (page === 1 && all.length > 0) {
          setFeatured(all[0]);
          setPosts(all.slice(1));
        } else {
          setPosts(all);
        }
        setPagination(data?.pagination || {});
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [page]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#fff4e1] via-[#fdedce] to-[#ffd78a]'>
      <Helmet>
        <title>ENH Consulting Blogs | AI, IT & Business Insights</title>
        <meta name="description" content="Explore expert blogs on AI, IT consulting, business strategy, startups, and digital transformation to help businesses grow in Dubai and the UAE." />
        <link rel="canonical" href="https://enh.consulting/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ENH Consulting" />
        <meta property="og:locale" content="en_US" />

        <meta property="og:title" content="ENH Consulting Blogs | AI, IT & Business Insights" />
        <meta property="og:description" content="Explore expert blogs on AI, IT consulting, business strategy, startups, and digital transformation to help businesses grow in Dubai and the UAE." />
        <meta property="og:url" content="https://enh.consulting/blog" />
        <meta property="og:image" content="https://enh.consulting/ENH_logo.png" />
        <meta property="og:image:width" content="150" />
        <meta property="og:image:height" content="138" />
        <meta property="og:image:alt" content="ENH Consulting Blogs | AI, IT & Business Insights" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ENH Consulting Blogs | AI, IT & Business Insights" />
        <meta name="twitter:description" content="Explore expert blogs on AI, IT consulting, business strategy, startups, and digital transformation to help businesses grow in Dubai and the UAE." />
        <meta name="twitter:image" content="https://enh.consulting/ENH_logo.png" />
      </Helmet>

      <main className="mx-auto px-4 py-8 sm:px-6 sm:py-10">
        {/* Hero featured post */}
        {featured && page === 1 && (
          <Link to={`/blog/${featured.slug}`} className="group mb-8 block sm:mb-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 shadow-xl sm:aspect-[26/9] sm:rounded-3xl">
              {featured.featuredImage?.url ? (
                <img
                  src={imageUrl(featured.featuredImage.url)}
                  alt={featured.featuredImage.alt}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-ink-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                {featured.category && (
                  <span className="mb-3 inline-block rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white sm:text-xs">
                    {featured.category.name}
                  </span>
                )}
                <h1 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-white sm:mb-3 sm:text-3xl md:text-4xl">
                  {featured.title}
                </h1>
                {featured.excerpt && (
                  <p className="mb-3 line-clamp-2 max-w-2xl text-xs text-white/70 sm:mb-4 sm:text-sm md:text-base">
                    {featured.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 sm:gap-3 sm:text-sm">
                  <span>{featured.author?.name || "Author"}</span>
                  <span>·</span>
                  <span>{format(new Date(featured.createdAt), "MMM d, yyyy")}</span>
                  {featured.readingTime && (
                    <>
                      <span>·</span>
                      <span>{featured.readingTime} min read</span>
                    </>
                  )}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
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

      {/* <footer className="border-t border-ink-100 mt-16 py-8 text-center text-ink-400 text-sm">
        <p>© {new Date().getFullYear()} ENH Consulting · Built with React & Node.js</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/feed.xml" target="_blank" className="hover:text-brand-600">RSS Feed</a>
          <a href="/sitemap.xml" target="_blank" className="hover:text-brand-600">Sitemap</a>
          <Link to="/admin/login" className="hover:text-brand-600">Admin</Link>
        </div>
      </footer> */}
    </div>
  );
}