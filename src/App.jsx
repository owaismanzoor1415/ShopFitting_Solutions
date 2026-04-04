import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

useEffect(() => {
  // ❌ Ignore scroll on page refresh
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
<> <ProjectsCarousel /> <Hero /> <About /> <Services /> <Industries /> <Process /> <Portfolio /> <Testimonials /> <CTA /> <Contact />
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

// ✅ Make Lenis global
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

return ( <BrowserRouter> <ScrollToTop /> <Navbar />

```
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/services/:slug" element={<ServicePage />} />
    <Route path="/services" element={<Services />} />
    <Route path="/portfolio/:slug" element={<PortfolioPage />} />
  </Routes>

  <Footer />
</BrowserRouter>

);
}
