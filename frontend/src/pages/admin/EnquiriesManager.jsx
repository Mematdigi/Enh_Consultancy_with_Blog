import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

// ─── Source labels & colors ───────────────────────────────────────────────────
const SOURCE_META = {
  'banner-quote':      { label: 'Banner Quote',      color: 'bg-violet-100 text-violet-700',  dot: 'bg-violet-500' },
  'home-contact':      { label: 'Home Contact',      color: 'bg-blue-100 text-blue-700',      dot: 'bg-blue-500'   },
  'home-newsletter':   { label: 'Newsletter',        color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500'},
  'footer-subscribe':  { label: 'Footer Subscribe',  color: 'bg-teal-100 text-teal-700',      dot: 'bg-teal-500'   },
  'svp-hero':          { label: 'Service Hero',      color: 'bg-orange-100 text-orange-700',  dot: 'bg-orange-500' },
  'svp-contact':       { label: 'Service Contact',   color: 'bg-rose-100 text-rose-700',      dot: 'bg-rose-500'   },
};

const STATUS_META = {
  new:      { label: 'New',      color: 'bg-amber-100 text-amber-700'   },
  read:     { label: 'Read',     color: 'bg-blue-100 text-blue-700'     },
  replied:  { label: 'Replied',  color: 'bg-emerald-100 text-emerald-700'},
  archived: { label: 'Archived', color: 'bg-ink-100 text-ink-500'       },
};

function SourceBadge({ source }) {
  const meta = SOURCE_META[source] || { label: source, color: 'bg-ink-100 text-ink-600', dot: 'bg-ink-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${meta.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || { label: status, color: 'bg-ink-100 text-ink-600' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${meta.color}`}>
      {meta.label}
    </span>
  );
}

// ─── Detail Drawer ────────────────────────────────────────────────────────────
function DetailDrawer({ enquiry, onClose, onStatusChange, onDelete }) {
  const [status, setStatus] = useState(enquiry.status);
  const [note, setNote] = useState(enquiry.adminNote || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/enquiries/${enquiry._id}`, { status, adminNote: note });
      toast.success('Updated');
      onStatusChange({ ...enquiry, status, adminNote: note });
    } catch { toast.error('Update failed'); }
    finally { setSaving(false); }
  };

  const fields = [
    { label: 'Name',    value: enquiry.name || enquiry.fullName },
    { label: 'Email',   value: enquiry.email },
    { label: 'Phone',   value: enquiry.phone },
    { label: 'Subject', value: enquiry.subject },
    { label: 'Service', value: enquiry.service },
    { label: 'Website', value: enquiry.website },
  ].filter((f) => f.value);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-ink-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-serif font-bold text-ink-900 text-lg">{enquiry.name || enquiry.fullName || enquiry.email}</h2>
            <div className="flex items-center gap-2 mt-1">
              <SourceBadge source={enquiry.source} />
              <StatusBadge status={enquiry.status} />
            </div>
          </div>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 text-xl leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-5 space-y-5">
          {/* Submitted at */}
          <p className="text-xs text-ink-400">
            Submitted {format(new Date(enquiry.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </p>

          {/* Fields */}
          <div className="space-y-3">
            {fields.map((f) => (
              <div key={f.label}>
                <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-0.5">{f.label}</p>
                {f.label === 'Email' ? (
                  <a href={`mailto:${f.value}`} className="text-brand-600 hover:underline text-sm">{f.value}</a>
                ) : f.label === 'Website' ? (
                  <a href={f.value} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline text-sm">{f.value}</a>
                ) : (
                  <p className="text-ink-800 text-sm">{f.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Message */}
          {enquiry.message && (
            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-1">Message</p>
              <div className="bg-ink-50 rounded-xl p-4 text-ink-700 text-sm leading-relaxed whitespace-pre-wrap">
                {enquiry.message}
              </div>
            </div>
          )}

          <hr className="border-ink-100" />

          {/* Status update */}
          <div>
            <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">Update Status</label>
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Admin note */}
          <div>
            <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">Admin Note</label>
            <textarea
              className="textarea h-24"
              placeholder="Internal note (not visible to user)…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Quick reply link */}
          {enquiry.email && (
            <a
              href={`mailto:${enquiry.email}?subject=Re: Your enquiry on ENH Consulting`}
              className="btn-primary w-full justify-center text-sm flex items-center gap-2"
            >
              ✉ Reply via Email
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-ink-100 flex gap-3 sticky bottom-0 bg-white">
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center text-sm">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            onClick={() => onDelete(enquiry._id)}
            className="btn-ghost text-sm px-3 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stats strip ──────────────────────────────────────────────────────────────
function StatsStrip({ stats }) {
  const items = [
    { label: 'Total',    value: stats.total,    color: 'text-ink-900'      },
    { label: 'New',      value: stats.new,      color: 'text-amber-600'    },
    { label: 'Read',     value: stats.read,     color: 'text-blue-600'     },
    { label: 'Replied',  value: stats.replied,  color: 'text-emerald-600'  },
    { label: 'Archived', value: stats.archived, color: 'text-ink-400'      },
  ];
  return (
    <div className="grid grid-cols-5 gap-3 mb-6">
      {items.map((s) => (
        <div key={s.label} className="card p-4 text-center">
          <p className={`text-2xl font-bold ${s.color}`}>{s.value ?? 0}</p>
          <p className="text-ink-500 text-xs mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [stats, setStats]         = useState({});
  const [pagination, setPagination] = useState({});

  // Filters
  const [search, setSearch]   = useState('');
  const [source, setSource]   = useState('');
  const [status, setStatus]   = useState('');
  const [page, setPage]       = useState(1);

  // Detail drawer
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (source) params.set('source', source);
      if (status) params.set('status', status);
      if (search) params.set('search', search);

      const { data } = await api.get(`/enquiries?${params}`);
      setEnquiries(data.data);
      setStats(data.stats || {});
      setPagination(data.pagination || {});
    } catch { toast.error('Failed to load enquiries'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page, source, status]); // eslint-disable-line

  const handleSearch = (e) => { e.preventDefault(); setPage(1); load(); };

  const handleOpen = async (enq) => {
    setSelected(enq);
    // If it's still 'new', mark as read optimistically
    if (enq.status === 'new') {
      setEnquiries((prev) =>
        prev.map((e) => e._id === enq._id ? { ...e, status: 'read' } : e)
      );
    }
  };

  const handleStatusChange = (updated) => {
    setEnquiries((prev) =>
      prev.map((e) => e._id === updated._id ? updated : e)
    );
    setSelected(updated);
    load(); // refresh stats
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      toast.success('Enquiry deleted');
      setSelected(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  const handleBulkArchive = async () => {
    if (!confirm('Archive all new enquiries?')) return;
    // archive individually — simple approach
    const newOnes = enquiries.filter((e) => e.status === 'new');
    await Promise.all(newOnes.map((e) => api.put(`/enquiries/${e._id}`, { status: 'archived' })));
    toast.success(`${newOnes.length} archived`);
    load();
  };

  return (
    <div className="p-8 mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink-900">Enquiries & Leads</h1>
          <p className="text-ink-500 text-sm mt-0.5">All form submissions from the website</p>
        </div>
        {stats.new > 0 && (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              {stats.new} new {stats.new === 1 ? 'lead' : 'leads'}
            </span>
            <button onClick={handleBulkArchive} className="btn-secondary text-xs">Archive All New</button>
          </div>
        )}
      </div>

      {/* Stats */}
      <StatsStrip stats={stats} />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search name, email, phone…"
            className="input flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn-secondary text-sm px-3">Search</button>
        </form>

        {/* Source filter */}
        <select
          className="input w-48"
          value={source}
          onChange={(e) => { setSource(e.target.value); setPage(1); }}
        >
          <option value="">All Sources</option>
          {Object.entries(SOURCE_META).map(([key, meta]) => (
            <option key={key} value={key}>{meta.label}</option>
          ))}
        </select>

        {/* Status filter */}
        <select
          className="input w-36"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>

        {(source || status || search) && (
          <button
            onClick={() => { setSource(''); setStatus(''); setSearch(''); setPage(1); setTimeout(load, 0); }}
            className="btn-secondary text-sm text-ink-500"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Source quick-filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => { setSource(''); setPage(1); }}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
            source === '' ? 'bg-ink-900 text-white border-ink-900' : 'border-ink-200 text-ink-600 hover:border-ink-400'
          }`}
        >
          All
        </button>
        {Object.entries(SOURCE_META).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => { setSource(key); setPage(1); }}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium flex items-center gap-1.5 ${
              source === key
                ? `${meta.color} border-current`
                : 'border-ink-200 text-ink-600 hover:border-ink-400'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-50 border-b border-ink-100">
              <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider">Contact</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider hidden md:table-cell">Source</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider hidden lg:table-cell">Service</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider hidden lg:table-cell">Message</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-ink-600 uppercase tracking-wider hidden xl:table-cell">Date</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-ink-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-ink-400">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    Loading…
                  </div>
                </td>
              </tr>
            ) : enquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-ink-400">No enquiries found</p>
                  {(source || status || search) && (
                    <button
                      onClick={() => { setSource(''); setStatus(''); setSearch(''); setPage(1); }}
                      className="text-brand-600 text-sm mt-2 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr
                  key={enq._id}
                  onClick={() => handleOpen(enq)}
                  className={`hover:bg-ink-50 transition-colors cursor-pointer ${
                    enq.status === 'new' ? 'bg-amber-50/40' : ''
                  }`}
                >
                  {/* Contact */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm flex-shrink-0">
                        {(enq.name || enq.fullName || enq.email || '?')[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-medium text-ink-900 truncate text-sm ${enq.status === 'new' ? 'font-semibold' : ''}`}>
                          {enq.name || enq.fullName || '—'}
                          {enq.status === 'new' && (
                            <span className="ml-2 inline-block w-1.5 h-1.5 bg-amber-500 rounded-full align-middle" />
                          )}
                        </p>
                        <p className="text-ink-400 text-xs truncate">{enq.email}</p>
                        {enq.phone && <p className="text-ink-400 text-xs">{enq.phone}</p>}
                      </div>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <SourceBadge source={enq.source} />
                  </td>

                  {/* Service */}
                  <td className="px-5 py-3.5 hidden lg:table-cell text-ink-600 text-xs">
                    {enq.service || '—'}
                  </td>

                  {/* Message preview */}
                  <td className="px-5 py-3.5 hidden lg:table-cell max-w-xs">
                    <p className="text-ink-500 text-xs line-clamp-2">{enq.message || '—'}</p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <StatusBadge status={enq.status} />
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 hidden xl:table-cell text-ink-400 text-xs whitespace-nowrap">
                    {format(new Date(enq.createdAt), 'MMM d, yyyy')}
                    <br />
                    {format(new Date(enq.createdAt), 'h:mm a')}
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleOpen(enq)}
                        className="btn-ghost text-xs py-1 px-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="btn-ghost text-xs py-1 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Detail Drawer */}
      {selected && (
        <DetailDrawer
          enquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}