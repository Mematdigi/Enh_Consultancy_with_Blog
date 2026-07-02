import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function CommentsManager() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | pending | approved

  const load = async () => {
    setLoading(true);
    try {
      const params = filter === 'pending' ? '?approved=false' : filter === 'approved' ? '?approved=true' : '';
      const { data } = await api.get(`/comments${params}`);
      setComments(data.data);
    } catch { toast.error('Failed to load comments'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]); // eslint-disable-line

  const handleApprove = async (id) => {
    try {
      await api.put(`/comments/${id}/approve`);
      toast.success('Comment approved');
      load();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${id}`);
      toast.success('Comment deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  const pending = comments.filter((c) => !c.approved).length;

  return (
    <div className="p-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink-900">Comments</h1>
          {pending > 0 && (
            <p className="text-amber-600 text-sm mt-0.5 font-medium">{pending} pending approval</p>
          )}
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn text-sm capitalize ${filter === f ? 'bg-brand-600 text-white' : 'btn-secondary'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-ink-400 text-center py-12">Loading…</p>
      ) : comments.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-ink-400">No comments {filter !== 'all' ? `(${filter})` : ''}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment._id} className={`card p-5 border-l-4 ${comment.approved ? 'border-l-emerald-400' : 'border-l-amber-400'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <div className="w-8 h-8 rounded-full bg-ink-100 flex items-center justify-center text-ink-600 font-bold text-sm flex-shrink-0">
                      {comment.name[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-ink-900 text-sm">{comment.name}</span>
                      <span className="text-ink-400 text-xs ml-2">{comment.email}</span>
                      {comment.website && (
                        <a href={comment.website} target="_blank" rel="noreferrer" className="text-brand-500 text-xs ml-2 hover:underline">↗ website</a>
                      )}
                    </div>
                    {!comment.approved && <span className="badge bg-amber-100 text-amber-700">Pending</span>}
                    {comment.approved && <span className="badge bg-emerald-100 text-emerald-700">Approved</span>}
                  </div>

                  <p className="text-ink-700 text-sm mb-2">{comment.body}</p>

                  {comment.post && (
                    <a href={`/blog/${comment.post.slug}`} target="_blank" rel="noreferrer"
                      className="text-xs text-brand-600 hover:underline">
                      On: {comment.post.title}
                    </a>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0 text-right">
                  <p className="text-xs text-ink-400">{format(new Date(comment.createdAt), 'MMM d, yyyy')}</p>
                  <div className="flex gap-1 justify-end">
                    {!comment.approved && (
                      <button onClick={() => handleApprove(comment._id)} className="btn text-xs py-1 px-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                        Approve
                      </button>
                    )}
                    <button onClick={() => handleDelete(comment._id)} className="btn-ghost text-xs py-1 px-2 text-red-500 hover:text-red-700 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
