import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/categories');
      setCategories(data.data);
    } catch { toast.error('Failed to load categories'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/categories/${editing._id}`, form);
        toast.success('Category updated');
      } else {
        await api.post('/categories', form);
        toast.success('Category created');
      }
      setForm({ name: '', description: '' });
      setEditing(null);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description || '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: '', description: '' });
  };

  return (
    <div className="p-8 mx-auto">
      <h1 className="font-serif text-2xl font-bold text-ink-900 mb-6">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Form */}
        <div className="md:col-span-1">
          <div className="card p-5 sticky top-6">
            <h2 className="font-semibold text-ink-800 mb-4">{editing ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="label">Name *</label>
                <input type="text" className="input" placeholder="Category name" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="textarea h-20" placeholder="Optional description" value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                  {saving ? 'Saving…' : editing ? 'Update' : 'Add Category'}
                </button>
                {editing && (
                  <button type="button" onClick={handleCancel} className="btn-secondary px-3">✕</button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="md:col-span-2">
          <div className="card overflow-hidden">
            {loading ? (
              <p className="text-ink-400 text-center py-8">Loading…</p>
            ) : categories.length === 0 ? (
              <p className="text-ink-400 text-center py-8">No categories yet</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink-50 border-b border-ink-100">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider">Slug</th>
                    <th className="px-5 py-3 text-center text-xs font-semibold text-ink-600 uppercase tracking-wider">Posts</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-ink-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-50">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-ink-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium text-ink-900">{cat.name}</p>
                        {cat.description && <p className="text-xs text-ink-400 mt-0.5 line-clamp-1">{cat.description}</p>}
                      </td>
                      <td className="px-5 py-3 text-ink-500 text-xs font-mono">{cat.slug}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="badge bg-ink-100 text-ink-600">{cat.postCount ?? 0}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => handleEdit(cat)} className="btn-ghost text-xs py-1 px-2">Edit</button>
                          <button onClick={() => handleDelete(cat._id)} className="btn-ghost text-xs py-1 px-2 text-red-500 hover:text-red-700 hover:bg-red-50">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
