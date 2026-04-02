import { Facebook, Instagram, Linkedin, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ ADDED

const navLinks = ['Home', 'About', 'Services', 'Industries', 'Process', 'Portfolio', 'Contact'];

// ✅ FIXED: added slug
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
    <footer className="bg-orange-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* 🔥 COMPANY */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="logo" className="w-10 h-10" />

              <div>
                <h3 className="font-bold text-lg">ShopFitting Solutions</h3>
                <p className="text-xs text-white/80">SSI</p>
              </div>
            </div>

            <p className="text-white/90 mb-6 leading-relaxed">
              We design and deliver premium retail environments that enhance customer
              experience and drive business growth.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 🔥 NAV LINKS (MATCH NAVBAR) */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Navigation</h3>

            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l}>
                  <a
                    href={`/#${l.toLowerCase()}`}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔥 SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>

            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}   // ✅ FIXED
                    className="flex items-center gap-2 text-white/90 hover:text-white transition"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔥 CONTACT */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>

            <div className="space-y-4 text-white/90">

              <a href="tel:18007436748" className="flex items-start gap-3 hover:text-white">
                <Phone className="w-5 h-5 mt-1" />
                1800 SHOP FIT
              </a>

              <a href="mailto:info@shopfitpro.com.au" className="flex items-start gap-3 hover:text-white">
                <Mail className="w-5 h-5 mt-1" />
                info@shopfitpro.com.au
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>
                  Sydney • Melbourne • Brisbane <br />
                  Perth • Adelaide • Australia
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 🔥 BOTTOM BAR */}
      <div className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-white/90">
            © 2026 ShopFitting Solutions. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            {['Privacy Policy', 'Terms', 'Sitemap'].map((l) => (
              <a key={l} href="#" className="text-white/90 hover:text-white">
                {l}
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}