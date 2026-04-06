import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import BlogHeader from '../../components/public/BlogHeader';
import BlogSidebar from '../../components/public/BlogSidebar';
import PostCard from '../../components/public/PostCard';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [input, setInput] = useState(q);

  useEffect(() => {
    if (!q) return;
    const search = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/posts?search=${encodeURIComponent(q)}&limit=20`);
        setPosts(data.data);
        setSearched(true);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    search();
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setSearchParams({ q: input.trim() });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'linear-gradient(135deg, rgb(255, 244, 225) 0%, rgb(253, 237, 206) 60%, rgb(255, 215, 138) 100%)' }}>
      <BlogHeader />

      <div className="bg-white border-b border-ink-100 py-10">
        <div className="  mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-2xl font-bold text-ink-900 mb-4">Search</h1>
          <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
            <input
              type="search"
              className="input flex-1 text-base"
              placeholder="Search posts…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn-primary px-6">Search</button>
          </form>
          {searched && !loading && (
            <p className="text-ink-500 text-sm mt-3">
              {posts.length} result{posts.length !== 1 ? 's' : ''} for <strong>"{q}"</strong>
            </p>
          )}
        </div>
      </div>

      <main className="  mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            {loading ? (
              <p className="text-ink-400 text-center py-12">Searching…</p>
            ) : searched && posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-ink-500">No posts found for "{q}"</p>
                <Link to="/" className="btn-primary mt-4 inline-flex">← Back to Blog</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {posts.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            )}
          </div>
          <div className="lg:w-72 xl:w-80 flex-shrink-0"><BlogSidebar /></div>
        </div>
      </main>
    </div>
  );
}
