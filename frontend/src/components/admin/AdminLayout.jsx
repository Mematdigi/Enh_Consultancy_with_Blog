import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../../context/authStore';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const nav = [
  { to: '/admin/dashboard',   icon: '⊞',  label: 'Dashboard'   },
  { to: '/admin/posts',       icon: '✏️',  label: 'Posts'        },
  { to: '/admin/media',       icon: '🖼',  label: 'Media'        },
  { to: '/admin/categories',  icon: '🗂',  label: 'Categories'   },
  { to: '/admin/tags',        icon: '🏷',  label: 'Tags'         },
  { to: '/admin/authors',     icon: '👤',  label: 'Authors'      },
  { to: '/admin/comments',    icon: '💬',  label: 'Comments'     },
  { to: '/admin/enquiry-data',   icon: '📋',  label: 'Enquiries'    }, // ← NEW
];

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [newEnquiries, setNewEnquiries] = useState(0);

  // Poll for new enquiries count every 60 s
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/enquiries?limit=1&status=new');
        setNewEnquiries(data.stats?.new ?? 0);
      } catch {
        // silently fail — admin sidebar shouldn't break on network error
      }
    };
    fetch();
    const interval = setInterval(fetch, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ink-950">

      {/* ── Sidebar ── */}
      <aside className="w-64 flex flex-col border-r border-ink-800 bg-ink-900 shrink-0 overflow-y-auto">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-ink-800 sticky top-0 bg-ink-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
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
              <span className="flex-1">{item.label}</span>

              {/* New enquiries badge */}
              {item.to === '/admin/enquiries' && newEnquiries > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                  {newEnquiries > 99 ? '99+' : newEnquiries}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-ink-800 bg-ink-900 sticky bottom-0">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.name || 'Admin'}</p>
              <p className="text-ink-500 text-[10px] truncate">{user?.email || 'admin@blog.com'}</p>
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

      {/* ── Main Content ── */}
      <main className="flex-1 h-full overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}