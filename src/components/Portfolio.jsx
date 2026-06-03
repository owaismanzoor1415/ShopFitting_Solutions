import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../admin/context/AdminDataContext';

const slugMap = {
  'Lumina Jewellery Boutique': 'lumina-jewellery-boutique',
  'FreshMart Supermarket': 'freshmart-supermarket',
  'Brew & Co. Cafe': 'brew-co-cafe',
  'Style Hub Fashion Store': 'style-hub-fashion-store',
  'TechZone Kiosk': 'techzone-kiosk',
  'Serenity Spa & Wellness': 'serenity-spa-wellness',
};

export default function Portfolio() {
  const { data } = useAdminData();
  const portfolioItems = data.portfolioItems || [];

  return (
    <section id="portfolio" className="pt-8 pb-8" style={{ background: '#f5f5ff' }}>
      <div className="w-full px-1">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-semibold tracking-wide mb-3" style={{ color: '#CC0001' }}>
            OUR PROJECTS
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real Retail <span style={{ color: '#CC0001' }}>Transformations</span>
          </h2>

          <p className="text-gray-600 text-lg">
            Explore our latest shopfitting projects delivered across industries.
          </p>

          <div className="mt-6 mx-auto w-24 h-1 rounded-full" style={{ background: 'linear-gradient(to right, #CC0001 33.3%, #e0e0e0 33.3% 66.6%, #FFCD00 66.6%)' }} />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {portfolioItems.map((item) => {
            const slug = slugMap[item.title];
            return (
              <div key={item.title} className="group">

                {/* IMAGE */}
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[220px] object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-6">
                  <h3
                    className="text-lg font-bold text-gray-900 mb-2 leading-snug transition"
                    style={{}}
                    onMouseEnter={e => e.currentTarget.style.color = '#CC0001'}
                    onMouseLeave={e => e.currentTarget.style.color = '#111827'}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 mb-4">
                    {item.year || "Oct 8, 2025"}
                  </p>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {item.desc}
                  </p>

                  <Link
                    to={`/portfolio/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium transition"
                    style={{ border: '1px solid rgba(0,0,128,0.20)', color: '#001E6E' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#CC0001'; e.currentTarget.style.color = '#CC0001'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,128,0.20)'; e.currentTarget.style.color = '#001E6E'; }}
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => { window.location.href = '/#contact'; }}
            className="inline-flex items-center gap-2 px-10 py-4 text-white font-semibold rounded-full shadow-lg transition hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #CC0001, #a80001)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #00308F, #1a1a8e)'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, #CC0001, #a80001)'}
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
