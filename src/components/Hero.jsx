import { ArrowRight, Download, Award, Clock, Shield, Play, X } from 'lucide-react';
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

const cards = [
  { label: 'Luxury Retail',    sub: 'Mayfair, London',  delay: '0.1s' },
  { label: 'Fashion Boutique', sub: 'Knightsbridge',    delay: '0.2s' },
  { label: 'Flagship Store',   sub: 'Manchester',       delay: '0.3s' },

  // ✅ NEW ADDED CARDS
  { label: 'Supermarket Design', sub: 'Birmingham',     delay: '0.4s' },
  { label: 'Café & Bakery',      sub: 'Soho, London',   delay: '0.5s' },
  { label: 'Electronics Store',  sub: 'Leeds',          delay: '0.6s' },
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

/* ── Single project card ── */
function ProjectCard({ label, sub, delay, isMobile }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 4,
        padding: isMobile ? '10px 14px' : '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? 10 : 12,
        minWidth: isMobile ? 170 : 'unset',
width: isMobile ? '170px' : '100%',
flexShrink: isMobile ? 0 : undefined,
scrollSnapAlign: isMobile ? 'start' : undefined,
        boxShadow: isMobile ? '0 2px 14px rgba(0,0,0,0.06)' : '0 2px 20px rgba(0,0,0,0.07)',
        transition: 'border-color .3s, transform .3s',
        cursor: 'default',
        boxSizing: 'border-box',
        flexShrink: isMobile ? 0 : undefined,
        animation: isMobile ? undefined : `fadeUp 0.5s ease ${delay} both`,
      }}
      onMouseEnter={e => {
        if (!isMobile) {
          e.currentTarget.style.borderColor = 'rgba(234,88,12,0.25)';
          e.currentTarget.style.transform = 'translateX(-3px)';
        }
      }}
      onMouseLeave={e => {
        if (!isMobile) {
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
          e.currentTarget.style.transform = 'translateX(0)';
        }
      }}
    >
      <div style={{
        width: isMobile ? 30 : 34,
        height: isMobile ? 30 : 34,
        borderRadius: 3,
        background: 'linear-gradient(135deg,rgba(234,88,12,.12),rgba(180,60,0,.08))',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ width: isMobile ? 8 : 9, height: isMobile ? 8 : 9, borderRadius: '50%', background: '#EA580C' }} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: isMobile ? '0.72rem' : '0.76rem',
          color: 'rgba(20,20,20,0.85)',
          fontWeight: 600,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: isMobile ? '0.6rem' : '0.62rem',
          color: 'rgba(0,0,0,0.35)',
          marginTop: 2,
          letterSpacing: '0.05em',
        }}>
          {sub}
        </div>
      </div>
      <div style={{
        width: 5, height: 5, borderRadius: '50%',
        background: '#22c55e',
        boxShadow: '0 0 6px #22c55e',
        flexShrink: 0,
      }} />
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

  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector('nav') || document.querySelector('header');
      if (nav) setNavH(nav.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setShowReel(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    setStatsVisible(true);

    const el = statsRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setStatsVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        background: '#ffffff',
        zIndex: 1,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        marginBottom: 0, // Remove any bottom margin
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Syne:wght@400;500;600;700;800&display=swap');

        @keyframes lineExpand  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rotateSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes badgePop    { 0%{opacity:0;transform:translateY(8px) scale(.95)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .cta-primary { transition: background .2s, transform .2s, box-shadow .2s !important; }
        .cta-primary:hover { background: #c2410c !important; transform: translateY(-2px) !important; box-shadow: 0 12px 40px rgba(234,88,12,.3) !important; }
        .cta-watch { transition: background .2s, border-color .2s, transform .2s !important; }
        .cta-watch:hover { background: rgba(0,0,0,.03) !important; border-color: rgba(0,0,0,.2) !important; transform: translateY(-2px) !important; }
        .cta-ghost { transition: color .2s, border-color .2s, transform .2s !important; }
        .cta-ghost:hover { color: rgba(0,0,0,.7) !important; border-color: rgba(234,88,12,.4) !important; transform: translateY(-2px) !important; }

        .proj-scroll {
  display: flex;
  flex-wrap: nowrap;            /* ✅ force single line */
  overflow-x: auto;
  gap: 10px;
  padding-bottom: 6px;

  scroll-snap-type: x mandatory;  /* ✅ smooth sliding */
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
}

.proj-scroll::-webkit-scrollbar {
  display: none;
}

        .hero-body {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: clamp(1.5rem, 3vw, 44px);
        }
        .hero-left {
          flex: 1 1 0;
          min-width: 0;
        }
        .hero-right {
          display: none;
          flex-direction: column;
          gap: 14px;
          flex-shrink: 0;
          width: 260px;
          padding-top: 2px;
        }
        .hero-mobile {
          display: block;
        }

        .hero-stats-desktop {
          display: none;
        }

        .hero-stats-bar {
          display: none !important;
        }

        @media (min-width: 1280px) {
          .hero-right          { display: flex !important; }
          .hero-mobile         { display: none !important; }
          .hero-stats-desktop  { display: flex !important; flex-direction: row; flex-wrap: wrap; gap: 0; margin-top: 10px; animation: fadeUp .6s ease .9s both; }
        }

        .hero-ring { display: none; }
        @media (min-width: 1280px) { .hero-ring { display: block; } }
      `}</style>

      {/* ── GRID BACKGROUND ── */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, background:'#fff', pointerEvents:'none' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.025 }}>
          <defs>
            <pattern id="hgrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#000" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hgrid)" />
        </svg>
        <div className="hero-ring" style={{ position:'absolute', right:'2%', top:'50%', transform:'translateY(-50%)', width:300, height:300, pointerEvents:'none' }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid rgba(234,88,12,0.1)', animation:'rotateSlow 30s linear infinite' }}>
            {[0,90,180,270].map(deg => (
              <div key={deg} style={{ position:'absolute', top:'50%', left:'50%', width:5, height:5, borderRadius:'50%', background:'rgba(234,88,12,0.3)', transform:`rotate(${deg}deg) translateX(149px) translateY(-2.5px)` }} />
            ))}
          </div>
          <div style={{ position:'absolute', inset:36, borderRadius:'50%', border:'1px solid rgba(0,0,0,0.05)', animation:'rotateSlow 20s linear infinite reverse' }} />
          <div style={{ position:'absolute', inset:80, borderRadius:'50%', border:'1px dashed rgba(234,88,12,0.07)' }} />
        </div>
      </div>

      {/* OUTER PADDING WRAPPER - REDUCED PADDING BOTTOM TO REMOVE GAP */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        paddingTop:    `calc(${navH}px + clamp(1.5rem, 4vh, 3rem))`,
        paddingBottom: '0', // REMOVED: was 'clamp(0.5rem, 2vh, 1rem)'
        paddingLeft:   'clamp(1.25rem, 5vw, 80px)',
        paddingRight:  'clamp(1.25rem, 4vw, 3rem)',
      }}>

        {/* ── TWO-COLUMN ROW ── */}
       <div className="hero-body" style={{ alignItems: 'flex-start' }}>

          {/* ════════════ LEFT ════════════ */}
          <div className="hero-left">

            {/* Eyebrow */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:8, animation:'fadeUp .5s ease .05s both' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#EA580C', boxShadow:'0 0 10px rgba(234,88,12,.5)', flexShrink:0 }} />
              <span style={{ fontFamily:"'Syne',sans-serif", fontSize:'0.67rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(234,88,12,0.9)', fontWeight:600 }}>
                Premium Shopfitting Solutions
              </span>
              <div style={{ height:1, width:32, background:'rgba(234,88,12,0.4)', transformOrigin:'left', animation:'lineExpand .6s ease .5s both', flexShrink:0 }} />
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(2.4rem,5.5vw,5.5rem)', lineHeight:0.92, fontWeight:700, color:'#111', letterSpacing:'-0.02em', margin:0, wordBreak:'break-word', animation:'fadeUp .6s ease .1s both' }}>
              We Craft Retail
            </h1>
            <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(2.4rem,5.5vw,5.5rem)', lineHeight:1.05, fontWeight:300, fontStyle:'italic', color:'transparent', WebkitTextStroke:'1.5px rgba(0,0,0,0.13)', letterSpacing:'-0.02em', margin:0, wordBreak:'break-word', animation:'fadeUp .6s ease .2s both' }}>
              Environments
            </h1>
            <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(2.4rem,5.5vw,5.5rem)', lineHeight:1.05, fontWeight:700, background:'linear-gradient(90deg,#EA580C 0%,#F97316 50%,#EA580C 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'-0.02em', margin:0, wordBreak:'break-word', animation:'fadeUp .6s ease .3s both' }}>
              That Convert.
            </h1>

            {/* Sub-headline */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginTop:22, marginBottom:8, animation:'fadeUp .6s ease .4s both' }}>
              <div style={{ width:2, minHeight:56, background:'linear-gradient(180deg,#EA580C,rgba(234,88,12,0.06))', flexShrink:0, borderRadius:2, marginTop:4 }} />
              <p style={{ fontFamily:"'Syne','Helvetica Neue',sans-serif", color:'rgba(60,60,60,0.6)', fontSize:'clamp(0.86rem,1.3vw,1rem)', lineHeight:1.85, fontWeight:400, margin:0 }}>
                From concept to completion — we design and deliver premium shop
                interiors that draw customers in, elevate their experience, and
                measurably grow your revenue.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem', marginBottom:'1.3rem', position:'relative', zIndex:30, animation:'fadeUp .6s ease .5s both' }}>
              <a href="#contact" className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'0.5rem 0.9rem', background:'#EA580C', color:'#fff', fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'0.78rem', letterSpacing:'0.07em', textTransform:'uppercase', borderRadius:3, textDecoration:'none', boxShadow:'0 6px 28px rgba(234,88,12,.22)' }}>
                Get a Free Quote <ArrowRight size={13} />
              </a>
              <button className="cta-watch" onClick={() => setShowReel(true)} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'0.5rem 0.9rem', background:'#fff', border:'1px solid rgba(0,0,0,0.12)', color:'rgba(20,20,20,0.75)', fontFamily:"'Syne',sans-serif", fontWeight:500, fontSize:'0.78rem', letterSpacing:'0.04em', borderRadius:3, cursor:'pointer' }}>
                <div style={{ width:26, height:26, borderRadius:'50%', border:'1.5px solid rgba(234,88,12,.5)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Play size={8} fill="rgba(234,88,12,0.9)" color="rgba(234,88,12,0.9)" />
                </div>
                Watch Showreel
              </button>
              <a
                href="Project/shopfitting_brochure (1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-ghost"
                style={{
                  display:'inline-flex',
                  alignItems:'center',
                  gap:10,
                  padding:'0.5rem 0.9rem',
                  background:'#fff',
                  border:'1px solid rgba(0,0,0,0.12)',
                  color:'rgba(20,20,20,0.75)',
                  fontFamily:"'Syne',sans-serif",
                  fontWeight:500,
                  fontSize:'0.78rem',
                  letterSpacing:'0.04em',
                  borderRadius:3,
                  cursor:'pointer',
                  textDecoration:'none'
                }}
              >
                <Download size={11} /> Brochure
              </a>
            </div>

            {/* Trust badges */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'7px 14px', marginBottom:20, position:'relative', zIndex:30 }}>
              {trustBadges.map(({ Icon, text }, i) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:5, fontFamily:"'Syne',sans-serif", color:'rgba(60,60,60,0.4)', fontSize:'0.68rem', letterSpacing:'0.08em', animation:`badgePop .5s ease ${0.7 + i * 0.1}s both` }}>
                  <Icon size={11} style={{ color:'rgba(234,88,12,0.6)', flexShrink:0 }} />
                  {text}
                  {i < trustBadges.length - 1 && <span style={{ marginLeft:8, color:'rgba(0,0,0,0.1)' }}>|</span>}
                </div>
              ))}
            </div>

            {/* DESKTOP STATS */}
            <div className="hero-stats-desktop">
              {stats.map((stat, i) => (
                <div key={stat.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.9rem, 3vw, 4rem)',
                  paddingRight: i < stats.length - 1 ? 'clamp(1rem, 2vw, 2rem)' : 0,
                  marginRight: i < stats.length - 1 ? 'clamp(1rem, 2vw, 2rem)' : 0,
                  borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}>
                  <StatItem stat={stat} animate={statsVisible} />
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="hero-mobile" style={{ animation:'fadeUp .6s ease .85s both' }}>
              <div className="proj-scroll" style={{ marginLeft:`calc(-1 * clamp(1.25rem, 5vw, 80px))`, marginRight:`calc(-1 * clamp(1.25rem, 4vw, 3rem))`, paddingLeft:'clamp(1.25rem, 5vw, 80px)', paddingRight:'clamp(1.25rem, 4vw, 3rem)' }}>
                {cards.map(card => (
                  <ProjectCard key={card.label} {...card} isMobile={true} />
                ))}
              </div>
            </div>

          </div>
          {/* END LEFT */}

          {/* ════════════ RIGHT ════════════ */}
          <div className="hero-right">
            {cards.map(card => (
              <ProjectCard key={card.label} {...card} isMobile={false} />
            ))}
          </div>

        </div>
        {/* END TWO-COLUMN ROW */}

      </div>

      {/* ── SHOWREEL MODAL ── */}
      {showReel && (
        <div onClick={() => setShowReel(false)} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem', animation:'fadeSlideUp .25s ease both' }}>
          <div onClick={e => e.stopPropagation()} style={{ position:'relative', width:'100%', maxWidth:900, background:'#fff', border:'1px solid rgba(234,88,12,.15)', borderRadius:6, overflow:'visible', boxShadow:'0 40px 100px rgba(0,0,0,.25)' }}>
            <button
              onClick={() => setShowReel(false)}
              style={{ position:'absolute', top:12, right:12, zIndex:10, width:34, height:34, borderRadius:'50%', background:'rgba(0,0,0,.08)', border:'1px solid rgba(0,0,0,.1)', color:'rgba(0,0,0,.6)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'background .2s, color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#EA580C'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(0,0,0,.08)'; e.currentTarget.style.color='rgba(0,0,0,.6)'; }}
            >
              <X size={14} />
            </button>
            <div style={{ position:'relative', paddingTop:'56.25%' }}>
              <iframe src="https://www.youtube.com/embed/jnpuXhH9C6I" title="Showreel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }} />
            </div>
            <div style={{ padding:'12px 18px', borderTop:'1px solid rgba(0,0,0,.06)', display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#EA580C', boxShadow:'0 0 8px rgba(234,88,12,.6)' }} />
              <span style={{ fontFamily:"'Syne',sans-serif", fontSize:'0.7rem', letterSpacing:'0.13em', textTransform:'uppercase', color:'rgba(0,0,0,.35)' }}>
                Shopfitting Solutions — Project Showreel 2024
              </span>
              <span style={{ marginLeft:'auto', fontFamily:"'Syne',sans-serif", fontSize:'0.67rem', color:'rgba(0,0,0,.25)', cursor:'pointer' }} onClick={() => setShowReel(false)}>
                ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}