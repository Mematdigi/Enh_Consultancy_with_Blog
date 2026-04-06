import { useState } from 'react';

export default function LinkModal({ onInsert, onClose, selectedText }) {
  const [form, setForm] = useState({
    href: '',
    text: selectedText || '',
    target: '_self',
    title: '',
  });

  const handleInsert = () => {
    if (!form.href) return;
    onInsert(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
          <h3 className="font-serif font-bold text-ink-900 text-lg">Insert Link</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="label">URL *</label>
            <input type="url" className="input" placeholder="https://example.com" value={form.href} onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))} autoFocus />
          </div>
          <div>
            <label className="label">Link Text</label>
            <input type="text" className="input" placeholder="Display text" value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} />
          </div>
          <div>
            <label className="label">Title (tooltip)</label>
            <input type="text" className="input" placeholder="Link title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="label">Open in</label>
            <select className="input" value={form.target} onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))}>
              <option value="_self">Same window</option>
              <option value="_blank">New tab</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-ink-100 bg-ink-50">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleInsert} className="btn-primary" disabled={!form.href}>Insert Link</button>
        </div>
      </div>
    </div>
  );
}
