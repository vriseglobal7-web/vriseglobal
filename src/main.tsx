import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ScrollToTop from './ScrollToTop.tsx';
import './index.css';

const AboutPage = lazy(() => import('./pages/About.tsx'));
const FAQPage = lazy(() => import('./pages/FAQ.tsx'));
const ShowsPage = lazy(() => import('./pages/Shows.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shows" element={<ShowsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
