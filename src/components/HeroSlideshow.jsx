import { useState, useEffect } from 'react';
import { useAdminData } from '../admin/context/AdminDataContext';

export default function HeroSlideshow() {
  const { data } = useAdminData();
  const heroSlides = data.heroSlides || [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  if (heroSlides.length === 0) return null;

  return (
    <section
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: '60vh' }}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1000ms ease-in-out',
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          <img
            src={slide.img}
            alt={slide.title || `Slide ${i + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              padding: 'clamp(1rem, 4vw, 2rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              opacity: i === current ? 1 : 0,
              transform: i === current ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s',
            }}
          >
            {(slide.thumbnail || slide.thumbnail_label) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {slide.thumbnail && (
                  <img
                    src={slide.thumbnail}
                    alt=""
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(255,255,255,0.6)',
                      flexShrink: 0,
                    }}
                  />
                )}
                {slide.thumbnail_label && (
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 600,
                  }}>
                    {slide.thumbnail_label}
                  </span>
                )}
              </div>
            )}
            {slide.title && (
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.6rem, 6vw, 4rem)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                {slide.title}
              </h2>
            )}
            {slide.subtitle && (
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(0.75rem, 2.2vw, 0.95rem)',
                color: 'rgba(255,255,255,0.65)',
                margin: 0,
                lineHeight: 1.6,
                maxWidth: 420,
              }}>
                {slide.subtitle}
              </p>
            )}
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: idx === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: idx === current ? '#EA580C' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
