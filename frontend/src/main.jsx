import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async'; // ← ADD THIS
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './assets/styles/style.scss';
// import TargetCursor from './pages/transitions/TargetCursor';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider> {/* ← WRAP HERE */}
      <BrowserRouter>
        {/* <TargetCursor size={48} color="#ffdf86" speed={0.12} /> */}
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 3500, style: { fontFamily: 'DM Sans, sans-serif', fontSize: '14px' } }} />
      </BrowserRouter>
    </HelmetProvider> {/* ← CLOSE HERE */}
  </React.StrictMode>
);