import { useRef, useState, useCallback, useEffect } from 'react';
import ImageInsertModal from './ImageInsertModal';
import LinkModal from './LinkModal';

// ── Icon helpers (inline SVG-free text icons) ──────────────────────────────
const TB = ({ children, title, onClick, active, disabled }) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => { e.preventDefault(); onClick && onClick(); }}
    disabled={disabled}
    className={`toolbar-btn ${active ? 'active' : ''}`}
  >
    {children}
  </button>
);
const Sep = () => <span className="w-px h-5 bg-ink-200 mx-1 inline-block" />;

// ── YouTube URL → embed ───────────────────────────────────────────
const ytEmbed = (url) => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
};

export default function RichEditor({ value, onChange, placeholder = 'Write your content here…' }) {
  const editorRef = useRef(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [savedRange, setSavedRange] = useState(null);
  const [activeFormats, setActiveFormats] = useState({});

  // Sync value into editor on mount only
  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []); // eslint-disable-line

  // Track active formats for toolbar highlight
  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      justifyFull: document.queryCommandState('justifyFull'),
    });
  }, []);

  const exec = useCallback((command, value = null) => {
    editorRef.current?.focus();
  document.execCommand('styleWithCSS', false, true);
    document.execCommand(command, false, value);
    onChange(editorRef.current?.innerHTML || '');
    updateActiveFormats();
  }, [onChange, updateActiveFormats]);

  const saveRange = () => {
    const sel = window.getSelection();
    if (sel?.rangeCount) setSavedRange(sel.getRangeAt(0).cloneRange());
  };

  const restoreRange = () => {
    if (!savedRange) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRange);
    editorRef.current?.focus();
  };

  const insertHeading = (tag) => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, tag);
    onChange(editorRef.current?.innerHTML || '');
  };

  const insertBlockquote = () => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, 'blockquote');
    onChange(editorRef.current?.innerHTML || '');
  };

  const insertCode = () => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    const selectedText = sel?.toString() || '';
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = selectedText || 'code here';
    pre.appendChild(code);

    // Add copy button
    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('data-copy', 'true');
    pre.appendChild(btn);

    if (sel?.rangeCount) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(pre);
    }
    onChange(editorRef.current?.innerHTML || '');
  };

  const insertHR = () => {
    editorRef.current?.focus();
    document.execCommand('insertHorizontalRule');
    onChange(editorRef.current?.innerHTML || '');
  };

  const insertYouTube = () => {
    const url = prompt('Paste YouTube URL:');
    if (!url) return;
    const embedUrl = ytEmbed(url);
    if (!embedUrl) { alert('Invalid YouTube URL'); return; }
    const iframe = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen class="w-full aspect-video rounded-xl my-6"></iframe>`;
    exec('insertHTML', iframe);
  };

  const handleImageInsert = ({ url, alt, title, width, align }) => {
    restoreRange();
    const alignStyle = align === 'left' ? 'float:left;margin:0 1rem 1rem 0;'
      : align === 'right' ? 'float:right;margin:0 0 1rem 1rem;'
      : 'display:block;margin:1.5rem auto;';
    const img = `<img src="${url}" alt="${alt}" title="${title}" style="${alignStyle}${width ? `width:${width}px;` : 'max-width:100%;'}" />`;
    exec('insertHTML', img);
    setShowImageModal(false);
  };

  const handleLinkInsert = ({ href, text, target, title }) => {
    restoreRange();
    const a = `<a href="${href}" target="${target}" title="${title}">${text || href}</a>`;
    exec('insertHTML', a);
    setShowLinkModal(false);
  };

  // Copy code button delegation
  const handleEditorClick = (e) => {
    if (e.target.getAttribute('data-copy')) {
      const code = e.target.closest('pre')?.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          e.target.textContent = 'Copied!';
          setTimeout(() => { e.target.textContent = 'Copy'; }, 2000);
        });
      }
    }
    // Image preview
    if (e.target.tagName === 'IMG' && !e.target.closest('[data-copy]')) {
      const overlay = document.createElement('div');
      overlay.className = 'img-preview-overlay';
      const img = document.createElement('img');
      img.src = e.target.src;
      img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,.5)';
      overlay.appendChild(img);
      overlay.onclick = () => document.body.removeChild(overlay);
      document.body.appendChild(overlay);
    }
    updateActiveFormats();
  };

  const headings = ['H1','H2','H3','H4','H5','H6'];

  return (
    <div className="border border-ink-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* ── TOOLBAR ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-0.5 px-3 py-2 bg-ink-50 border-b border-ink-200">

        {/* Headings */}
        <select
          className="text-xs border border-ink-200 rounded px-2 py-1.5 bg-white text-ink-700 focus:outline-none focus:ring-1 focus:ring-brand-400 mr-1"
          onChange={(e) => { if (e.target.value) { insertHeading(e.target.value); e.target.value = ''; } }}
          defaultValue=""
        >
          <option value="" disabled>Heading</option>
          {headings.map((h) => <option key={h} value={h.toLowerCase()}>{h}</option>)}
          <option value="p">Paragraph</option>
        </select>

        <Sep />

        {/* Bold / Italic / Underline / Strike */}
        <TB title="Bold (Ctrl+B)" onClick={() => exec('bold')} active={activeFormats.bold}><b>B</b></TB>
        <TB title="Italic (Ctrl+I)" onClick={() => exec('italic')} active={activeFormats.italic}><i>I</i></TB>
        <TB title="Underline (Ctrl+U)" onClick={() => exec('underline')} active={activeFormats.underline}><u>U</u></TB>
        <TB title="Strikethrough" onClick={() => exec('strikeThrough')} active={activeFormats.strikeThrough}><s>S</s></TB>

        <Sep />

        {/* Text color */}
        <label className="toolbar-btn cursor-pointer" title="Text Color">
          A
          <input type="color" className="sr-only" onChange={(e) => exec('foreColor', e.target.value)} />
        </label>
        <label className="toolbar-btn cursor-pointer" title="Highlight">
          <span style={{ background: 'yellow', padding: '0 2px' }}>H</span>
          <input type="color" className="sr-only" onChange={(e) => exec('hiliteColor', e.target.value)} />
        </label>

        <Sep />

        {/* Lists */}
        <TB title="Unordered List" onClick={() => exec('insertUnorderedList')} active={activeFormats.insertUnorderedList}>• ≡</TB>
        <TB title="Ordered List" onClick={() => exec('insertOrderedList')} active={activeFormats.insertOrderedList}>1≡</TB>

        <Sep />

        {/* Align */}
        <TB title="Align Left" onClick={() => exec('justifyLeft')} active={activeFormats.justifyLeft}>⬅</TB>
        <TB title="Align Center" onClick={() => exec('justifyCenter')} active={activeFormats.justifyCenter}>↔</TB>
        <TB title="Align Right" onClick={() => exec('justifyRight')} active={activeFormats.justifyRight}>➡</TB>
        <TB title="Justify" onClick={() => exec('justifyFull')} active={activeFormats.justifyFull}>⬌</TB>

        <Sep />

        {/* Indent */}
        <TB title="Indent" onClick={() => exec('indent')}>→|</TB>
        <TB title="Outdent" onClick={() => exec('outdent')}>|←</TB>

        <Sep />

        {/* Blockquote / Code */}
        <TB title="Blockquote" onClick={insertBlockquote}>" "</TB>
        <TB title="Code Block" onClick={insertCode}>&lt;/&gt;</TB>

        <Sep />

        {/* Link */}
        <TB title="Insert Link" onClick={() => { saveRange(); setShowLinkModal(true); }}>🔗</TB>

        {/* Image */}
        <TB title="Insert Image" onClick={() => { saveRange(); setShowImageModal(true); }}>🖼</TB>

        {/* YouTube */}
        <TB title="Embed YouTube" onClick={insertYouTube}>▶</TB>

        <Sep />

        {/* HR */}
        <TB title="Horizontal Rule" onClick={insertHR}>—</TB>

        <Sep />

        {/* Undo / Redo */}
        <TB title="Undo (Ctrl+Z)" onClick={() => exec('undo')}>↩</TB>
        <TB title="Redo (Ctrl+Y)" onClick={() => exec('redo')}>↪</TB>

        <Sep />

        {/* Clear formatting */}
        <TB title="Clear Formatting" onClick={() => exec('removeFormat')}>✕</TB>
      </div>

      {/* ── EDITOR AREA ─────────────────────────────────────────── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        className="blog-content h-[500px] overflow-y-auto px-6 py-5 focus:outline-none text-ink-800 leading-relaxed"
        onInput={() => onChange(editorRef.current?.innerHTML || '')}
        onKeyUp={updateActiveFormats}
        onClick={handleEditorClick}
        onPaste={(e) => {
          // Strip MS Word garbage
          e.preventDefault();
          const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
          document.execCommand('insertHTML', false, text);
          onChange(editorRef.current?.innerHTML || '');
        }}
      />

      {/* ── MODALS ──────────────────────────────────────────────── */}
      {showImageModal && (
        <ImageInsertModal
          onInsert={handleImageInsert}
          onClose={() => setShowImageModal(false)}
        />
      )}
      {showLinkModal && (
        <LinkModal
          onInsert={handleLinkInsert}
          onClose={() => setShowLinkModal(false)}
          selectedText={savedRange?.toString() || ''}
        />
      )}
    </div>
  );
}
