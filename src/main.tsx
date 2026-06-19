import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import ScrollToTop from './ScrollToTop.tsx';
import './index.css';

const AboutPage = lazy(() => import('./pages/About.tsx'));
const FAQPage = lazy(() => import('./pages/FAQ.tsx'));
const ShowsPage = lazy(() => import('./pages/Shows.tsx'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 rounded-full border-4 border-secondary-green border-t-transparent animate-spin" />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shows" element={<ShowsPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
);
