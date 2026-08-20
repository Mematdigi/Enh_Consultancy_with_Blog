import { Routes, Route, Navigate, Router } from 'react-router-dom';
import useAuthStore from './context/authStore';

// Public Pages
import BlogHome from './pages/public/BlogHome';
import BlogPost from './pages/public/BlogPost';
import CategoryPage from './pages/public/CategoryPage';
import TagPage from './pages/public/TagPage';
import SearchPage from './pages/public/SearchPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PostsList from './pages/admin/PostsList';
import PostEditor from './pages/admin/PostEditor';
import MediaLibrary from './pages/admin/MediaLibrary';
import CategoriesManager from './pages/admin/CategoriesManager';
import TagsManager from './pages/admin/TagsManager';
import AuthorsManager from './pages/admin/AuthorsManager';
import CommentsManager from './pages/admin/CommentsManager';

import Home from './pages/enhPages/Home';
import About from './pages/enhPages/About';
import Services from './pages/enhPages/Services';
import DigitalMarketingConsulting from './pages/enhPages/DigitalMarketingConsulting';
import ItConsultancy from './pages/enhPages/ITConsulting';
import BusinessConsultancy from './pages/enhPages/BusinessConsulting';
import Contact from './pages/enhPages/Contact';
import Header from './components/enhComponent/Header';
import Footer from './components/enhComponent/Footer';
import EnquiriesManager from './pages/admin/EnquiriesManager';
import AiConsulting from './pages/enhPages/AiConsulting';
import EdTechConsultancy from './pages/enhPages/EdTechConsulting';
import StartupConsultancy from './pages/enhPages/StartupConsulting';
import DigitalMarketingAgency from './pages/enhPages/innerService/DigitalMarketingAgencyInDubai';
import SEOAgencyDubai from './pages/enhPages/innerService/SeoAgencyInDubai';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <>
    
      <Header />
      <Routes>
        {/* enh public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/consulting" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai-consulting-services-in-dubai" element={<AiConsulting />} />
        <Route path="/business-consulting-services-in-dubai" element={<BusinessConsultancy />} />
        <Route path="/digital-marketing-consulting-services-in-dubai" element={<DigitalMarketingConsulting />} />
        <Route path="/edtech-consulting-services-in-dubai" element={<EdTechConsultancy />} />
        <Route path="/it-consulting-services-in-dubai" element={<ItConsultancy />} />
        <Route path="/startup-consulting-services-in-dubai" element={<StartupConsultancy />} />

        <Route path="/digital-marketing-agency-in-dubai" element={<DigitalMarketingAgency />} />
        <Route path="/best-seo-agency-in-dubai" element={<SEOAgencyDubai />} />

        {/* blog Public Routes */}
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/tag/:slug" element={<TagPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/new" element={<PostEditor />} />
          <Route path="posts/edit/:id" element={<PostEditor />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="categories" element={<CategoriesManager />} />
          <Route path="tags" element={<TagsManager />} />
          <Route path="authors" element={<AuthorsManager />} />
          <Route path="comments" element={<CommentsManager />} />
          <Route path="enquiry-data" element={<EnquiriesManager />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
