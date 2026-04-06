import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../context/authStore';
import toast from 'react-hot-toast';

const nav = [
  { to: '/admin/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/admin/posts', icon: '✏️', label: 'Posts' },
  { to: '/admin/media', icon: '🖼', label: 'Media' },
  { to: '/admin/categories', icon: '🗂', label: 'Categories' },
  { to: '/admin/tags', icon: '🏷', label: 'Tags' },
  { to: '/admin/authors', icon: '👤', label: 'Authors' },
  { to: '/admin/comments', icon: '💬', label: 'Comments' },
];

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="admin-sidebar flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-ink-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">B</div>
            <div>
              <p className="text-white font-semibold text-sm">Blog CMS</p>
              <p className="text-ink-400 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white font-medium'
                    : 'text-ink-400 hover:text-white hover:bg-ink-800'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-ink-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.name}</p>
              <p className="text-ink-500 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-red-400 hover:bg-ink-800 transition-all"
          >
            <span>→</span> Logout
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-white hover:bg-ink-800 transition-all mt-0.5"
          >
            <span>↗</span> View Blog
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content flex-1">
        <Outlet />
      </main>
    </div>
  );
}
