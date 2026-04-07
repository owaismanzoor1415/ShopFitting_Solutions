import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesDetail } from '../data/servicesDetail';

export default function ServicePage() {
  const { slug } = useParams();
  const service = servicesDetail.find(s => s.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [faqOpen, setFaqOpen] = useState(null);
  const [popupImg, setPopupImg] = useState(null);
  const beforeAfterRef = useRef(null);
  const [sliderX, setSliderX] = useState(50);
  const dragging = useRef(false);

  /* ── Quote form state ── */
  const [formStep, setFormStep] = useState('idle'); // idle | loading | success
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* ── Auto-slide hero every 3.5s ── */
  useEffect(() => {
    if (!service) return;
    const total = Math.min(service.images.length, 4);
    if (total <= 1) return;
    const timer = setInterval(() => setActiveImg(prev => (prev + 1) % total), 3500);
    return () => clearInterval(timer);
  }, [service]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [slug]);

  const onMouseMove = (e) => {
    if (!dragging.current || !beforeAfterRef.current) return;
    const rect = beforeAfterRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.min(95, Math.max(5, x)));
  };

  if (!service) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito Sans, sans-serif' }}>
      <p>Service not found. <Link to="/" style={{ color: '#E87722' }}>Go Home</Link></p>
    </div>
  );

  const otherServices = [
    { label: 'Retail Design and Space Planning', href: '/services/design-planning' },
    { label: 'Interior Fit-Out Solutions', href: '/services/interior-fit-out' },
    { label: 'Custom Joinery and Fixtures', href: '/services/custom-joinery' },
    { label: 'Lighting and Ambience Solutions', href: '/services/lighting-solutions' },
    { label: 'Project Management and Execution', href: '/services/project-management' },
    { label: 'Maintenance and Aftercare Support', href: '/services/maintenance-support' },
  ].filter(s => !s.href.includes(slug));

  const faqs = [
    { q: 'I already have a store running, can you still do something with it?', a: 'Absolutely. We can retain what works, fix what does not, and make the whole space flow better — without a full shutdown.' },
    { q: "I'm not a big brand, just one local shop. Is that okay?", a: "Perfectly fine. We've worked with large national chains and single-counter stores alike. If you've got a space, we're in." },
    { q: 'Will I need to coordinate multiple vendors to get everything done?', a: 'Not at all. We design, build, and install — and if something needs attention later, we are still around.' },
    { q: 'Can the fittings actually match how my brand looks and feels?', a: 'Definitely. From colours to counters, we make sure every fixture reflects your brand identity, not ours.' },
  ];

  const processSteps = [
    { num: '01', title: 'Consultation', desc: 'We listen to your goals, audit your space, and understand your customer journey before anything is drawn.' },
    { num: '02', title: 'Design', desc: 'Our experts create custom concepts using CAD drawings and 3D renders, refined with your feedback.' },
    { num: '03', title: 'Planning', desc: 'Detailed drawings, budgeting, and approvals to ensure clarity before execution.' },
    { num: '03', title: 'Manufacturing', desc: 'Fixtures produced in-house at our facilities — consistent quality, controlled cost.' },
    { num: '04', title: 'Installation', desc: 'Our skilled crew installs everything precisely and on schedule, zero disruption to your trading hours.' },
    { num: '05', title: 'Post-Launch Support', desc: 'We stay connected after handover to keep your retail space fresh, functional, and brand-ready.' },
  ];

  const whyUs = [
    { icon: '📍', title: '200+ Locations', desc: 'From bustling metros to fast-growing towns, we have completed projects across the country.' },
    { icon: '🏭', title: 'In-House Manufacturing', desc: 'Our own facilities ensure consistent quality and controlled costs from start to finish.' },
    { icon: '📱', title: 'Real-Time Tracking', desc: 'Our proprietary APMS lets clients track project progress in real time — no chasing, no guesswork.' },
    { icon: '🔧', title: 'End-to-End Ownership', desc: 'From the first sketch to the final screw, one team handles everything with precision and care.' },
  ];

  /* ── Palette ── */
  const ORANGE   = '#E87722';
  const DARK     = '#2B2B2B';
  const GREY_MID = '#5A5A5A';
  const GREY_BG  = '#F5F4F2';
  const TEXT     = '#3D3D3D';
  const MUTED    = '#888';
  const BORDER   = '#E2E0DC';

  /* ── Form validation ── */
  const validators = {
    name:    v => v.trim().length < 2 ? 'Please enter your full name' : '',
    email:   v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address' : '',
    phone:   v => !/^[0-9+\s\-]{8,15}$/.test(v.trim()) ? 'Enter a valid phone number' : '',
    city:    v => v.trim().length < 2 ? 'Enter your city or location' : '',
    message: v => v.trim().length < 10 ? 'Tell us a bit more (at least 10 characters)' : '',
  };

  const validate = (data) => {
    const errs = {};
    Object.keys(validators).forEach(k => {
      const msg = validators[k](data[k] || '');
      if (msg) errs[k] = msg;
    });
    return errs;
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const errs = validate(updated);
      setFormErrors(prev => ({ ...prev, [field]: errs[field] || '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate(formData);
    setFormErrors(prev => ({ ...prev, [field]: errs[field] || '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, city: true, message: true });
    const errs = validate(formData);
    setFormErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setFormStep('loading');
    setTimeout(() => setFormStep('success'), 1800);
  };

  const handleReset = () => {
    setFormStep('idle');
    setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    setFormErrors({});
    setTouched({});
  };

  const inputStyle = (field) => ({
    padding: '10px 13px',
    background: 'rgba(255,255,255,0.08)',
    border: `1px solid ${
      touched[field] && formErrors[field]
        ? '#f87171'
        : touched[field] && !formErrors[field] && formData[field]
        ? '#4ade80'
        : 'rgba(255,255,255,0.15)'
    }`,
    borderRadius: '4px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    fontFamily: "'Nunito Sans', sans-serif",
    width: '100%',
    transition: 'border-color 0.2s',
  });

  const fieldBlock = (field, placeholder, type = 'input') => (
    <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {type === 'input' ? (
        <input
          placeholder={placeholder}
          value={formData[field]}
          onChange={e => handleChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          style={inputStyle(field)}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          rows={3}
          value={formData[field]}
          onChange={e => handleChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          style={{ ...inputStyle(field), resize: 'vertical' }}
        />
      )}
      {touched[field] && formErrors[field] && (
        <span style={{ fontSize: '11px', color: '#f87171', paddingLeft: '2px' }}>⚠ {formErrors[field]}</span>
      )}
      {touched[field] && !formErrors[field] && formData[field] && (
        <span style={{ fontSize: '11px', color: '#4ade80', paddingLeft: '2px' }}>✓ Looks good</span>
      )}
    </div>
  );

  /* ── Reusable Quote Form JSX (used in both mobile inline + desktop sidebar) ── */
  const QuoteForm = () => (
    <div id="quote-form" style={{ background: DARK, borderRadius: '8px', padding: '26px 22px', color: '#fff' }}>
      <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '17px', fontWeight: 800, marginBottom: '4px' }}>Get A Free Quote</h3>
      <div style={{ width: '30px', height: '3px', background: ORANGE, marginBottom: '18px', borderRadius: '2px' }} />

      {(formStep === 'idle' || formStep === 'loading') && (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {fieldBlock('name', 'Your Full Name *')}
            {fieldBlock('email', 'Email Address *')}
            {fieldBlock('phone', 'Phone Number *')}
            {fieldBlock('city', 'City / Location *')}
            {fieldBlock('message', 'Tell us about your project... *', 'textarea')}

            {formStep === 'loading' && (
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: ORANGE, borderRadius: '2px', animation: 'progressBar 1.8s ease-in-out forwards' }} />
              </div>
            )}

            <button
              type="submit"
              disabled={formStep === 'loading'}
              style={{
                padding: '13px',
                background: formStep === 'loading' ? 'rgba(232,119,34,0.55)' : ORANGE,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 800,
                fontSize: '13px',
                cursor: formStep === 'loading' ? 'not-allowed' : 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.2s',
                marginTop: '4px',
              }}
            >
              {formStep === 'loading' ? (
                <>
                  <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Sending your request...
                </>
              ) : 'Make Request →'}
            </button>

            <a href="tel:+919999999999" style={{ display: 'block', textAlign: 'center', padding: '11px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '4px', color: 'rgba(255,255,255,0.6)', fontSize: '12px', textDecoration: 'none' }}>
              📞 Request a Call Back
            </a>
          </div>
        </form>
      )}

      {formStep === 'success' && (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '2px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6.5 6.5L23 8" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Request Submitted!</p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '6px' }}>
            Thank you, <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{formData.name.split(' ')[0]}</strong>. We've received your enquiry and will respond within <strong style={{ color: ORANGE }}>24 hours</strong>.
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Confirmation sent to {formData.email}</p>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '14px', textAlign: 'left', marginBottom: '18px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: ORANGE, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>What happens next</p>
            {[
              { icon: '✉', text: 'Confirmation email sent to you' },
              { icon: '📞', text: 'Our team calls within 24 hrs' },
              { icon: '📐', text: 'Free site survey scheduled' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: i < 2 ? '8px' : 0 }}>
                <span style={{ fontSize: '13px', marginTop: '1px' }}>{item.icon}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            style={{ width: '100%', padding: '11px', background: 'transparent', border: `1px solid ${ORANGE}`, borderRadius: '4px', color: ORANGE, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}
          >
            Submit Another Request
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif", background: '#fff', color: TEXT, lineHeight: 1.7 }}>

      {/* HERO — auto-slide with crossfade */}
      <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? '320px' : '520px', background: DARK }}>
        {service.images.slice(0, 4).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={service.title}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              filter: 'brightness(0.42)',
              opacity: i === activeImg ? 1 : 0,
              transition: 'opacity 0.9s ease-in-out',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Orange diagonal accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '0px', height: '100%', background: ORANGE, clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.92, zIndex: 1 }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '0 24px' : '0 80px', zIndex: 2 }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>Our Services</p>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '30px' : 'clamp(38px, 5vw, 60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            {service.title}
          </h1>
          <div style={{ width: '52px', height: '4px', background: ORANGE, marginTop: '16px', borderRadius: '2px' }} />
        </div>

        {/* Thumbnail strip */}
        <div style={{ position: 'absolute', bottom: '16px', right: isMobile ? '12px' : '220px', display: 'flex', gap: '8px', zIndex: 3 }}>
          {service.images.slice(0, 4).map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} style={{
              width: isMobile ? '44px' : '64px', height: isMobile ? '32px' : '46px',
              padding: 0, border: `2px solid ${i === activeImg ? ORANGE : 'rgba(255,255,255,0.3)'}`,
              borderRadius: '3px', overflow: 'hidden', cursor: 'pointer',
              opacity: i === activeImg ? 1 : 0.5, transition: 'all 0.2s', background: 'none'
            }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT + SIDEBAR */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
        gap: isMobile ? '0' : '40px', padding: isMobile ? '0' : '10px 10px', alignItems: 'start'
      }}>

        {/* LEFT */}
        <div>

          <div style={{ padding: isMobile ? '32px 20px 0' : '0', marginBottom: '44px' }}>
            <img src={service.images[0]} alt={service.title}
              style={{ width: '100%', height: isMobile ? '220px' : '420px', objectFit: 'cover', borderRadius: '6px', marginBottom: '32px', display: 'block' }} />
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '26px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>
              ShopFitting Solutions — Among the Top {service.title} Companies in Australia
            </h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '18px', borderRadius: '2px' }} />
            <p style={{ fontSize: '15px', color: TEXT, marginBottom: '14px' }}>
              At ShopFitting Solutions, we redefine retail spaces with innovative <strong>{service.title.toLowerCase()} solutions</strong>. As one of the top companies in this field, we design, manufacture, and install retail fixtures that bring function and form together. Whether you are launching a new outlet or upgrading an existing space, our services help your brand make a lasting impression.
            </p>
            <p style={{ fontSize: '15px', color: DARK, fontWeight: 700, fontStyle: 'italic' }}>
              We do not just build fixtures — we build shopping experiences.
            </p>
          </div>

          <div style={{ padding: isMobile ? '0 20px' : '0', marginBottom: '44px' }}>
            <img src={service.images[1] || service.images[0]} alt={`${service.title} installation`}
              style={{ width: '100%', height: isMobile ? '200px' : '360px', objectFit: 'cover', borderRadius: '6px', marginBottom: '28px', display: 'block' }} />
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>
              Leading {service.title} Manufacturers for Bespoke Retail Fixtures
            </h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '18px', borderRadius: '2px' }} />
            <p style={{ fontSize: '15px', color: TEXT, marginBottom: '14px' }}>
              We offer end-to-end {service.title.toLowerCase()}, from concept design to in-store installation. For over two decades, we have partnered with large retail brands, local businesses, and franchise owners to deliver reliable, space-saving, and visually cohesive systems.
            </p>
            <p style={{ fontSize: '15px', color: TEXT, marginBottom: '20px' }}>
              Our custom wall units, gondolas, modular shelving, and product display stands are tailored to maximise impact without overwhelming the space.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 800, color: DARK, marginBottom: '12px', fontFamily: "'Montserrat', sans-serif" }}>We also support clients with additional services like:</p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Retail Shop Interior Design', 'Front Counter Design for Shop', 'Eyewear Fixtures & Sunglasses Display Racks', 'Custom Modular Shelving Systems'].map(item => (
                <li key={item} style={{ fontSize: '14px', color: TEXT }}><strong style={{ color: DARK }}>{item}</strong></li>
              ))}
            </ul>
          </div>

          <div style={{ padding: isMobile ? '0 20px' : '0', marginBottom: '44px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>
              Full-Service {service.title} Solutions Across Australia
            </h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '18px', borderRadius: '2px' }} />
            <p style={{ fontSize: '15px', color: TEXT, marginBottom: '14px' }}>
              Our approach combines creativity, craftsmanship, and commercial strategy. Our team handles everything from initial 3D concepts to on-site installation. Each design is developed to improve:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {['Product flow and visibility', 'Customer navigation and dwell time', 'In-store brand engagement'].map(item => (
                <li key={item} style={{ fontSize: '14px', color: TEXT }}><strong>{item}</strong></li>
              ))}
            </ul>
            <p style={{ fontSize: '15px', color: TEXT }}>
              We align every fixture with your brand tone and layout needs to create truly immersive retail environments — from flagship stores to large-scale franchise rollouts.
            </p>
          </div>

          <div style={{ padding: isMobile ? '0 20px' : '0', marginBottom: '44px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>
              {service.title} Services by One of the Top Retail Fixture Manufacturers
            </h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '28px', borderRadius: '2px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
              {service.features.map((f, i) => (
                <div key={i}
                  style={{ border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden', height: '190px' }}>
                    <img src={f.image} alt={f.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: ORANGE, color: '#fff', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '3px', letterSpacing: '0.5px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: DARK, marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>{f.label}</h3>
                    <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.65 }}>
                      {f.desc || 'Tailored to your brand identity, crafted for durability, and installed with precision.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ margin: isMobile ? '0 20px 44px' : '0 0 44px', background: GREY_BG, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${ORANGE}`, borderRadius: '6px', padding: '22px 26px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: '15px', color: DARK, fontFamily: "'Montserrat', sans-serif", marginBottom: '4px' }}>Need More Information?</p>
              <p style={{ fontSize: '13px', color: MUTED }}>Our team is here to help you. Get in touch with us today.</p>
            </div>
            <a href="/#contact"
   style={{ padding: '11px 26px', background: ORANGE, color: '#fff', borderRadius: '4px', fontWeight: 800, fontSize: '13px', textDecoration: 'none', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}
>
  Contact Us
</a>
          </div>

          <div style={{ padding: isMobile ? '0 20px' : '0', marginBottom: '44px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>
              Why Leading Retailers Trust ShopFitting Solutions Among {service.title} Companies
            </h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '24px', borderRadius: '2px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
              {whyUs.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', padding: '18px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff' }}>
                  <div style={{ fontSize: '26px', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '14px', color: DARK, marginBottom: '5px', fontFamily: "'Montserrat', sans-serif" }}>{item.title}</p>
                    <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: isMobile ? '0 20px' : '0', marginBottom: '44px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>
              Our Proven {service.title} Process
            </h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '24px', borderRadius: '2px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {processSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', paddingBottom: '26px', position: 'relative' }}>
                  {i < processSteps.length - 1 && (
                    <div style={{ position: 'absolute', left: '21px', top: '44px', bottom: 0, width: '2px', background: '#e8e5e0', zIndex: 0 }} />
                  )}
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: ORANGE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0, zIndex: 1, fontFamily: "'Montserrat', sans-serif" }}>
                    {step.num}
                  </div>
                  <div style={{ paddingTop: '7px' }}>
                    <p style={{ fontWeight: 800, fontSize: '15px', color: DARK, marginBottom: '5px', fontFamily: "'Montserrat', sans-serif" }}>{step.title}</p>
                    <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {service.images.length >= 2 && (
            <div style={{ padding: isMobile ? '0 20px' : '0', marginBottom: '44px' }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>
                Project Transformation Breakdown
              </h2>
              <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '24px', borderRadius: '2px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '16px' }}>
                {[
                  { title: 'The Challenge', desc: 'The existing retail space lacked structure, poor lighting reduced product visibility, and customer flow was inefficient.' },
                  { title: 'Our Approach', desc: 'We redesigned the layout with strategic zoning, introduced premium lighting, and optimized fixture placement.' },
                  { title: 'Final Outcome', desc: 'A clean, high-end retail environment that improves customer experience and enhances product visibility.' }
                ].map((item, i) => (
                  <div key={i} style={{ border: `1px solid ${BORDER}`, borderRadius: '6px', padding: '20px', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <p style={{ fontSize: '12px', fontWeight: 800, color: ORANGE, marginBottom: '8px', letterSpacing: '1px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: DARK, marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                    <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ padding: isMobile ? '0' : '0', marginBottom: '44px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>Project Gallery</h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '20px', borderRadius: '2px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2px' }}>
              {service.images.map((img, i) => (
                <div key={i}
                  className="gallery-item"
                  onClick={() => setPopupImg(img)}
                  style={{ overflow: 'hidden', borderRadius: '5px', cursor: 'pointer', border: `2px solid ${i === activeImg ? ORANGE : 'transparent'}`, transition: 'border-color 0.2s' }}>
                  <img src={img} alt={`Project ${i + 1}`}
                    style={{ width: '100%', height: isMobile ? '240px' : '260px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
              ))}
            </div>
            {popupImg && (
              <div className="image-modal" onClick={() => setPopupImg(null)}>
                <span className="image-modal-close">×</span>
                <img src={popupImg} alt="Preview" />
              </div>
            )}
          </div>

          {/* ── Mobile Quote Form ── */}
          {isMobile && (
            <div style={{ padding: '0 20px', marginBottom: '44px' }}>
              <QuoteForm />
            </div>
          )}

          {/* ── FIX: Mobile — Our Services + Driven by Results ── */}
          {isMobile && (
            <div style={{ padding: '0 20px', marginBottom: '44px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Other Services */}
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: GREY_MID, padding: '14px 18px' }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 800, color: '#fff', margin: 0 }}>Our Services</h3>
                </div>
                {otherServices.map((s, i) => (
                  <Link key={i} to={s.href}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', textDecoration: 'none', borderBottom: i < otherServices.length - 1 ? `1px solid ${BORDER}` : 'none', fontSize: '13px', fontWeight: 700, color: DARK, transition: 'all 0.2s', background: '#fff' }}
                    onMouseEnter={e => { e.currentTarget.style.color = ORANGE; e.currentTarget.style.background = GREY_BG; }}
                    onMouseLeave={e => { e.currentTarget.style.color = DARK; e.currentTarget.style.background = '#fff'; }}
                  >
                    <span>{s.label}</span>
                    <span style={{ fontSize: '16px' }}>›</span>
                  </Link>
                ))}
              </div>

              {/* Stats */}
              <div style={{ background: ORANGE, borderRadius: '6px', padding: '22px', color: '#fff' }}>
                <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '14px', fontWeight: 700 }}>Driven by Results</p>
                {[['500+', 'Projects Delivered'], ['200+', 'Locations Covered'], ['20+', 'Years in Business'], ['4.9★', 'Client Satisfaction']].map(([num, label]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '9px 0' }}>
                    <span style={{ fontSize: '22px', fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>{num}</span>
                    <span style={{ fontSize: '12px', opacity: 0.8, textAlign: 'right', maxWidth: '110px', lineHeight: 1.4 }}>{label}</span>
                  </div>
                ))}
              </div>

            </div>
          )}

          <div style={{ padding: isMobile ? '0 20px' : '0', marginBottom: '44px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: DARK, marginBottom: '8px' }}>Frequently Asked Questions (FAQs)</h2>
            <div style={{ width: '36px', height: '3px', background: ORANGE, marginBottom: '20px', borderRadius: '2px' }} />
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', textAlign: 'left', gap: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: faqOpen === i ? ORANGE : DARK, fontFamily: "'Montserrat', sans-serif", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: faqOpen === i ? ORANGE : MUTED, flexShrink: 0, fontWeight: 300 }}>{faqOpen === i ? '−' : '+'}</span>
                </button>
                {faqOpen === i && (
                  <p style={{ fontSize: '14px', color: MUTED, paddingBottom: '18px', lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* SIDEBAR — desktop only */}
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '72px' }}>

            <QuoteForm />

            {/* Other Services */}
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: GREY_MID, padding: '14px 18px' }}>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 800, color: '#fff', margin: 0 }}>Our Services</h3>
              </div>
              {otherServices.map((s, i) => (
                <Link key={i} to={s.href}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', textDecoration: 'none', borderBottom: i < otherServices.length - 1 ? `1px solid ${BORDER}` : 'none', fontSize: '13px', fontWeight: 700, color: DARK, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = ORANGE; e.currentTarget.style.background = GREY_BG; }}
                  onMouseLeave={e => { e.currentTarget.style.color = DARK; e.currentTarget.style.background = '#fff'; }}
                >
                  <span>{s.label}</span>
                  <span style={{ fontSize: '16px' }}>›</span>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div style={{ background: ORANGE, borderRadius: '6px', padding: '22px', color: '#fff' }}>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '14px', fontWeight: 700 }}>Driven by Results</p>
              {[['500+', 'Projects Delivered'], ['200+', 'Locations Covered'], ['20+', 'Years in Business'], ['4.9★', 'Client Satisfaction']].map(([num, label]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '9px 0' }}>
                  <span style={{ fontSize: '22px', fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>{num}</span>
                  <span style={{ fontSize: '12px', opacity: 0.8, textAlign: 'right', maxWidth: '110px', lineHeight: 1.4 }}>{label}</span>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* FULL-WIDTH CTA */}
      <div style={{ background: DARK, color: '#fff', textAlign: 'center', padding: isMobile ? '48px 24px' : '72px 40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: ORANGE, marginBottom: '12px', fontWeight: 800 }}>Ready to Transform Your Retail Space?</p>
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? '24px' : '38px', fontWeight: 900, lineHeight: 1.1, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
          Let ShopFitting Solutions Bring Your Retail <span style={{ color: ORANGE }}>Vision</span> to Life
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', maxWidth: '500px', margin: '0 auto 28px', lineHeight: 1.8 }}>
          End-to-end {service.title.toLowerCase()} from concept to installation. Free site surveys and detailed quotations — no obligation.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* FIX: "Get a Free Quote" scrolls to the inline quote form on mobile, navigates to /contact on desktop */}
          {isMobile ? (
            <button
              onClick={() => {
                const form = document.getElementById('quote-form');
                if (form) form.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '14px 34px', background: ORANGE, color: '#fff', borderRadius: '4px', fontWeight: 800, fontSize: '13px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' }}
            >
              Get a Free Quote
            </button>
          ) : (
            <Link
              to="/contact"
              style={{ padding: '14px 34px', background: ORANGE, color: '#fff', borderRadius: '4px', fontWeight: 800, fontSize: '13px', textDecoration: 'none', letterSpacing: '0.5px', textTransform: 'uppercase' }}
            >
              Get a Free Quote
            </Link>
          )}
          <a href="tel:+919999999999" style={{ padding: '14px 34px', border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '4px', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Call Us Now</a>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Nunito+Sans:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progressBar { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
}