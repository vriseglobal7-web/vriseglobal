import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AboutPage from './pages/About.tsx';
import FAQPage from './pages/FAQ.tsx';
import ShowsPage from './pages/Shows.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shows" element={<ShowsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
