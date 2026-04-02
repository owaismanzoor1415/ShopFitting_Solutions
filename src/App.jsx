import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from 'react';
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

function HomePage() {
  useScrollReveal();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');

      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          setTimeout(scrollToElement, 100);
        }
      };

      scrollToElement();
    }
  }, [location]);

  return (
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      {/* ✅ GLOBAL NAVBAR */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio/:slug" element={<PortfolioPage />} />
      </Routes>

      {/* ✅ GLOBAL FOOTER (IMPORTANT FIX) */}
      <Footer />

    </BrowserRouter>
  );
}