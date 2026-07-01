import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../context/authStore';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-brand-600/30">
            B
          </div>
          <h1 className="font-serif text-white text-2xl font-bold">ENH Consulting</h1>
          <p className="text-ink-400 text-sm mt-1">Sign in to your admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ink-900 rounded-2xl p-7 shadow-2xl space-y-4 border border-ink-800">
          <div>
            <label className="block text-xs font-semibold text-ink-400 uppercase tracking-wider mb-1.5">Email</label>
            <input
              type="email"
              required
              placeholder="admin@example.com"
              className="w-full px-3 py-2.5 bg-ink-800 border border-ink-700 rounded-lg text-white placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-400 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-ink-800 border border-ink-700 rounded-lg text-white placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm mt-2"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-ink-600 text-xs mt-4">
          First time? Visit <code className="text-ink-400">/api/auth/register</code> to create an account
        </p>
      </div>
    </div>
  );
}
