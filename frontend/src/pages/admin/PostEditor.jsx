import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import RichEditor from '../../components/editor/RichEditor';
import FeaturedImageUploader from '../../components/editor/FeaturedImageUploader';

const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

const EMPTY = {
  title: '', slug: '', excerpt: '', content: '',
  featuredImage: { url: '', alt: '' },
  category: '', tags: [],
  status: 'draft', visibility: 'public', password: '',
  scheduledAt: '',
  seoMeta: { metaTitle: '', metaDescription: '', ogImage: '' },
  isFeatured: false,
};

export default function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [tagInput, setTagInput] = useState('');
  const [seoOpen, setSeoOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [creatingCat, setCreatingCat] = useState(false);

  // Load meta data
  useEffect(() => {
    const loadMeta = async () => {
      const [catRes, tagRes, authRes] = await Promise.all([
        api.get('/categories'),
        api.get('/tags'),
        api.get('/authors'),
      ]);
      setCategories(catRes.data.data);
      setTags(tagRes.data.data);
      setAuthors(authRes.data.data);
    };
    loadMeta().catch(console.error);
  }, []);

  // Load post for edit
  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const { data } = await api.get(`/posts/admin/${id}`);
        const p = data.data;
        setForm({
          ...EMPTY, ...p,
          category: p.category?._id || '',
          tags: p.tags?.map((t) => t._id) || [],
          author: p.author?._id || '',
          scheduledAt: p.scheduledAt ? new Date(p.scheduledAt).toISOString().slice(0, 16) : '',
          seoMeta: p.seoMeta || EMPTY.seoMeta,
        });
      } catch { toast.error('Failed to load post'); }
      finally { setLoading(false); }
    };
    load();
  }, [id]); // eslint-disable-line

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }));
  };

  const toggleTag = (tagId) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tagId) ? f.tags.filter((t) => t !== tagId) : [...f.tags, tagId],
    }));
  };

  const createTag = async () => {
    if (!tagInput.trim()) return;
    try {
      const { data } = await api.post('/tags', { name: tagInput.trim() });
      setTags((prev) => [...prev, data.data]);
      setForm((f) => ({ ...f, tags: [...f.tags, data.data._id] }));
      setTagInput('');
    } catch { toast.error('Failed to create tag'); }
  };

  const createCategory = async () => {
    if (!newCatName.trim()) return;
    setCreatingCat(true);
    try {
      const { data } = await api.post('/categories', { name: newCatName.trim() });
      setCategories((prev) => [...prev, data.data]);
      set('category', data.data._id);
      setNewCatName('');
    } catch { toast.error('Failed to create category'); }
    finally { setCreatingCat(false); }
  };

  const handleSave = async (overrideStatus) => {
    if (!form.title) { toast.error('Title is required'); return; }
    if (!form.content) { toast.error('Content is required'); return; }
    setSaving(true);
    
    try {
      const targetStatus = overrideStatus || form.status;
      
      // Initialize a standard Form Envelope
      const formData = new FormData();
      
      // Append text inputs and key-value pairs
      formData.append('title', form.title);
      formData.append('slug', form.slug);
      formData.append('content', form.content);
      formData.append('excerpt', form.excerpt || '');
      formData.append('status', targetStatus);
      formData.append('visibility', form.visibility);
      formData.append('password', form.password || '');
      formData.append('category', form.category || '');
      formData.append('author', form.author || '');
      formData.append('isFeatured', String(form.isFeatured));
      
      if (targetStatus === 'scheduled' && form.scheduledAt) {
        formData.append('scheduledAt', form.scheduledAt);
      }

      // Convert arrays and objects into serialized strings for Multer
      formData.append('tags', JSON.stringify(form.tags || []));
      formData.append('seoMeta', JSON.stringify(form.seoMeta || EMPTY.seoMeta));

      // Append Featured Image References
      // If FeaturedImageUploader handles a local binary file instance, attach it:
      if (form.featuredImage?.file) {
        formData.append('image', form.featuredImage.file);
      } else {
        // Fallback to text configuration for metadata if no new file is selected
        formData.append('featuredImage', JSON.stringify(form.featuredImage || { url: '', alt: '' }));
      }

      // Define Request Configurations for multipart form processing
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (isEdit) {
        await api.put(`/posts/${id}`, formData, config);
        toast.success('Post updated!');
      } else {
        const { data } = await api.post('/posts', formData, config);
        toast.success('Post created!');
        navigate(`/admin/posts/edit/${data.data._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-ink-400">Loading post…</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-ink-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/posts')} className="text-ink-500 hover:text-ink-800 text-sm">← Back</button>
          <h1 className="font-serif font-bold text-ink-900">{isEdit ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer" className="btn-secondary text-xs">Preview ↗</a>
          )}
          <button onClick={() => handleSave('draft')} disabled={saving} className="btn-secondary text-sm">Save Draft</button>
          <button onClick={() => handleSave()} disabled={saving} className="btn-primary text-sm">
            {saving ? 'Saving…' : isEdit ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex gap-0 max-w-[1400px] mx-auto">
        {/* ── Main editor area ── */}
        <div className="flex-1 p-8 min-w-0">
          {/* Title */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Post Title…"
              className="w-full text-3xl font-serif font-bold text-ink-900 bg-transparent border-none outline-none placeholder:text-ink-300 resize-none leading-tight"
              value={form.title}
              onChange={handleTitleChange}
            />
          </div>

          {/* Slug */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-ink-400">Slug:</span>
            <input
              type="text"
              className="flex-1 border-b border-dashed border-ink-300 bg-transparent text-ink-600 focus:outline-none focus:border-brand-500 py-0.5"
              value={form.slug}
              onChange={(e) => set('slug', slugify(e.target.value))}
            />
          </div>

          {/* Rich Editor */}
          <RichEditor
            value={form.content}
            onChange={(html) => set('content', html)}
            placeholder="Start writing your post…"
          />

          {/* Excerpt */}
          <div className="mt-6">
            <label className="label">Excerpt / Short Description</label>
            <textarea
              className="textarea h-24"
              placeholder="Brief summary shown in post listings…"
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              maxLength={500}
            />
            <p className="text-xs text-ink-400 mt-1 text-right">{form.excerpt.length}/500</p>
          </div>

          {/* SEO Section */}
          <div className="mt-6 border border-ink-100 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full flex items-center justify-between px-5 py-4 bg-ink-50 text-sm font-semibold text-ink-700 hover:bg-ink-100 transition-colors"
            >
              <span>🔍 SEO Settings</span>
              <span>{seoOpen ? '▲' : '▼'}</span>
            </button>
            {seoOpen && (
              <div className="p-5 space-y-4 bg-white">
                <div>
                  <label className="label">Meta Title</label>
                  <input type="text" className="input" placeholder="SEO title (50–60 chars recommended)" value={form.seoMeta.metaTitle}
                    onChange={(e) => setForm((f) => ({ ...f, seoMeta: { ...f.seoMeta, metaTitle: e.target.value } }))} />
                </div>
                <div>
                  <label className="label">Meta Description</label>
                  <textarea className="textarea h-20" placeholder="SEO description (120–160 chars recommended)" value={form.seoMeta.metaDescription}
                    onChange={(e) => setForm((f) => ({ ...f, seoMeta: { ...f.seoMeta, metaDescription: e.target.value } }))} />
                </div>
                <div>
                  <label className="label">OG Image URL</label>
                  <input type="url" className="input" placeholder="https://…" value={form.seoMeta.ogImage}
                    onChange={(e) => setForm((f) => ({ ...f, seoMeta: { ...f.seoMeta, ogImage: e.target.value } }))} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="w-80 flex-shrink-0 border-l border-ink-100 bg-white p-5 space-y-6 sticky top-[57px] self-start max-h-[calc(100vh-57px)] overflow-y-auto">

          {/* Status */}
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => set('status', e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
            {form.status === 'scheduled' && (
              <div className="mt-2">
                <label className="label">Publish Date & Time</label>
                <input type="datetime-local" className="input" value={form.scheduledAt} onChange={(e) => set('scheduledAt', e.target.value)} />
              </div>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label className="label">Visibility</label>
            <select className="input" value={form.visibility} onChange={(e) => set('visibility', e.target.value)}>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="password">Password Protected</option>
            </select>
            {form.visibility === 'password' && (
              <div className="mt-2">
                <input type="text" className="input" placeholder="Set password" value={form.password} onChange={(e) => set('password', e.target.value)} />
              </div>
            )}
          </div>

          {/* Featured toggle */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} className="rounded" />
            <label htmlFor="featured" className="text-sm font-medium text-ink-700">Mark as Featured Post</label>
          </div>

          <hr className="border-ink-100" />

          {/* Featured Image */}
          <div>
            <label className="label">Featured Image</label>
            <FeaturedImageUploader value={form.featuredImage} onChange={(img) => set('featuredImage', img)} />
          </div>

          <hr className="border-ink-100" />

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <select className="input mb-2" value={form.category} onChange={(e) => set('category', e.target.value)}>
              <option value="">Select category…</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <div className="flex gap-2">
              <input type="text" className="input flex-1 text-xs py-1.5" placeholder="New category name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
              <button type="button" onClick={createCategory} disabled={creatingCat || !newCatName.trim()} className="btn-secondary text-xs py-1.5 px-3">Add</button>
            </div>
          </div>

          <hr className="border-ink-100" />

          {/* Tags */}
          <div>
            <label className="label">Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  type="button"
                  onClick={() => toggleTag(tag._id)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    form.tags.includes(tag._id)
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-600'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="input flex-1 text-xs py-1.5"
                placeholder="New tag…"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); createTag(); } }}
              />
              <button type="button" onClick={createTag} disabled={!tagInput.trim()} className="btn-secondary text-xs py-1.5 px-3">Add</button>
            </div>
          </div>

          <hr className="border-ink-100" />

          {/* Author */}
          {authors.length > 0 && (
            <div>
              <label className="label">Author</label>
              <select className="input" value={form.author || ''} onChange={(e) => set('author', e.target.value)}>
                <option value="">Select author…</option>
                {authors.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
              </select>
            </div>
          )}

          {/* Reading time estimate */}
          {form.content && (
            <div className="bg-ink-50 rounded-lg px-4 py-3 text-sm text-ink-500">
              ⏱ Est. reading time: <strong className="text-ink-700">
                {Math.max(1, Math.ceil(form.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200))} min
              </strong>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button onClick={() => handleSave()} disabled={saving} className="btn-primary w-full justify-center">
              {saving ? 'Saving…' : isEdit ? 'Update Post' : 'Publish Post'}
            </button>
            <button onClick={() => handleSave('draft')} disabled={saving} className="btn-secondary w-full justify-center">
              Save as Draft
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
