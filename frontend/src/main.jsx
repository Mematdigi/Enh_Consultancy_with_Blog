import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './assets/styles/style.scss';
// import TargetCursor from './pages/transitions/TargetCursor';

const rootElement = document.getElementById('root');

// Store your entire app tree in a variable to keep the code clean
const appTree = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            duration: 3500, 
            style: { fontFamily: 'DM Sans, sans-serif', fontSize: '14px' } 
          }} 
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Check if react-snap has already populated the HTML
if (rootElement.hasChildNodes()) {
  // If yes, hydrate the existing HTML for SEO
  hydrateRoot(rootElement, appTree);
} else {
  // If no (during local development), render normally
  const root = createRoot(rootElement);
  root.render(appTree);
}