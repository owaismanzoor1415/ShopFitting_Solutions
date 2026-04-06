import { useState, useEffect } from 'react';
import { heroSlides } from '../data/siteData';

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  // FIX: removed navHeight state — it was measured but never actually used
  // in any style or layout calculation, so it was dead code causing confusion.
  // If you need to offset for a fixed navbar, use CSS (e.g. padding-top on the
  // parent layout or a top: <navbarHeight>px on a fixed element) instead.

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full bg-black overflow-hidden"
      style={{
        // FIX: use a reliable responsive height.
        // 60vh gives a good mid-size hero on all screens.
        // On very small phones this still renders cleanly.
        // Adjust minHeight to suit your design.
        minHeight: '60vh',
      }}
    >
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1000ms ease-in-out',
            // FIX: always keep non-active slides non-interactive so they
            // don't accidentally capture clicks or keyboard events
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          {/* Background image */}
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

          {/* Dark gradient overlay — stronger at bottom so text is always readable */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          {/* SLIDE TEXT + THUMBNAIL — pinned to bottom, always visible */}
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
              // FIX: animate only the active slide's text in — inactive slides
              // are already invisible (opacity: 0 on parent) so this is purely
              // for the smooth text entrance on the active slide
              opacity: i === current ? 1 : 0,
              transform: i === current ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s',
            }}
          >
            {/* Thumbnail row */}
            {(slide.thumbnail || slide.thumbnail_label) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {slide.thumbnail && (
                  <img
                    src={slide.thumbnail}
                    alt=""
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(255,255,255,0.6)',
                      flexShrink: 0,
                    }}
                  />
                )}
                {slide.thumbnail_label && (
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.75)',
                      fontWeight: 600,
                    }}
                  >
                    {slide.thumbnail_label}
                  </span>
                )}
              </div>
            )}

            {/* Slide title */}
            {slide.title && (
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.6rem, 6vw, 4rem)',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {slide.title}
              </h2>
            )}

            {/* Slide subtitle */}
            {slide.subtitle && (
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(0.75rem, 2.2vw, 0.95rem)',
                  color: 'rgba(255,255,255,0.65)',
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: 420,
                }}
              >
                {slide.subtitle}
              </p>
            )}

            {/* Dot indicators — always above the bottom edge, inside the text block */}
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