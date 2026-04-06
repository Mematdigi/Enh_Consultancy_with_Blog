import { create } from 'zustand';
import api from '../utils/api';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('blog_user') || 'null'),
  token: localStorage.getItem('blog_token') || null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('blog_token', data.token);
      localStorage.setItem('blog_user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token, loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('blog_token');
    localStorage.removeItem('blog_user');
    set({ user: null, token: null });
  },

  isAuthenticated: () => !!get().token,
}));

export default useAuthStore;
