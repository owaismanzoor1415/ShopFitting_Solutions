import { useState, useEffect } from 'react';
import { heroSlides } from '../data/siteData';

export default function ProjectsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden z-0 pointer-events-none">

      {/* 🔥 SLIDES */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
            i === current
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-100'
          }`}
        >
          <img
            src={slide.img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* 🔥 LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* 🔥 MOBILE: LEFT TEXT + RIGHT THUMBNAIL */}
      <div className="absolute bottom-4 left-0 w-full px-4 z-10 flex items-center justify-between sm:hidden pointer-events-auto">

        {/* TEXT */}
        <p className="text-xs bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
          {heroSlides[current].title}
        </p>

        {/* SINGLE THUMBNAIL */}
        <img
          src={heroSlides[current].img}
          onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
          className="w-20 h-12 object-cover cursor-pointer rounded border-2 border-orange-500"
          alt="thumb"
        />
      </div>

      {/* 🔥 DESKTOP */}
      <div className="hidden sm:block">

        {/* TEXT (LEFT) */}
        <div className="absolute bottom-6 left-8 z-10">
          <p className="text-sm font-medium bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            {heroSlides[current].title}
          </p>
        </div>

        {/* SINGLE THUMBNAIL (RIGHT) */}
        <div className="absolute bottom-6 right-8 z-10 pointer-events-auto">
          <img
            src={heroSlides[current].img}
            onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
            className="w-24 h-16 object-cover cursor-pointer rounded-md border-2 border-orange-500 transition-all duration-300 hover:scale-105"
            alt="thumb"
          />
        </div>

      </div>

      {/* 🔥 BOTTOM BLEND */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black/70"></div>

    </section>
  );
}