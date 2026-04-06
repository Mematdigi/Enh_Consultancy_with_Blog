import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const EMPTY = { name: '', bio: '', socialLinks: { twitter: '', linkedin: '', github: '', website: '' } };

export default function AuthorsManager() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/authors');
      setAuthors(data.data);
    } catch { toast.error('Failed to load authors'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onDrop = useCallback((files) => {
    if (!files.length) return;
    setAvatarFile(files[0]);
    setAvatarPreview(URL.createObjectURL(files[0]));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('bio', form.bio);
      fd.append('socialLinks', JSON.stringify(form.socialLinks));
      if (avatarFile) fd.append('avatar', avatarFile);

      if (editing) {
        await api.put(`/authors/${editing._id}`, fd);
        toast.success('Author updated');
      } else {
        await api.post('/authors', fd);
        toast.success('Author created');
      }
      setForm(EMPTY);
      setEditing(null);
      setAvatarFile(null);
      setAvatarPreview('');
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleEdit = (author) => {
    setEditing(author);
    setForm({ name: author.name, bio: author.bio || '', socialLinks: author.socialLinks || EMPTY.socialLinks });
    setAvatarPreview(author.avatar || '');
    setAvatarFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this author?')) return;
    try {
      await api.delete(`/authors/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  const setLink = (key, val) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, [key]: val } }));

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-ink-900 mb-6">Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* Form */}
        <div className="md:col-span-2">
          <div className="card p-5 sticky top-6">
            <h2 className="font-semibold text-ink-800 mb-4">{editing ? 'Edit Author' : 'Add Author'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Avatar */}
              <div>
                <label className="label">Avatar</label>
                <div {...getRootProps()} className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-brand-400 transition-colors">
                  <input {...getInputProps()} />
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-20 h-20 rounded-full mx-auto object-cover" />
                  ) : (
                    <p className="text-ink-400 text-xs">Drop or click to upload avatar</p>
                  )}
                </div>
              </div>

              <div>
                <label className="label">Name *</label>
                <input type="text" className="input" placeholder="Full name" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>

              <div>
                <label className="label">Bio</label>
                <textarea className="textarea h-20" placeholder="Short bio" value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
              </div>

              <div>
                <label className="label">Social Links</label>
                <div className="space-y-2">
                  {[
                    { key: 'twitter', placeholder: 'Twitter URL' },
                    { key: 'linkedin', placeholder: 'LinkedIn URL' },
                    { key: 'github', placeholder: 'GitHub URL' },
                    { key: 'website', placeholder: 'Website URL' },
                  ].map(({ key, placeholder }) => (
                    <input key={key} type="url" className="input text-xs py-1.5" placeholder={placeholder}
                      value={form.socialLinks[key]} onChange={(e) => setLink(key, e.target.value)} />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                  {saving ? 'Saving…' : editing ? 'Update' : 'Add Author'}
                </button>
                {editing && (
                  <button type="button" onClick={() => { setEditing(null); setForm(EMPTY); setAvatarPreview(''); }} className="btn-secondary px-3">✕</button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Authors list */}
        <div className="md:col-span-3 space-y-4">
          {loading ? (
            <p className="text-ink-400 text-center py-8">Loading…</p>
          ) : authors.length === 0 ? (
            <p className="text-ink-400 text-center py-8">No authors yet</p>
          ) : authors.map((author) => (
            <div key={author._id} className="card p-5 flex items-start gap-4">
              <div className="flex-shrink-0">
                {author.avatar ? (
                  <img src={author.avatar} alt={author.name} className="w-14 h-14 rounded-full object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl">
                    {author.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink-900">{author.name}</p>
                {author.bio && <p className="text-ink-500 text-sm mt-0.5 line-clamp-2">{author.bio}</p>}
                <div className="flex gap-3 mt-2 flex-wrap">
                  {Object.entries(author.socialLinks || {}).map(([key, val]) =>
                    val ? (
                      <a key={key} href={val} target="_blank" rel="noreferrer"
                        className="text-xs text-brand-600 hover:text-brand-700 capitalize">{key} ↗</a>
                    ) : null
                  )}
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => handleEdit(author)} className="btn-ghost text-xs py-1 px-2">Edit</button>
                <button onClick={() => handleDelete(author._id)} className="btn-ghost text-xs py-1 px-2 text-red-500 hover:text-red-700 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
