import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function ImageInsertModal({ onInsert, onClose }) {
  const [tab, setTab] = useState('upload'); // upload | url | library
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [form, setForm] = useState({ url: '', alt: '', title: '', width: '', align: 'center' });
  const [mediaList, setMediaList] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  const onDrop = useCallback(async (files) => {
    if (!files.length) return;
    setUploading(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append('images', f));
      const { data } = await api.post('/media/upload', fd);
      const uploaded = data.data[0];
      setPreviewUrl(uploaded.url);
      setForm((f) => ({ ...f, url: uploaded.url, alt: uploaded.alt || '' }));
      toast.success('Image uploaded!');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const loadMedia = async () => {
    if (tab === 'library' && !mediaList.length) {
      setLoadingMedia(true);
      try {
        const { data } = await api.get('/media?limit=30');
        setMediaList(data.data);
      } catch { toast.error('Failed to load media'); }
      finally { setLoadingMedia(false); }
    }
  };

  const handleTabChange = (t) => {
    setTab(t);
    if (t === 'library') loadMedia();
  };

  const handleInsert = () => {
    if (!form.url) { toast.error('Please provide an image URL'); return; }
    onInsert(form);
  };

  const selectMedia = (item) => {
    setPreviewUrl(item.url);
    setForm((f) => ({ ...f, url: item.url, alt: item.alt || '' }));
    setTab('upload');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
          <h3 className="font-serif font-bold text-ink-900 text-lg">Insert Image</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 text-2xl leading-none">&times;</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-ink-100 px-6">
          {['upload','url','library'].map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                tab === t ? 'border-brand-600 text-brand-600' : 'border-transparent text-ink-500 hover:text-ink-800'
              }`}
            >
              {t === 'upload' ? 'Upload' : t === 'url' ? 'From URL' : 'Media Library'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Upload tab */}
            {tab === 'upload' && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-brand-500 bg-brand-50' : 'border-ink-200 hover:border-brand-400'
                }`}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <p className="text-ink-500 text-sm">Uploading…</p>
                ) : previewUrl ? (
                  <img src={previewUrl} alt="" className="max-h-40 mx-auto rounded-lg object-cover" />
                ) : (
                  <>
                    <p className="text-4xl mb-2">🖼</p>
                    <p className="text-ink-600 text-sm">Drag & drop an image, or <span className="text-brand-600 font-medium">browse</span></p>
                    <p className="text-ink-400 text-xs mt-1">JPG, PNG, GIF, WebP up to 5MB</p>
                  </>
                )}
              </div>
            )}

            {/* URL tab */}
            {tab === 'url' && (
              <div className="space-y-3">
                <div>
                  <label className="label">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="input"
                    value={form.url}
                    onChange={(e) => { setForm((f) => ({ ...f, url: e.target.value })); setPreviewUrl(e.target.value); }}
                  />
                </div>
                {previewUrl && (
                  <div className="rounded-xl overflow-hidden border border-ink-100">
                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto object-contain" onError={() => setPreviewUrl('')} />
                    <p className="text-xs text-center text-ink-400 py-2">Preview</p>
                  </div>
                )}
              </div>
            )}

            {/* Library tab */}
            {tab === 'library' && (
              <div>
                {loadingMedia ? (
                  <p className="text-ink-400 text-sm text-center py-8">Loading media…</p>
                ) : (
                  <div className="grid grid-cols-4 gap-3">
                    {mediaList.map((m) => (
                      <button key={m._id} onClick={() => selectMedia(m)} className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-brand-500 transition-all">
                        <img src={m.url} alt={m.alt} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Image settings (shown when URL is set) */}
            {form.url && tab !== 'library' && (
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-ink-100">
                <div>
                  <label className="label">Alt Text</label>
                  <input type="text" className="input" placeholder="Describe the image" value={form.alt} onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Title</label>
                  <input type="text" className="input" placeholder="Image title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Width (px, leave blank for auto)</label>
                  <input type="number" className="input" placeholder="e.g. 600" value={form.width} onChange={(e) => setForm((f) => ({ ...f, width: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Alignment</label>
                  <select className="input" value={form.align} onChange={(e) => setForm((f) => ({ ...f, align: e.target.value }))}>
                    <option value="center">Center</option>
                    <option value="left">Float Left</option>
                    <option value="right">Float Right</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-ink-100 bg-ink-50">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleInsert} className="btn-primary" disabled={!form.url}>Insert Image</button>
        </div>
      </div>
    </div>
  );
}
