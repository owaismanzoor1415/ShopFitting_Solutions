import { ArrowRight, Download, Award, Clock, Shield, ChevronDown, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '500+', label: 'Projects Delivered', suffix: '' },
  { value: '18', label: 'Years Experience', suffix: 'yr' },
  { value: '98%', label: 'Client Satisfaction', suffix: '' },
  { value: '£120M+', label: 'Value Fitted Out', suffix: '' },
];

const trustBadges = [
  { Icon: Award, text: 'Award Winning Design' },
  { Icon: Clock, text: 'On-Time Delivery' },
  { Icon: Shield, text: '10-Year Warranty' },
];

// Animated counter hook
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    const step = Math.ceil(num / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [start]);
  return count;
}

function StatItem({ stat, animate }) {
  const num = parseInt(stat.value.replace(/\D/g, ''), 10);
  const count = useCounter(stat.value, 1800, animate);
  const prefix = stat.value.match(/^[^\d]*/)?.[0] ?? '';
  const suffix = stat.value.match(/[^\d]*$/)?.[0] ?? '';
  const display = num ? `${prefix}${count}${suffix}` : stat.value;

  return (
    <div className="flex flex-col gap-1">
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
        fontWeight: 700,
        color: '#F97316',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {display}
      </span>
      <span style={{
        fontFamily: "'Syne', 'Helvetica Neue', sans-serif",
        fontSize: '0.68rem',
        color: 'rgba(200,200,200,0.4)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        {stat.label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [phase, setPhase] = useState(0); // 0=hidden, 1=loaded
  const [statsVisible, setStatsVisible] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setShowReel(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const ready = phase >= 1;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Syne:wght@400;500;600;700;800&display=swap');

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          30% { transform: translate(2%, 2%); }
          50% { transform: translate(-1%, 3%); }
          70% { transform: translate(3%, -1%); }
          90% { transform: translate(-2%, 1%); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseOrb {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes counterBar {
          from { width: 0; }
          to   { width: 100%; }
        }

        .cta-primary:hover { background: #c2410c !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(249,115,22,0.4) !important; }
        .cta-secondary:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.3) !important; transform: translateY(-2px); }
        .cta-ghost:hover { color: rgba(255,255,255,0.8) !important; border-color: rgba(249,115,22,0.5) !important; }
        .stat-card:hover .stat-bar { animation: counterBar 0.6s ease forwards; }
        .play-btn:hover { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(249,115,22,0.15); }

        * { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      `}</style>

      {/* ── BACKGROUND SYSTEM ── */}
      <div className="absolute inset-0 z-0">

        {/* Deep charcoal base */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, #0d0d0d 0%, #141414 35%, #111008 65%, #1c1008 100%)',
        }} />

        {/* Architectural grid lines — very subtle */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Diagonal sweep — signature element */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(112deg, transparent 54%, rgba(249,115,22,0.07) 54%, rgba(249,115,22,0.13) 72%, rgba(180,60,0,0.1) 100%)',
        }} />

        {/* Film grain */}
        <div className="absolute inset-0" style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
          animation: 'grain 8s steps(10) infinite',
        }} />

        {/* Orange glow — top right */}
        <div className="absolute" style={{
          right: '-10%',
          top: '-5%',
          width: '60vw',
          height: '70vh',
          background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, rgba(234,88,12,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulseOrb 6s ease-in-out infinite',
        }} />

        {/* Cool grey glow — bottom left */}
        <div className="absolute" style={{
          left: '-5%',
          bottom: '10%',
          width: '40vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at center, rgba(160,160,160,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />

        {/* Horizontal etched rules */}
        {[18, 42, 68, 88].map(pct => (
          <div key={pct} className="absolute w-full" style={{
            top: `${pct}%`,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.035) 20%, rgba(255,255,255,0.035) 80%, transparent 100%)',
          }} />
        ))}

        {/* Rotating ring decoration — far right */}
        <div className="absolute hidden xl:block" style={{
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 420,
          height: 420,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(249,115,22,0.08)',
            animation: 'rotateSlow 30s linear infinite',
          }}>
            {[0, 90, 180, 270].map(deg => (
              <div key={deg} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'rgba(249,115,22,0.3)',
                transform: `rotate(${deg}deg) translateX(209px) translateY(-3px)`,
              }} />
            ))}
          </div>
          <div style={{
            position: 'absolute',
            inset: 40,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.04)',
            animation: 'rotateSlow 20s linear infinite reverse',
          }} />
          <div style={{
            position: 'absolute',
            inset: 100,
            borderRadius: '50%',
            border: '1px dashed rgba(249,115,22,0.06)',
          }} />
        </div>
      </div>

      {/* ── LEFT VERTICAL RULE ── */}
      <div className="absolute z-10 hidden lg:flex flex-col items-center" style={{
        left: '6%',
        top: 0,
        bottom: 0,
        gap: 0,
      }}>
        <div style={{
          width: 1,
          flex: 1,
          background: 'linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.35) 20%, rgba(249,115,22,0.35) 80%, transparent 100%)',
        }} />
        {/* Vertical label */}
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(249,115,22,0.35)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          padding: '12px 0',
        }}>
          Est. 2006
        </span>
        <div style={{
          width: 1,
          height: 80,
          background: 'linear-gradient(180deg, rgba(249,115,22,0.35) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── RIGHT SIDE PANEL — image/project showcase ── */}
      <div className="absolute z-10 hidden xl:block" style={{
        right: 0,
        top: 0,
        bottom: 0,
        width: '38%',
      }}>
        {/* Stacked project cards */}
        {[
          { label: 'Luxury Retail', sub: 'Mayfair, London', top: '18%', opacity: ready ? 1 : 0, delay: '0.9s' },
          { label: 'Fashion Boutique', sub: 'Knightsbridge', top: '42%', opacity: ready ? 1 : 0, delay: '1.1s' },
          { label: 'Flagship Store', sub: 'Manchester', top: '64%', opacity: ready ? 1 : 0, delay: '1.3s' },
        ].map((card) => (
          <div key={card.label} style={{
            position: 'absolute',
            right: '8%',
            top: card.top,
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateX(0)' : 'translateX(30px)',
            transition: `opacity 0.6s ease ${card.delay}, transform 0.6s ease ${card.delay}`,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              borderRadius: 4,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              minWidth: 220,
              cursor: 'default',
              transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(249,115,22,0.06)';
              e.currentTarget.style.borderColor = 'rgba(249,115,22,0.25)';
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(180,60,0,0.2))',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F97316' }} />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}>{card.label}</div>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: 2,
                  letterSpacing: '0.06em',
                }}>{card.sub}</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 6px #4ade80',
                flexShrink: 0,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-20 flex-1 flex items-center" style={{ paddingTop: '80px' }}>
        <div className="w-full px-6 lg:px-0" style={{ paddingLeft: 'max(3rem, min(10%, 140px))' }}>
          <div style={{ maxWidth: 680 }}>

            {/* Eyebrow tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 36,
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#F97316',
                boxShadow: '0 0 10px rgba(249,115,22,0.8)',
              }} />
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(249,115,22,0.85)',
                fontWeight: 600,
              }}>
                Premium Shopfitting Solutions
              </span>
              <div style={{
                height: 1,
                width: 40,
                background: 'rgba(249,115,22,0.4)',
                transformOrigin: 'left',
                animation: ready ? 'lineExpand 0.6s ease 0.4s both' : 'none',
              }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.2rem, 6.5vw, 6rem)',
              lineHeight: 1.0,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
              marginBottom: 0,
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.65s ease 0.2s, transform 0.65s ease 0.2s',
            }}>
              We Craft Retail
            </h1>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.2rem, 6.5vw, 6rem)',
              lineHeight: 1.0,
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(200,200,200,0.18)',
              letterSpacing: '-0.02em',
              marginBottom: 0,
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.65s ease 0.3s, transform 0.65s ease 0.3s',
            }}>
              Environments
            </h1>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.2rem, 6.5vw, 6rem)',
              lineHeight: 1.0,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #F97316 0%, #FDBA74 45%, #F97316 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              animation: ready ? 'shimmer 4s linear 1s infinite' : 'none',
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.65s ease 0.4s, transform 0.65s ease 0.4s',
            }}>
              That Convert.
            </h1>

            {/* Sub-headline rule */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 20,
              marginTop: 36,
              marginBottom: 40,
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
            }}>
              <div style={{
                width: 2,
                height: 80,
                background: 'linear-gradient(180deg, #F97316 0%, rgba(249,115,22,0.1) 100%)',
                flexShrink: 0,
                borderRadius: 2,
                marginTop: 4,
              }} />
              <p style={{
                fontFamily: "'Syne', 'Helvetica Neue', sans-serif",
                color: 'rgba(210,210,210,0.55)',
                fontSize: '1rem',
                lineHeight: 1.85,
                fontWeight: 400,
                maxWidth: 420,
                margin: 0,
              }}>
                From concept to completion — we design and deliver premium shop
                interiors that draw customers in, elevate their experience, and
                measurably grow your revenue.
              </p>
            </div>

            {/* CTA row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 48,
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s',
            }}>
              {/* Primary CTA */}
              <a
                href="#contact"
                className="cta-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '1rem 2.2rem',
                  background: '#F97316',
                  color: '#fff',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 6px 30px rgba(249,115,22,0.25)',
                }}
              >
                Get a Free Quote
                <ArrowRight size={14} />
              </a>

              {/* Showreel CTA */}
              <button
                className="play-btn"
                onClick={() => setShowReel(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '1rem 1.8rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.3s',
                }}
              >
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(249,115,22,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Play size={10} fill="rgba(249,115,22,0.9)" color="rgba(249,115,22,0.9)" />
                </div>
                Watch Showreel
              </button>

              {/* Ghost CTA — Brochure */}
              <a
                href="public/shopfitting_brochure (1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-ghost"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '1rem 1.5rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                <Download size={12} />
                Brochure
              </a>
            </div>

            {/* Trust badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              opacity: ready ? 1 : 0,
              transition: 'opacity 0.6s ease 0.75s',
            }}>
              {trustBadges.map(({ Icon, text }, i) => (
                <div
                  key={text}
                  className="trust-badge"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    fontFamily: "'Syne', sans-serif",
                    color: 'rgba(180,180,180,0.35)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    opacity: ready ? 1 : 0,
                    animation: ready ? `badgePop 0.5s ease ${0.8 + i * 0.1}s both` : 'none',
                  }}
                >
                  <Icon size={12} style={{ color: 'rgba(249,115,22,0.55)', flexShrink: 0 }} />
                  {text}
                  {i < trustBadges.length - 1 && (
                    <span style={{ marginLeft: 12, color: 'rgba(255,255,255,0.1)' }}>|</span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div
        ref={statsRef}
        className="relative z-20"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.055)',
          background: 'rgba(5,5,5,0.6)',
          backdropFilter: 'blur(20px)',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease 0.85s',
        }}
      >
        {/* Orange accent top-border */}
        <div style={{
          position: 'absolute',
          top: -1,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #F97316 30%, rgba(249,115,22,0.4) 70%, transparent 100%)',
        }} />

        <div
          className="mx-auto"
          style={{
            maxWidth: 1400,
            paddingLeft: 'max(3rem, min(10%, 140px))',
            paddingRight: '3rem',
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="stat-card" style={{ position: 'relative' }}>
                <StatItem stat={stat} animate={statsVisible} />
                {/* Hover underline bar */}
                <div className="stat-bar" style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  height: 1,
                  width: 0,
                  background: '#F97316',
                  transition: 'width 0.4s ease',
                }} />
              </div>
              {i < stats.length - 1 && (
                <div style={{
                  width: 1,
                  height: 36,
                  background: 'rgba(255,255,255,0.07)',
                  flexShrink: 0,
                }} />
              )}
            </div>
          ))}

          {/* Scroll indicator — far right */}
          <div
            className="ml-auto hidden lg:flex items-center gap-3"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}>
              <div style={{
                width: 1,
                height: 20,
                background: 'linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.5) 100%)',
              }} />
              <ChevronDown size={12} style={{ color: 'rgba(249,115,22,0.4)' }} />
            </div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* ── SHOWREEL MODAL ── */}
      {showReel && (
        <div
          onClick={() => setShowReel(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeSlideUp 0.25s ease both',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 900,
              background: '#0d0d0d',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(249,115,22,0.1)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowReel(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F97316'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              <X size={15} />
            </button>

            {/* 16:9 video wrapper */}
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/jnpuXhH9C6I"
                title="Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>

            {/* Caption bar */}
            <div style={{
              padding: '14px 20px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#F97316',
                boxShadow: '0 0 8px rgba(249,115,22,0.8)',
              }} />
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>
                Shopfitting Solutions — Project Showreel 2024
              </span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.18)',
                cursor: 'pointer',
              }} onClick={() => setShowReel(false)}>
                ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
