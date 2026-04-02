import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioItems } from '../data/siteData';

const slugMap = {
  'Lumina Jewellery Boutique': 'lumina-jewellery-boutique',
  'FreshMart Supermarket': 'freshmart-supermarket',
  'Brew & Co. Cafe': 'brew-co-cafe',
  'Style Hub Fashion Store': 'style-hub-fashion-store',
  'TechZone Kiosk': 'techzone-kiosk',
  'Serenity Spa & Wellness': 'serenity-spa-wellness',
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="pt-8 pb-16 bg-gray-100">

      <div className="w-full px-1">

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-orange-500 font-semibold tracking-wide mb-3">
            OUR PROJECTS
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real Retail <span className="text-orange-500">Transformations</span>
          </h2>

          <p className="text-gray-600 text-lg">
            Explore our latest shopfitting projects delivered across industries.
          </p>
        </div>

        {/* 🔥 GRID */}
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
                    className="w-full h-[220px] object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-6">

                  {/* TITLE */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-orange-500 transition">
                    {item.title}
                  </h3>

                  {/* DATE */}
                  <p className="text-xs text-gray-500 mb-4">
                    {item.year || "Oct 8, 2025"}
                  </p>

                  {/* DESCRIPTION */}
                 <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {item.desc}
                </p>

                  {/* BUTTON */}
                  <Link
                    to={`/portfolio/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2 border border-gray-300 text-gray-800 text-sm font-medium hover:border-orange-500 hover:text-orange-500 transition"
                  >
                    View Project <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>

              </div>
            );
          })}

        </div>

        {/* 🔥 CTA */}
        <div className="flex justify-center mt-24">
          <button
            onClick={() => {
              window.location.href = '/#contact';
            }}
            className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </section>
  );
}