import { ArrowRight, Download, Award, Clock, Shield, ChevronDown, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '500+',   label: 'Projects Delivered' },
  { value: '18',     label: 'Years Experience' },
  { value: '98%',    label: 'Client Satisfaction' },
  { value: '£120M+', label: 'Value Fitted Out' },
];

const trustBadges = [
  { Icon: Award,  text: 'Award Winning Design' },
  { Icon: Clock,  text: 'On-Time Delivery' },
  { Icon: Shield, text: '10-Year Warranty' },
];

/* ── Animated counter ── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let current = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, animate }) {
  const num     = parseInt(stat.value.replace(/\D/g, ''), 10);
  const count   = useCounter(stat.value, 1800, animate);
  const prefix  = stat.value.match(/^[^\d]*/)?.[0]  ?? '';
  const suffix  = stat.value.match(/[^\d]*$/)?.[0]  ?? '';
  const display = num ? `${prefix}${count}${suffix}` : stat.value;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.2rem, 2vw, 2rem)',
        fontWeight: 700,
        color: '#EA580C',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}>
        {display}
      </span>
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
        color: 'rgba(80,80,80,0.55)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}>
        {stat.label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
export default function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [showReel, setShowReel]         = useState(false);
  const [navH, setNavH]                 = useState(80);
  const statsRef = useRef(null);

  /* Measure real navbar height */
  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector('nav') || document.querySelector('header');
      if (nav) setNavH(nav.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* Escape closes modal */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setShowReel(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  /* Stats counter trigger */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    // Check if already visible on load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setStatsVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Desktop cards data */
  const desktopCards = [
    { label: 'Luxury Retail',    sub: 'Mayfair, London',  delay: '0.1s' },
    { label: 'Fashion Boutique', sub: 'Knightsbridge',    delay: '0.2s' },
    { label: 'Flagship Store',   sub: 'Manchester',       delay: '0.3s' },
  ];

  /* Mobile cards data */
  const mobileCards = [
    { label: 'Luxury Retail',    sub: 'Mayfair, London' },
    { label: 'Fashion Boutique', sub: 'Knightsbridge' },
    { label: 'Flagship Store',   sub: 'Manchester' },
  ];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        background: '#ffffff',
        zIndex: 1,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        // FIX: NO minHeight/flex that causes the gap. Just let content dictate height naturally.
        // The section grows to fit its content + paddingTop for navbar.
      }}
    >
      {/* ── FONTS + KEYFRAMES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Syne:wght@400;500;600;700;800&display=swap');

        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: translateY(8px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cta-primary { transition: background .2s, transform .2s, box-shadow .2s !important; }
        .cta-primary:hover { background: #c2410c !important; transform: translateY(-2px) !important; box-shadow: 0 12px 40px rgba(234,88,12,.3) !important; }
        .cta-watch { transition: background .2s, border-color .2s, transform .2s !important; }
        .cta-watch:hover { background: rgba(0,0,0,.03) !important; border-color: rgba(0,0,0,.2) !important; transform: translateY(-2px) !important; }
        .cta-ghost { transition: color .2s, border-color .2s, transform .2s !important; }
        .cta-ghost:hover { color: rgba(0,0,0,.7) !important; border-color: rgba(234,88,12,.4) !important; transform: translateY(-2px) !important; }

        /* Mobile card scroller */
        .proj-scroll { display: flex; overflow-x: auto; gap: 10px; padding-bottom: 4px; scrollbar-width: none; -ms-overflow-style: none; }
        .proj-scroll::-webkit-scrollbar { display: none; }
        .proj-card { flex-shrink: 0; }

        /* Desktop-only right panel */
        .desktop-cards-panel { display: none; }
        @media (min-width: 1280px) {
          .desktop-cards-panel { display: block !important; }
          .mobile-cards-wrap { display: none !important; }
        }
      `}</style>

      {/* ── GRID BACKGROUND ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#fff', pointerEvents: 'none' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025 }}>
          <defs>
            <pattern id="hgrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#000" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hgrid)" />
        </svg>

        {/* Decorative ring — desktop only */}
        <div className="desktop-cards-panel" style={{ position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', width: 340, height: 340 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(234,88,12,0.1)', animation: 'rotateSlow 30s linear infinite' }}>
            {[0, 90, 180, 270].map(deg => (
              <div key={deg} style={{ position: 'absolute', top: '50%', left: '50%', width: 5, height: 5, borderRadius: '50%', background: 'rgba(234,88,12,0.3)', transform: `rotate(${deg}deg) translateX(169px) translateY(-2.5px)` }} />
            ))}
          </div>
          <div style={{ position: 'absolute', inset: 36, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.05)', animation: 'rotateSlow 20s linear infinite reverse' }} />
          <div style={{ position: 'absolute', inset: 90, borderRadius: '50%', border: '1px dashed rgba(234,88,12,0.07)' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP RIGHT PANEL — project cards
          FIX: positioned relative to the section, not fixed.
          Uses absolute positioning within the section so it
          always appears alongside the content.
      ══════════════════════════════════════════════ */}
      <div
        className="desktop-cards-panel"
        style={{
          position: 'absolute',
          zIndex: 10,
          right: 0,
          top: 0,
          width: '22%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Inner wrapper centers the cards vertically */}
        <div style={{
          position: 'sticky',
          top: `${navH}px`,
          display: 'none',
          flexDirection: 'column',
          gap: 16,
          paddingTop: 40,
          paddingRight: '8%',
          alignItems: 'flex-end',
        }}>
          {desktopCards.map(card => (
            <div
              key={card.label}
              style={{
                pointerEvents: 'auto',
                animation: `fadeUp 0.5s ease ${card.delay} both`,
              }}
            >
              <div
                style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  minWidth: 210,
                  boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
                  transition: 'border-color .3s, transform .3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(234,88,12,0.25)'; e.currentTarget.style.transform = 'translateX(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';      e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 3, background: 'linear-gradient(135deg,rgba(234,88,12,.12),rgba(180,60,0,.08))', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#EA580C' }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.76rem', color: 'rgba(20,20,20,0.85)', fontWeight: 600, letterSpacing: '0.02em' }}>{card.label}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.62rem', color: 'rgba(0,0,0,0.35)', marginTop: 2, letterSpacing: '0.05em' }}>{card.sub}</div>
                </div>
                <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
          FIX: simple block layout — NO flex, NO justifyContent, NO minHeight.
          paddingTop clears the real navbar. Content flows naturally downward.
          On xl screens, right 28% is reserved for the desktop cards panel.
      ══════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          paddingTop:    `calc(${navH}px + clamp(1.5rem, 4vh, 3rem))`,
          paddingBottom: 'clamp(2rem, 5vh, 3.5rem)',
          paddingLeft:   'clamp(1.25rem, 5vw, 80px)',
          // FIX: on desktop reserve space for right panel; on mobile full width
          paddingRight:  'clamp(1.25rem, 4vw, 3rem)',
        }}
      >
        {/* Content wrapper — narrowed on xl to avoid right panel overlap */}
        <div style={{
          maxWidth: 680,
          // On screens < xl, allow full width
          width: '100%',
          marginRight: window.innerWidth >= 1280 ? '28%' : '0',
        }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            marginBottom: 20,
            animation: 'fadeUp .5s ease .05s both',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EA580C', boxShadow: '0 0 10px rgba(234,88,12,.5)', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(234,88,12,0.9)', fontWeight: 600 }}>
              Premium Shopfitting Solutions
            </span>
            <div style={{ height: 1, width: 32, background: 'rgba(234,88,12,0.4)', transformOrigin: 'left', animation: 'lineExpand .6s ease .5s both', flexShrink: 0 }} />
          </div>

          {/* Headline line 1 */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
            lineHeight: 0.92,
            fontWeight: 700,
            color: '#111',
            letterSpacing: '-0.02em',
            margin: 0,
            wordBreak: 'break-word',
            animation: 'fadeUp .6s ease .1s both',
          }}>
            We Craft Retail
          </h1>

          {/* Headline line 2 — outlined italic */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
            lineHeight: 1.05,
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.13)',
            letterSpacing: '-0.02em',
            margin: 0,
            wordBreak: 'break-word',
            animation: 'fadeUp .6s ease .2s both',
          }}>
            Environments
          </h1>

          {/* Headline line 3 — orange gradient */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
            lineHeight: 1.05,
            fontWeight: 700,
            background: 'linear-gradient(90deg,#EA580C 0%,#F97316 50%,#EA580C 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            margin: 0,
            wordBreak: 'break-word',
            animation: 'fadeUp .6s ease .3s both',
          }}>
            That Convert.
          </h1>

          {/* Sub-headline */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            marginTop: 22, marginBottom: 24,
            animation: 'fadeUp .6s ease .4s both',
          }}>
            <div style={{ width: 2, minHeight: 56, background: 'linear-gradient(180deg,#EA580C,rgba(234,88,12,0.06))', flexShrink: 0, borderRadius: 2, marginTop: 4 }} />
            <p style={{ fontFamily: "'Syne','Helvetica Neue',sans-serif", color: 'rgba(60,60,60,0.6)', fontSize: 'clamp(0.86rem,1.5vw,1rem)', lineHeight: 1.85, fontWeight: 400, margin: 0 }}>
              From concept to completion — we design and deliver premium shop
              interiors that draw customers in, elevate their experience, and
              measurably grow your revenue.
            </p>
          </div>

          {/* CTA buttons */}
<div
  className="flex flex-col md:flex-row flex-wrap gap-3 mb-6 relative z-30"
  style={{
    animation: 'fadeUp .6s ease .5s both',
  }}
>

  <a
    href="#contact"
    className="cta-primary"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '0.5rem 0.9rem',   // ✅ reduced width
      background: '#EA580C',
      color: '#fff',
      fontFamily: "'Syne',sans-serif",
      fontWeight: 700,
      fontSize: '0.78rem',
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      borderRadius: 3,
      textDecoration: 'none',
      boxShadow: '0 6px 28px rgba(234,88,12,.22)',
      alignSelf: 'flex-start',   // ✅ prevents full width
    }}
  >
    Get a Free Quote <ArrowRight size={13} />
  </a>

  <button
    className="cta-watch"
    onClick={() => setShowReel(true)}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '0.5rem 0.9rem',   // ✅ reduced width
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.12)',
      color: 'rgba(20,20,20,0.75)',
      fontFamily: "'Syne',sans-serif",
      fontWeight: 500,
      fontSize: '0.78rem',
      letterSpacing: '0.04em',
      borderRadius: 3,
      cursor: 'pointer',
      alignSelf: 'flex-start',   // ✅ prevents full width
    }}
  >
    <div style={{
      width: 26,
      height: 26,
      borderRadius: '50%',
      border: '1.5px solid rgba(234,88,12,.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Play size={8} fill="rgba(234,88,12,0.9)" color="rgba(234,88,12,0.9)" />
    </div>
    Watch Showreel
  </button>

  <a
    href="public/shopfitting_brochure(1).pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="cta-ghost"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '0.5rem 0.9rem',   // ✅ reduced width
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.12)',
      color: 'rgba(20,20,20,0.75)',
      fontFamily: "'Syne',sans-serif",
      fontWeight: 500,
      fontSize: '0.78rem',
      letterSpacing: '0.04em',
      borderRadius: 3,
      cursor: 'pointer',
      alignSelf: 'flex-start',   // ✅ prevents full width
    }}
  >
    <Download size={11} /> Brochure
  </a>

</div>

          {/* Trust badges */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '7px 14px',
            marginBottom: 32,
            position: 'relative', zIndex: 30,
          }}>
            {trustBadges.map(({ Icon, text }, i) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Syne',sans-serif", color: 'rgba(60,60,60,0.4)', fontSize: '0.68rem', letterSpacing: '0.08em', animation: `badgePop .5s ease ${0.7 + i * 0.1}s both` }}>
                <Icon size={11} style={{ color: 'rgba(234,88,12,0.6)', flexShrink: 0 }} />
                {text}
                {i < trustBadges.length - 1 && <span style={{ marginLeft: 8, color: 'rgba(0,0,0,0.1)' }}>|</span>}
              </div>
            ))}
          </div>

          {/* Mobile project cards — hidden on xl+ */}
          <div className="mobile-cards-wrap" style={{ animation: 'fadeUp .6s ease .85s both' }}>
            <div
              className="proj-scroll"
              style={{
                marginLeft:  `calc(-1 * clamp(1.25rem, 5vw, 80px))`,
                marginRight: `calc(-1 * clamp(1.25rem, 4vw, 3rem))`,
                paddingLeft: 'clamp(1.25rem, 5vw, 80px)',
                paddingRight:'clamp(1.25rem, 4vw, 3rem)',
              }}
            >
              {mobileCards.map(card => (
                <div key={card.label} className="proj-card">
                  <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 4, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, minWidth: 155, boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 3, background: 'linear-gradient(135deg,rgba(234,88,12,.12),rgba(180,60,0,.08))', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EA580C' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.72rem', color: 'rgba(20,20,20,0.85)', fontWeight: 600 }}>{card.label}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.6rem', color: 'rgba(0,0,0,0.35)', marginTop: 2 }}>{card.sub}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          STATS BAR
          FIX: CSS grid with 4 fixed columns — never wraps.
          Always sits directly below content with NO gap.
      ══════════════════════════════════════════════ */}
      <div
        ref={statsRef}
        style={{
          position: 'relative',
          zIndex: 20,
          background: '#ffffff',
          borderTop: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {/* Orange accent line */}
        <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent 0%,#EA580C 30%,rgba(234,88,12,.35) 70%,transparent 100%)' }} />

        <div style={{
          paddingLeft:   'clamp(1.25rem, 5vw, 80px)',
          paddingRight:  'clamp(1.25rem, 4vw, 3rem)',
          paddingTop:    '1.4rem',
          paddingBottom: '1.4rem',
          display:       'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',  /* 4 equal cols, never wraps */
          columnGap:     'clamp(0.5rem, 2vw, 1.5rem)',
          alignItems:    'center',
        }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 1vw, 1rem)' }}
            >
              <StatItem stat={stat} animate={statsVisible} />
              {i < stats.length - 1 && (
                <div style={{ width: 1, height: 28, background: 'rgba(0,0,0,0.08)', flexShrink: 0, marginLeft: 'auto' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── SHOWREEL MODAL ── */}
      {showReel && (
        <div
          onClick={() => setShowReel(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', animation: 'fadeSlideUp .25s ease both' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', width: '100%', maxWidth: 900, background: '#fff', border: '1px solid rgba(234,88,12,.15)', borderRadius: 6, overflow: 'visible', boxShadow: '0 40px 100px rgba(0,0,0,.25)' }}
          >
            <button
              onClick={() => setShowReel(false)}
              style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,.08)', border: '1px solid rgba(0,0,0,.1)', color: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background .2s, color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EA580C'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,.08)'; e.currentTarget.style.color = 'rgba(0,0,0,.6)'; }}
            >
              <X size={14} />
            </button>

            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/jnpuXhH9C6I"
                title="Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: 'auto', border: 'none' }}
              />
            </div>

            <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(0,0,0,.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EA580C', boxShadow: '0 0 8px rgba(234,88,12,.6)' }} />
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.7rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(0,0,0,.35)' }}>
                Shopfitting Solutions — Project Showreel 2024
              </span>
              <span
                style={{ marginLeft: 'auto', fontFamily: "'Syne',sans-serif", fontSize: '0.67rem', color: 'rgba(0,0,0,.25)', cursor: 'pointer' }}
                onClick={() => setShowReel(false)}
              >
                ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}