import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BlogHeader() {
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-ink-100 shadow-sm">
      <div className="  mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">B</div>
          <span className="font-serif font-bold text-ink-900 text-xl hidden sm:block">Blog</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-ink-600 hover:text-ink-900 text-sm font-medium transition-colors">Home</Link>
          <Link to="/category/technology" className="text-ink-600 hover:text-ink-900 text-sm font-medium transition-colors">Technology</Link>
          <Link to="/category/lifestyle" className="text-ink-600 hover:text-ink-900 text-sm font-medium transition-colors">Lifestyle</Link>
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-sm hidden sm:flex">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-ink-50 border border-ink-100 rounded-full text-sm text-ink-700 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 text-sm">🔍</span>
          </div>
        </form>

        {/* Mobile menu */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-ink-600 hover:text-ink-900">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-100 bg-white px-4 py-4 space-y-3 animate-fade-in">
          <form onSubmit={handleSearch} className="flex">
            <input type="search" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-ink-50 border border-ink-100 rounded-l-full text-sm focus:outline-none" />
            <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-r-full text-sm">Go</button>
          </form>
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-ink-700 py-2 border-b border-ink-50">Home</Link>
          <Link to="/category/technology" onClick={() => setMobileOpen(false)} className="block text-ink-700 py-2">Technology</Link>
        </div>
      )}
    </header>
  );
}
