import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selected, setSelected] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      const { data } = await api.get(`/posts/admin/all?${params}`);
      setPosts(data.data);
      setPagination(data.pagination);
    } catch { toast.error('Failed to load posts'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page, status]); // eslint-disable-line

  const handleSearch = (e) => { e.preventDefault(); setPage(1); load(); };

  const toggleSelect = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === posts.length ? [] : posts.map((p) => p._id));

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      toast.success('Post deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  const handleBulkDelete = async () => {
    if (!selected.length || !confirm(`Delete ${selected.length} posts?`)) return;
    setDeleting(true);
    try {
      await api.post('/posts/bulk-delete', { ids: selected });
      toast.success(`${selected.length} posts deleted`);
      setSelected([]);
      load();
    } catch { toast.error('Bulk delete failed'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="p-8   mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-serif text-2xl font-bold text-ink-900">Posts</h1>
        <div className="flex gap-3">
          {selected.length > 0 && (
            <button onClick={handleBulkDelete} disabled={deleting} className="btn-danger text-xs">
              Delete {selected.length} selected
            </button>
          )}
          <Link to="/admin/posts/new" className="btn-primary">+ New Post</Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-64">
          <input type="text" placeholder="Search posts…" className="input flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn-secondary text-sm px-3">Search</button>
        </form>
        <select className="input w-40" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-50 border-b border-ink-100">
              <th className="px-4 py-3 text-left w-8">
                <input type="checkbox" onChange={toggleAll} checked={selected.length === posts.length && posts.length > 0} className="rounded" />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-ink-600 text-xs uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-ink-600 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-ink-600 text-xs uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-ink-600 text-xs uppercase tracking-wider hidden lg:table-cell">Views</th>
              <th className="px-4 py-3 text-left font-semibold text-ink-600 text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
              <th className="px-4 py-3 text-right font-semibold text-ink-600 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-ink-400">Loading…</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-ink-400">No posts found</td></tr>
            ) : posts.map((post) => (
              <tr key={post._id} className={`hover:bg-ink-50 transition-colors ${selected.includes(post._id) ? 'bg-brand-50' : ''}`}>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.includes(post._id)} onChange={() => toggleSelect(post._id)} className="rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {post.featuredImage?.url && (
                      <img src={post.featuredImage.url} alt="" className="w-9 h-9 rounded-md object-cover flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-ink-900 line-clamp-1">{post.title}</p>
                      <p className="text-ink-400 text-xs">{post.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-ink-600">{post.category?.name || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`badge-${post.status}`}>{post.status}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-ink-500">{post.views || 0}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-ink-400 text-xs">{format(new Date(post.updatedAt), 'MMM d, yyyy')}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link to={`/admin/posts/edit/${post._id}`} className="btn-ghost text-xs py-1 px-2">Edit</Link>
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="btn-ghost text-xs py-1 px-2">View</a>
                    <button onClick={() => handleDelete(post._id)} className="btn-ghost text-xs py-1 px-2 text-red-500 hover:text-red-700 hover:bg-red-50">Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                p === page ? 'bg-brand-600 text-white' : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
