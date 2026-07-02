import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function TagsManager() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/tags');
      setTags(data.data);
    } catch { toast.error('Failed to load tags'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/tags/${editing._id}`, { name });
        toast.success('Tag updated');
      } else {
        await api.post('/tags', { name });
        toast.success('Tag created');
      }
      setName('');
      setEditing(null);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this tag?')) return;
    try {
      await api.delete(`/tags/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="p-8 mx-auto">
      <h1 className="font-serif text-2xl font-bold text-ink-900 mb-6">Tags</h1>

      {/* Add/Edit Form */}
      <div className="card p-5 mb-6">
        <h2 className="font-semibold text-ink-800 mb-3">{editing ? 'Edit Tag' : 'Add New Tag'}</h2>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            className="input flex-1"
            placeholder="Tag name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : editing ? 'Update' : 'Add Tag'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setName(''); }} className="btn-secondary">Cancel</button>
          )}
        </form>
      </div>

      {/* Tags cloud + table */}
      {loading ? (
        <p className="text-ink-400 text-center py-8">Loading…</p>
      ) : (
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-ink-100">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag._id} className="inline-flex items-center gap-1 px-3 py-1 bg-ink-100 text-ink-700 rounded-full text-sm">
                  {tag.name}
                  <span className="text-xs text-ink-400">({tag.postCount ?? 0})</span>
                  <button onClick={() => { setEditing(tag); setName(tag.name); }} className="text-ink-400 hover:text-brand-600 ml-0.5 text-xs">✏</button>
                  <button onClick={() => handleDelete(tag._id)} className="text-ink-400 hover:text-red-500 text-xs">✕</button>
                </span>
              ))}
              {tags.length === 0 && <p className="text-ink-400 text-sm">No tags yet</p>}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider">Slug</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-ink-600 uppercase tracking-wider">Posts</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-ink-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {tags.map((tag) => (
                <tr key={tag._id} className="hover:bg-ink-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-ink-900">{tag.name}</td>
                  <td className="px-5 py-3 text-ink-500 text-xs font-mono">{tag.slug}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="badge bg-ink-100 text-ink-600">{tag.postCount ?? 0}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setEditing(tag); setName(tag.name); }} className="btn-ghost text-xs py-1 px-2">Edit</button>
                      <button onClick={() => handleDelete(tag._id)} className="btn-ghost text-xs py-1 px-2 text-red-500 hover:text-red-700 hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
