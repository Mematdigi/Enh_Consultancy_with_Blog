import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function FeaturedImageUploader({ value, onChange }) {
  const onDrop = useCallback(async (files) => {
    if (!files.length) return;
    try {
      const fd = new FormData();
      fd.append('images', files[0]);
      const { data } = await api.post('/media/upload', fd);
      const uploaded = data.data[0];
      onChange({ url: uploaded.url, alt: value?.alt || '' });
      toast.success('Featured image uploaded!');
    } catch {
      toast.error('Upload failed');
    }
  }, [onChange, value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div className="space-y-3">
      {value?.url ? (
        <div className="relative group rounded-xl overflow-hidden border border-ink-200">
          <img src={value.url} alt={value.alt} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ url: '', alt: '' })}
              className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-brand-500 bg-brand-50' : 'border-ink-200 hover:border-brand-400'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-3xl mb-2">📷</p>
          <p className="text-ink-500 text-xs">Drop image or <span className="text-brand-600 font-medium">browse</span></p>
        </div>
      )}

      {value?.url && (
        <div>
          <label className="label">Alt Text</label>
          <input
            type="text"
            className="input"
            placeholder="Image alt text"
            value={value.alt || ''}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
