import { useState, useEffect } from 'react';
import { heroSlides } from '../data/siteData';

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* 🔥 SLIDES */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[1500ms] ${
            i === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          <img
            src={slide.img}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}

      {/* 🔥 DARK OVERLAY (PREMIUM LOOK) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🔥 OPTIONAL ORANGE LIGHT (BRANDING) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-orange-500/30"></div>

    </section>
  );
}