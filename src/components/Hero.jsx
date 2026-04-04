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
        color: '#EA580C',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {display}
      </span>
      <span style={{
        fontFamily: "'Syne', 'Helvetica Neue', sans-serif",
        fontSize: '0.68rem',
        color: 'rgba(80,80,80,0.6)',
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
  const [phase, setPhase] = useState(0);
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
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.08); opacity: 0.8; }
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

        .cta-primary:hover { background: #c2410c !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(234,88,12,0.3) !important; }
        .cta-secondary:hover { background: rgba(0,0,0,0.04) !important; border-color: rgba(0,0,0,0.2) !important; transform: translateY(-2px); }
        .cta-ghost:hover { color: rgba(0,0,0,0.7) !important; border-color: rgba(234,88,12,0.4) !important; }
        .stat-card:hover .stat-bar { animation: counterBar 0.6s ease forwards; }
        .play-btn:hover { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(234,88,12,0.1); }

        * { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      `}</style>

      {/* ── BACKGROUND SYSTEM ── */}
      <div className="absolute inset-0 z-0">

        {/* Clean white base */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(160deg, #ffffff 0%, #fafafa 40%, #f8f5f2 70%, #f5f0ea 100%)',
        }} />

        {/* Architectural grid lines — very subtle */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#555" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Diagonal sweep — signature element */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(112deg, transparent 54%, rgba(234,88,12,0.04) 54%, rgba(234,88,12,0.07) 72%, rgba(180,60,0,0.05) 100%)',
        }} />

        {/* Orange glow — top right */}
        <div className="absolute" style={{
          right: '-10%',
          top: '-5%',
          width: '60vw',
          height: '70vh',
          background: 'radial-gradient(ellipse at center, rgba(234,88,12,0.07) 0%, rgba(234,88,12,0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulseOrb 6s ease-in-out infinite',
        }} />

        {/* Warm tint glow — bottom left */}
        <div className="absolute" style={{
          left: '-5%',
          bottom: '10%',
          width: '40vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at center, rgba(234,88,12,0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />

        {/* Horizontal etched rules */}
        {[18, 42, 68, 88].map(pct => (
          <div key={pct} className="absolute w-full" style={{
            top: `${pct}%`,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.05) 80%, transparent 100%)',
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
            border: '1px solid rgba(234,88,12,0.1)',
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
                background: 'rgba(234,88,12,0.3)',
                transform: `rotate(${deg}deg) translateX(209px) translateY(-3px)`,
              }} />
            ))}
          </div>
          <div style={{
            position: 'absolute',
            inset: 40,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.05)',
            animation: 'rotateSlow 20s linear infinite reverse',
          }} />
          <div style={{
            position: 'absolute',
            inset: 100,
            borderRadius: '50%',
            border: '1px dashed rgba(234,88,12,0.08)',
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(234,88,12,0.3) 20%, rgba(234,88,12,0.3) 80%, transparent 100%)',
        }} />
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(234,88,12,0.45)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          padding: '12px 0',
        }}>
          Est. 2006
        </span>
        <div style={{
          width: 1,
          height: 80,
          background: 'linear-gradient(180deg, rgba(234,88,12,0.3) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── RIGHT SIDE PANEL — project showcase ── */}
      <div className="absolute z-10 hidden xl:block" style={{
        right: 0,
        top: 0,
        bottom: 0,
        width: '38%',
      }}>
        {[
          { label: 'Luxury Retail', sub: 'Mayfair, London', top: '18%', delay: '0.9s' },
          { label: 'Fashion Boutique', sub: 'Knightsbridge', top: '42%', delay: '1.1s' },
          { label: 'Flagship Store', sub: 'Manchester', top: '64%', delay: '1.3s' },
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
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(0,0,0,0.07)',
              backdropFilter: 'blur(12px)',
              borderRadius: 4,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              minWidth: 220,
              cursor: 'default',
              transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.98)';
              e.currentTarget.style.borderColor = 'rgba(234,88,12,0.2)';
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.8)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(234,88,12,0.15), rgba(180,60,0,0.1))',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EA580C' }} />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.78rem',
                  color: 'rgba(20,20,20,0.85)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}>{card.label}</div>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.65rem',
                  color: 'rgba(0,0,0,0.35)',
                  marginTop: 2,
                  letterSpacing: '0.06em',
                }}>{card.sub}</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
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
                background: '#EA580C',
                boxShadow: '0 0 10px rgba(234,88,12,0.6)',
              }} />
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(234,88,12,0.9)',
                fontWeight: 600,
              }}>
                Premium Shopfitting Solutions
              </span>
              <div style={{
                height: 1,
                width: 40,
                background: 'rgba(234,88,12,0.4)',
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
              color: '#111',
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
              WebkitTextStroke: '1.5px rgba(0,0,0,0.12)',
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
              background: 'linear-gradient(90deg, #EA580C 0%, #F97316 45%, #EA580C 100%)',
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

            {/* Sub-headline */}
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
                background: 'linear-gradient(180deg, #EA580C 0%, rgba(234,88,12,0.1) 100%)',
                flexShrink: 0,
                borderRadius: 2,
                marginTop: 4,
              }} />
              <p style={{
                fontFamily: "'Syne', 'Helvetica Neue', sans-serif",
                color: 'rgba(60,60,60,0.6)',
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
                  background: '#EA580C',
                  color: '#fff',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 6px 30px rgba(234,88,12,0.2)',
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
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: 'rgba(20,20,20,0.75)',
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
                  border: '1.5px solid rgba(234,88,12,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Play size={10} fill="rgba(234,88,12,0.9)" color="rgba(234,88,12,0.9)" />
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
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: 'rgba(0,0,0,0.4)',
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    fontFamily: "'Syne', sans-serif",
                    color: 'rgba(60,60,60,0.45)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    opacity: ready ? 1 : 0,
                    animation: ready ? `badgePop 0.5s ease ${0.8 + i * 0.1}s both` : 'none',
                  }}
                >
                  <Icon size={12} style={{ color: 'rgba(234,88,12,0.6)', flexShrink: 0 }} />
                  {text}
                  {i < trustBadges.length - 1 && (
                    <span style={{ marginLeft: 12, color: 'rgba(0,0,0,0.12)' }}>|</span>
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
          borderTop: '1px solid rgba(0,0,0,0.07)',
          background: 'rgba(255,255,255,0.8)',
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
          background: 'linear-gradient(90deg, transparent 0%, #EA580C 30%, rgba(234,88,12,0.4) 70%, transparent 100%)',
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
                <div className="stat-bar" style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  height: 1,
                  width: 0,
                  background: '#EA580C',
                  transition: 'width 0.4s ease',
                }} />
              </div>
              {i < stats.length - 1 && (
                <div style={{
                  width: 1,
                  height: 36,
                  background: 'rgba(0,0,0,0.08)',
                  flexShrink: 0,
                }} />
              )}
            </div>
          ))}

          {/* Scroll indicator */}
          <div
            className="ml-auto hidden lg:flex items-center gap-3"
            style={{ color: 'rgba(0,0,0,0.25)' }}
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
                background: 'linear-gradient(180deg, transparent 0%, rgba(234,88,12,0.5) 100%)',
              }} />
              <ChevronDown size={12} style={{ color: 'rgba(234,88,12,0.5)' }} />
            </div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.25)',
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
            background: 'rgba(0,0,0,0.6)',
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
              background: '#fff',
              border: '1px solid rgba(234,88,12,0.15)',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(234,88,12,0.08)',
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
                background: 'rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.1)',
                color: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EA580C'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = 'rgba(0,0,0,0.6)'; }}
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
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#EA580C',
                boxShadow: '0 0 8px rgba(234,88,12,0.6)',
              }} />
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.35)',
              }}>
                Shopfitting Solutions — Project Showreel 2024
              </span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.68rem',
                color: 'rgba(0,0,0,0.25)',
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