import { useState, useEffect } from 'react';
import { heroSlides } from '../data/siteData';

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-black overflow-hidden">

      {/* 🔥 MOBILE + DESKTOP HEIGHT */}
      <div className="w-full h-auto md:h-[100vh] flex justify-center items-center">

        {heroSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.img}
            alt={slide.title}
            className={`
              transition-opacity duration-1000
              ${i === current ? 'opacity-100' : 'opacity-0 absolute'}

              /* MOBILE */
              w-full h-auto object-cover

              /* DESKTOP */
              md:absolute md:inset-0 md:w-full md:h-full md:object-cover
            `}
          />
        ))}

      </div>

    </section>
  );
}