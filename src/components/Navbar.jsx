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
    <header className="fixed top-0 left-0 right-0 z-[99999] bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* 🔥 LOGO */}
          <HashLink smooth to="/#home" className="flex items-center gap-2 max-w-[70%]">
            <img
              src="/logo.png"
              alt="Shop Fitting Solutions"
              className="w-12 h-12 object-contain"
            />

            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="font-semibold text-gray-900 text-sm truncate">
                ShopFitting
                <span className="text-orange-500"> Solutions</span>
              </span>

              <span className="text-[10px] text-orange-500 font-semibold tracking-widest truncate">
                SSI
              </span>
            </div>
          </HashLink>

          {/* 🔥 NAV LINKS (DESKTOP) */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium text-sm">
            {navLinks.map((link) => {
              const id = link.toLowerCase();

              return (
                <HashLink
                  key={link}
                  smooth
                  to={`/#${id}`} // ✅ ALL LINKS SCROLL (INCLUDING SERVICES)
                  className="relative group"
                >
                  {link}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </HashLink>
              );
            })}
          </nav>

          {/* 🔥 RIGHT SIDE */}
          <div className="flex items-center gap-2 shrink-0">

            <a
              href="tel:1800335044"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-orange-500"
            >
              <Phone className="w-4 h-4" />
              1800 335 044
            </a>

            <HashLink
              smooth
              to="/#contact"
              className="hidden md:inline-block px-3 py-2 rounded-md text-white bg-orange-500 hover:bg-orange-600 transition text-sm font-semibold"
            >
              Get a Quote
            </HashLink>

            {/* 🔥 HAMBURGER */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 bg-white border border-gray-300 rounded-md shadow-md z-[9999]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-6 h-[2px] bg-orange-500 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
              <span className={`w-6 h-[2px] bg-orange-500 my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-[2px] bg-orange-500 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
            </button>

          </div>
        </div>
      </div>

      {/* 🔥 MOBILE MENU */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[500px]' : 'max-h-0'
        } bg-white border-t`}
      >
        <div className="px-4 py-5 space-y-4">
          {navLinks.map((link) => {
            const id = link.toLowerCase();

            return (
              <HashLink
                key={link}
                smooth
                to={`/#${id}`} // ✅ FIXED HERE ALSO
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 text-base font-medium hover:text-orange-500 py-2 border-b"
              >
                {link}
              </HashLink>
            );
          })}

          <HashLink
            smooth
            to="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full py-3 bg-orange-500 text-white text-center font-semibold rounded-md mt-4"
          >
            Get a Free Quote
          </HashLink>
        </div>
      </div>
    </header>
  );
}