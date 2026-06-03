import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const navLinks = ['Home', 'About', 'Services', 'Industries', 'Process', 'Portfolio', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[99999] bg-white"
      style={{
        borderBottom: scrolled ? '1px solid rgba(0,0,128,0.10)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,128,0.10)' : 'none',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
    >
      {/* Australian flag accent stripe */}
      <div style={{
        height: 3,
        background: 'linear-gradient(to right, #CC0001 33.3%, #ffffff 33.3% 66.6%, #00308F 66.6%)',
      }} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <HashLink smooth to="/#home" className="flex items-center gap-2 max-w-[70%]">
            <img
              src="/logo.webp"
              alt="Shop Fitting Solutions"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="font-semibold text-gray-900 text-sm truncate">
                ShopFitting
                <span style={{ color: '#CC0001' }}> Solutions</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest truncate" style={{ color: '#CC0001' }}>
                SSI
              </span>
            </div>
          </HashLink>

          {/* NAV LINKS (DESKTOP) */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm" style={{ color: '#001E6E' }}>
            {navLinks.map((link) => {
              const id = link.toLowerCase();
              return (
                <HashLink
                  key={link}
                  smooth
                  to={`/#${id}`}
                  className="relative group transition-colors"
                  style={{ color: '#001E6E' }}
                >
                  {link}
                  <span
                    className="absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                    style={{ background: 'linear-gradient(to right, #CC0001, #00308F)' }}
                  />
                </HashLink>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:1800335044"
              className="hidden md:flex items-center gap-2 text-sm font-semibold"
              style={{ color: '#00308F' }}
            >
              <Phone className="w-4 h-4" style={{ color: '#CC0001' }} />
              1800 335 044
            </a>

            <HashLink
              smooth
              to="/#contact"
              className="hidden md:inline-block px-4 py-2 rounded-md text-white text-sm font-semibold transition"
              style={{
                background: 'linear-gradient(135deg, #CC0001 0%, #a80001 100%)',
                boxShadow: '0 2px 10px rgba(204,0,1,0.30)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #a80001 0%, #8a0001 100%)'}
              onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, #CC0001 0%, #a80001 100%)'}
            >
              Get a Quote
            </HashLink>

            {/* HAMBURGER */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 bg-white border rounded-md shadow-md z-[9999]"
              style={{ borderColor: 'rgba(0,0,128,0.2)' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-6 h-[2px] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} style={{ background: '#CC0001' }} />
              <span className={`w-6 h-[2px] my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: '#CC0001' }} />
              <span className={`w-6 h-[2px] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} style={{ background: '#CC0001' }} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[500px]' : 'max-h-0'} bg-white border-t`}
        style={{ borderColor: 'rgba(0,0,128,0.10)' }}
      >
        <div className="px-4 py-5 space-y-4">
          {navLinks.map((link) => {
            const id = link.toLowerCase();
            return (
              <HashLink
                key={link}
                smooth
                to={`/#${id}`}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium py-2 border-b transition"
                style={{ color: '#001E6E', borderColor: 'rgba(0,0,128,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#CC0001'}
                onMouseLeave={e => e.currentTarget.style.color = '#001E6E'}
              >
                {link}
              </HashLink>
            );
          })}

          <HashLink
            smooth
            to="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full py-3 text-white text-center font-semibold rounded-md mt-4 transition"
            style={{ background: 'linear-gradient(135deg, #CC0001, #a80001)' }}
          >
            Get a Free Quote
          </HashLink>
        </div>
      </div>
    </header>
  );
}
