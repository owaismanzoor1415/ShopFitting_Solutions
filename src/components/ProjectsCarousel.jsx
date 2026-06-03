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
    <section
      id="home"
      style={{
        position: 'relative',
        /*
          FIX 1 — WIDTH:
          100vw guarantees the section spans the full viewport width.
          'w-full' can be limited by a parent's width; vw units bypass that entirely.
        */
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',

        /*
          FIX 2 — HEIGHT on mobile:
          100dvh = dynamic viewport height, shrinks when browser chrome
          (address bar) hides/shows. Thumbnail is ALWAYS visible.
          Falls back to 100vh on older browsers.
          We subtract the navbar height (64px = h-16 in your Navbar).
          Change 64px if your navbar height is different.
        */
        height: 'calc(100dvh - 64px)',
        minHeight: 300,
        overflow: 'hidden',
        zIndex: 0,
        marginTop: '64px', /* push content below the fixed navbar */
      }}
    >

      {/* SLIDES */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 2000ms ease-in-out',
          }}
        >
          <img
            src={slide.img}
            alt={slide.title || ''}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
      ))}

      {/* LIGHT OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.2)',
        pointerEvents: 'none',
      }} />

      {/* BOTTOM BLEND */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 128,
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
        pointerEvents: 'none',
      }} />

      {/*
        BOTTOM BAR — text left, thumbnail right.
        Uses env(safe-area-inset-bottom) so iPhone home bar never clips it.
      */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 'clamp(1rem, 4vw, 2rem)',
        paddingRight: 'clamp(1rem, 4vw, 2rem)',
        paddingTop: '1rem',
        /* Safe area so iPhone home-bar never covers thumbnail */
        paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
      }}>

        {/* SLIDE TITLE */}
        <p style={{
          fontSize: 'clamp(0.7rem, 2.5vw, 0.875rem)',
          fontWeight: 500,
          background: 'linear-gradient(to right, #f97316, #fb923c, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          maxWidth: '60%',
          lineHeight: 1.4,
        }}>
          {heroSlides[current].title}
        </p>

        {/* THUMBNAIL */}
        <img
          src={heroSlides[current].img}
          alt="thumb"
          onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
          style={{
            width: 'clamp(72px, 15vw, 96px)',
            height: 'clamp(48px, 10vw, 64px)',
            objectFit: 'cover',
            cursor: 'pointer',
            borderRadius: 6,
            border: '2px solid #f97316',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

    </section>
  );
}