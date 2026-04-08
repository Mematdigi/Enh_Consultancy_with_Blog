import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { format } from 'date-fns';

export default function BlogSidebar() {
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [popular, setPopular] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [r, c, t, p] = await Promise.all([
          api.get('/posts/recent'),
          api.get('/categories'),
          api.get('/tags'),
          api.get('/posts/popular'),
        ]);
        setRecent(r.data?.data ?? []);
        setCategories(c.data?.data ?? []);
        setTags(t.data?.data ?? []);
        setPopular(p.data?.data ?? []);
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <aside className="space-y-6 w-full">
      {/* Search */}
      <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-sm">
        <h3 className="font-serif font-bold text-ink-800 mb-3 text-lg">Search</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input type="search" placeholder="Search posts…" className="input flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn-primary px-3 text-sm">Go</button>
        </form>
      </div>

      {/* Recent Posts */}
      {recent.length > 0 && (
        <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif font-bold text-ink-800 mb-4 text-lg">Recent Posts</h3>
          <div className="space-y-4">
            {recent.map((post) => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="flex gap-3 group">
                {post.featuredImage?.url ? (
                  <img src={post.featuredImage.url} alt={post.featuredImage.alt} className="w-16 h-14 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-14 rounded-lg bg-ink-100 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink-800 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">{post.title}</p>
                  <p className="text-xs text-ink-400 mt-1">{format(new Date(post.createdAt), 'MMM d, yyyy')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif font-bold text-ink-800 mb-4 text-lg">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link key={cat._id} to={`/category/${cat.slug}`}
                className="flex items-center justify-between py-1.5 text-sm text-ink-700 hover:text-brand-600 transition-colors group">
                <span className="group-hover:translate-x-0.5 transition-transform">→ {cat.name}</span>
                <span className="text-xs text-ink-400 bg-ink-100 px-2 py-0.5 rounded-full">{cat.postCount ?? 0}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags Cloud */}
      {tags.length > 0 && (
        <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif font-bold text-ink-800 mb-4 text-lg">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag._id} to={`/tag/${tag.slug}`}
                className="inline-flex items-center px-3 py-1 bg-ink-100 text-ink-600 rounded-full text-xs hover:bg-brand-100 hover:text-brand-700 transition-colors">
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Posts */}
      {popular.length > 0 && (
        <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-sm">
          <h3 className="font-serif font-bold text-ink-800 mb-4 text-lg">Popular Posts</h3>
          <div className="space-y-3">
            {popular.map((post, i) => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="flex items-start gap-3 group">
                <span className="font-serif text-2xl font-bold text-ink-200 leading-none flex-shrink-0 w-7">{i + 1}</span>
                <p className="text-sm text-ink-700 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">{post.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}