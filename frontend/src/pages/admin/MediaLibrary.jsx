import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState(null); // for detail view

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.set('search', search);
      const { data } = await api.get(`/media?${params}`);
      setMedia(data.data);
      setPagination(data.pagination);
    } catch { toast.error('Failed to load media'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page]); // eslint-disable-line

  const onDrop = useCallback(async (files) => {
    setUploading(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append('images', f));
      const { data } = await api.post('/media/upload', fd);
      toast.success(`${data.data.length} image(s) uploaded`);
      setPage(1);
      load();
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  }, []); // eslint-disable-line

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/media/${id}`);
      toast.success('Deleted');
      setSelected(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied!');
  };

  const handleAltSave = async (id, alt) => {
    try {
      await api.put(`/media/${id}`, { alt });
      toast.success('Alt text saved');
      setMedia((prev) => prev.map((m) => m._id === id ? { ...m, alt } : m));
      setSelected((s) => s ? { ...s, alt } : s);
    } catch { toast.error('Save failed'); }
  };

  return (
    <div className="p-8   mx-auto">
      <h1 className="font-serif text-2xl font-bold text-ink-900 mb-6">Media Library</h1>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer mb-6 transition-colors ${
          isDragActive ? 'border-brand-500 bg-brand-50' : 'border-ink-200 hover:border-brand-400 bg-white'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-ink-500">Uploading…</p>
        ) : (
          <>
            <p className="text-4xl mb-2">📁</p>
            <p className="text-ink-600 text-sm">Drop images here or <span className="text-brand-600 font-medium">browse to upload</span></p>
            <p className="text-ink-400 text-xs mt-1">Multiple files supported • Max 5MB each</p>
          </>
        )}
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-5">
        <input type="text" placeholder="Search by filename…" className="input flex-1" value={search} onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { setPage(1); load(); } }} />
        <button onClick={() => { setPage(1); load(); }} className="btn-secondary">Search</button>
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <p className="text-ink-400 text-center py-12">Loading…</p>
          ) : (
            <div className="grid grid-cols-4 xl:grid-cols-6 gap-3">
              {media.map((m) => (
                <button
                  key={m._id}
                  onClick={() => setSelected(m)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:shadow-md ${
                    selected?._id === m._id ? 'border-brand-500 shadow-md' : 'border-transparent hover:border-ink-200'
                  }`}
                >
                  <img src={m.url} alt={m.alt || m.originalName} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex gap-2 mt-6 justify-center">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-brand-600 text-white' : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-50'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-64 flex-shrink-0">
            <div className="card p-4 sticky top-6 space-y-4">
              <img src={selected.url} alt={selected.alt} className="w-full rounded-lg object-cover" />
              <div>
                <p className="text-xs font-semibold text-ink-600 mb-1 uppercase tracking-wider">Filename</p>
                <p className="text-ink-800 text-xs break-all">{selected.originalName}</p>
              </div>
              {selected.size && (
                <div>
                  <p className="text-xs font-semibold text-ink-600 mb-1 uppercase tracking-wider">Size</p>
                  <p className="text-ink-800 text-xs">{(selected.size / 1024).toFixed(1)} KB</p>
                </div>
              )}
              <div>
                <label className="label">Alt Text</label>
                <AltEditor item={selected} onSave={(alt) => handleAltSave(selected._id, alt)} />
              </div>
              <div className="space-y-2">
                <button onClick={() => handleCopy(selected.url)} className="btn-secondary w-full text-xs justify-center">📋 Copy URL</button>
                <button onClick={() => handleDelete(selected._id)} className="btn-danger w-full text-xs justify-center">🗑 Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AltEditor({ item, onSave }) {
  const [val, setVal] = useState(item.alt || '');
  return (
    <div className="flex gap-1">
      <input type="text" className="input flex-1 text-xs py-1.5" value={val} onChange={(e) => setVal(e.target.value)} />
      <button type="button" onClick={() => onSave(val)} className="btn-secondary text-xs py-1.5 px-2">Save</button>
    </div>
  );
}
