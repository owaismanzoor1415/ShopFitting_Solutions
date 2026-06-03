import { Facebook, Instagram, Linkedin, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = ['Home', 'About', 'Services', 'Industries', 'Process', 'Portfolio', 'Contact'];

const serviceLinks = [
  { name: 'Design & Planning', slug: 'design-planning' },
  { name: 'Interior Fit-Out', slug: 'interior-fit-out' },
  { name: 'Custom Joinery', slug: 'custom-joinery' },
  { name: 'Lighting Solutions', slug: 'lighting-solutions' },
  { name: 'Project Management', slug: 'project-management' },
  { name: 'Maintenance', slug: 'maintenance-support' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #00308F 0%, #002070 60%, #060660 100%)', color: '#fff' }}>

      {/* Top flag stripe */}
      <div style={{ height: 4, background: 'linear-gradient(to right, #CC0001 33.3%, rgba(255,255,255,0.3) 33.3% 66.6%, #003399 66.6%)' }} />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* COMPANY */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.webp" alt="logo" className="w-10 h-10" />
              <div>
                <h3 className="font-bold text-lg text-white">ShopFitting Solutions</h3>
                <p className="text-xs" style={{ color: '#CC0001' }}>SSI</p>
              </div>
            </div>

            <p className="mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
              We design and deliver premium retail environments that enhance customer
              experience and drive business growth.
            </p>

            <div className="flex gap-3">
              {[
                { Icon: Facebook, link: "https://facebook.com/your-page" },
                { Icon: Instagram, link: "https://instagram.com/your-profile" },
                { Icon: Linkedin, link: "https://linkedin.com/in/your-profile" },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition"
                  style={{ background: 'rgba(204,0,1,0.15)', border: '1px solid rgba(204,0,1,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(204,0,1,0.30)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(204,0,1,0.15)'}
                >
                  <Icon className="w-5 h-5" style={{ color: '#CC0001' }} />
                </a>
              ))}
            </div>
          </div>

          {/* NAV LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l}>
                  <a
                    href={`/#${l.toLowerCase()}`}
                    className="flex items-center gap-2 transition"
                    style={{ color: 'rgba(255,255,255,0.80)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#CC0001'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.80)'}
                  >
                    <ArrowRight className="w-4 h-4" style={{ color: '#FFCD00' }} />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="flex items-center gap-2 transition"
                    style={{ color: 'rgba(255,255,255,0.80)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#CC0001'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.80)'}
                  >
                    <ArrowRight className="w-4 h-4" style={{ color: '#FFCD00' }} />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Contact</h3>
            <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.80)' }}>
              <a href="tel:18007436748" className="flex items-start gap-3 transition hover:text-white">
                <Phone className="w-5 h-5 mt-1" style={{ color: '#CC0001' }} />
                1800 SHOP FIT
              </a>
              <a href="mailto:info@shopfitpro.com.au" className="flex items-start gap-3 transition hover:text-white">
                <Mail className="w-5 h-5 mt-1" style={{ color: '#CC0001' }} />
                info@shopfitpro.com.au
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" style={{ color: '#FFCD00' }} />
                <span>Sydney • Melbourne • Brisbane <br />Perth • Adelaide • Australia</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(204,0,1,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>
            © 2026 ShopFitting Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms', 'Sitemap'].map((l) => (
              <a
                key={l}
                href="#"
                className="transition"
                style={{ color: 'rgba(255,255,255,0.70)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#CC0001'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.70)'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
