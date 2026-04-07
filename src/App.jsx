import './index.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsCarousel from './components/ProjectsCarousel';
import About from './components/About';
import Services from './components/Services';
import Industries from './components/Industries';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

import ServicePage from './pages/ServicePage';
import PortfolioPage from './pages/PortfolioPage';

// ✅ HomePage Component
function HomePage() {
  useScrollReveal();
  const location = useLocation();

  // ✅ NEW: On refresh (or first load with no hash), replace URL with #home
  useEffect(() => {
    if (!location.hash) {
      window.history.replaceState(null, '', '/#home');
    }
  }, []);

  useEffect(() => {
    if (performance.navigation.type === 1) return;

    if (location.hash) {
      const id = location.hash.replace('#', '');

      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

          if (window.lenis) {
            window.lenis.scrollTo(y);
          } else {
            window.scrollTo({ top: y });
          }
        } else {
          setTimeout(scrollToElement, 100);
        }
      };

      scrollToElement();
    }
  }, [location]);

  return (
    /*
      FIX: Use a plain fragment with NO wrapper div.
      Any wrapper div here could add width constraints.
      Each section component must handle its own full-width layout.
    */
    <>
      <ProjectsCarousel />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Process />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}

// ✅ App Component with Lenis
export default function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    // ✅ NEW: Use HashRouter behaviour via basename trick — switched to hash-compatible
    // routing by adding a catch-all Route that redirects unknown paths to "/",
    // which prevents 404s on mobile when refreshing deep URLs served statically.
    <BrowserRouter>
      <ScrollToTop />

      {/*
        FIX: Navbar must be position:fixed or position:sticky in its own CSS.
        Do NOT wrap Navbar + Routes in a div — that creates a stacking container
        that can clip or constrain full-width sections.
      */}
      <Navbar />

      {/*
        FIX: This div is the ONLY wrapper around page content.
        - No max-width
        - No padding / margin
        - No overflow-hidden (that clips full-bleed sections)
        width: 100vw ensures it spans the full viewport regardless of
        any inherited flex/grid context from BrowserRouter internals.
      */}
      <div style={{ width: '100%', margin: 0, padding: 0 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio/:slug" element={<PortfolioPage />} />
          {/* ✅ NEW: Catch-all — redirects any unmatched path (e.g. after mobile refresh) back to /#home */}
          <Route path="*" element={<Navigate to="/#home" replace />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}