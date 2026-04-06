// CategoryPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import BlogHeader from '../../components/public/BlogHeader';
import BlogSidebar from '../../components/public/BlogSidebar';
import PostCard from '../../components/public/PostCard';

function ArchivePage({ type }) {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Get the category/tag id from slug
        const metaRes = await api.get(`/${type === 'category' ? 'categories' : 'tags'}/${slug}`);
        const metaData = metaRes.data.data;
        setMeta(metaData);

        const param = type === 'category' ? `category=${metaData._id}` : `tag=${metaData._id}`;
        const { data } = await api.get(`/posts?${param}&page=${page}&limit=9`);
        setPosts(data.data);
        setPagination(data.pagination);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug, page]); // eslint-disable-line

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'linear-gradient(135deg, rgb(255, 244, 225) 0%, rgb(253, 237, 206) 60%, rgb(255, 215, 138) 100%)' }}>
      {/* <BlogHeader /> */}

      {/* Archive Header */}
      <div className="bg-white border-b border-ink-100 py-12">
        <div className="  mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">{type}</p>
          <h1 className="font-serif text-3xl font-bold text-ink-900">{meta?.name || slug}</h1>
          {meta?.description && <p className="text-ink-500 mt-2 max-w-xl">{meta.description}</p>}
          {pagination.total != null && (
            <p className="text-sm text-ink-400 mt-2">{pagination.total} post{pagination.total !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>

      <main className="  mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-ink-100 overflow-hidden animate-pulse">
                    <div className="aspect-[16/9] bg-ink-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-ink-100 rounded w-1/3" />
                      <div className="h-4 bg-ink-100 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">📭</p>
                <p className="text-ink-400">No posts in this {type} yet.</p>
                <Link to="/" className="btn-primary mt-4 inline-flex">← Back to Blog</Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {posts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-brand-600 text-white' : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-50'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="lg:w-72 xl:w-80 flex-shrink-0"><BlogSidebar /></div>
        </div>
      </main>
    </div>
  );
}

export function CategoryPage() { return <ArchivePage type="category" />; }
export function TagPage() { return <ArchivePage type="tag" />; }
