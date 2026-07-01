import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { format } from 'date-fns';

const StatCard = ({ label, value, icon, color }) => (
  <div className="card p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-3xl font-bold text-ink-900">{value ?? '—'}</p>
      <p className="text-ink-500 text-sm mt-0.5">{label}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: res } = await api.get('/posts/admin/all?limit=8');
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-8 text-ink-400">Loading…</div>;

  const stats = data?.stats || {};
  const posts = data?.data || [];

  return (
    <div className="p-8   mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink-900">Dashboard</h1>
          <p className="text-ink-500 text-sm mt-0.5">{format(new Date(), 'EEEE, MMMM d yyyy')}</p>
        </div>
        <Link to="/admin/posts/new" className="btn-primary">+ New Post</Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Posts" value={stats.total} icon="📝" color="bg-brand-100" />
        <StatCard label="Published" value={stats.published} icon="✅" color="bg-emerald-100" />
        <StatCard label="Drafts" value={stats.draft} icon="📋" color="bg-amber-100" />
        <StatCard label="Scheduled" value={stats.scheduled} icon="🕐" color="bg-blue-100" />
      </div>

      {/* Chart — simple bar visualization */}
      {stats.total > 0 && (
        <div className="card p-6 mb-8">
          <h2 className="font-serif font-bold text-ink-800 mb-4">Post Status Breakdown</h2>
          <div className="space-y-3">
            {[
              { label: 'Published', value: stats.published, color: 'bg-emerald-500' },
              { label: 'Draft', value: stats.draft, color: 'bg-amber-400' },
              { label: 'Scheduled', value: stats.scheduled, color: 'bg-blue-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xs text-ink-500 w-20">{item.label}</span>
                <div className="flex-1 bg-ink-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: stats.total ? `${(item.value / stats.total) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-xs font-semibold text-ink-700 w-8 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
          <h2 className="font-serif font-bold text-ink-800">Recent Posts</h2>
          <Link to="/admin/posts" className="text-brand-600 text-sm font-medium hover:text-brand-700">View all →</Link>
        </div>
        <div className="divide-y divide-ink-50">
          {posts.map((post) => (
            <div key={post._id} className="flex items-center gap-4 px-6 py-4 hover:bg-ink-50 transition-colors">
              {post.featuredImage?.url && (
                      <img 
                        src={`/uploads/${post.featuredImage.url.replace(/^uploads\//, '')}`} 
                        alt={post.featuredImage.alt || post.title} 
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0" 
                      />
                    )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink-900 truncate text-sm">{post.title}</p>
                <p className="text-xs text-ink-400 mt-0.5">{format(new Date(post.updatedAt), 'MMM d, yyyy')}</p>
              </div>
              <span className={`badge-${post.status}`}>{post.status}</span>
              <div className="flex gap-2">
                <Link to={`/admin/posts/edit/${post._id}`} className="btn-ghost text-xs py-1 px-2">Edit</Link>
                <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="btn-ghost text-xs py-1 px-2">View</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
