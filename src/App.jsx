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

// Admin imports
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminHeroSlides from './admin/pages/AdminHeroSlides';
import AdminServices from './admin/pages/AdminServices';
import AdminServicesDetail from './admin/pages/AdminServicesDetail';
import AdminIndustries from './admin/pages/AdminIndustries';
import AdminProcess from './admin/pages/AdminProcess';
import AdminPortfolio from './admin/pages/AdminPortfolio';
import AdminPortfolioDetail from './admin/pages/AdminPortfolioDetail';
import AdminTestimonials from './admin/pages/AdminTestimonials';
import AdminAbout from './admin/pages/AdminAbout';
import AdminContact from './admin/pages/AdminContact';
import AdminCTA from './admin/pages/AdminCTA';
import { AdminDataProvider } from './admin/context/AdminDataContext';
import { NotificationProvider, useNotification } from './admin/context/NotificationContext';

function HomePage() {
  useScrollReveal();
  const location = useLocation();

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
          if (window.lenis) { window.lenis.scrollTo(y); } else { window.scrollTo({ top: y }); }
        } else { setTimeout(scrollToElement, 100); }
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

function PublicSite() {
  return (
    <>
      <Navbar />
      <div style={{ width: '100%', margin: 0, padding: 0 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio/:slug" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/#home" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function AppWithNotifications() {
  const { notify } = useNotification();

  return (
    <AdminDataProvider onNotify={notify}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin panel — no Navbar/Footer */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="hero-slides" element={<AdminHeroSlides />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services-detail" element={<AdminServicesDetail />} />
            <Route path="services-detail/:slug" element={<AdminServicesDetail />} />
            <Route path="industries" element={<AdminIndustries />} />
            <Route path="process" element={<AdminProcess />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="portfolio-detail" element={<AdminPortfolioDetail />} />
            <Route path="portfolio-detail/:slug" element={<AdminPortfolioDetail />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="cta" element={<AdminCTA />} />
          </Route>

          {/* Public site — all other routes */}
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </BrowserRouter>
    </AdminDataProvider>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });
    window.lenis = lenis;
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <NotificationProvider>
      <AppWithNotifications />
    </NotificationProvider>
  );
}