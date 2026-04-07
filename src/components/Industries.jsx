import { Gem, ShoppingCart, Store, Coffee, Shirt, Sparkles, ArrowRight } from 'lucide-react';
import { industries } from '../data/siteData';

const iconMap = {
  gem: Gem,
  'shopping-cart': ShoppingCart,
  store: Store,
  coffee: Coffee,
  shirt: Shirt,
  sparkles: Sparkles,
};

export default function Industries() {
  return (
    <section id="industries" className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔥 HEADER */}
        <div className="max-w-2xl mb-20">
          <p className="text-orange-500 font-semibold tracking-widest mb-4">
            INDUSTRIES
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Retail Spaces <br />
            <span className="text-gray-400">Built for Performance</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            We design retail environments that balance aesthetics, efficiency,
            and customer experience — tailored for every industry we serve.
          </p>
        </div>

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">

          {industries.map((ind, index) => {
            const Icon = iconMap[ind.icon];

            return (
              <div
                key={ind.title}
                className="group relative pb-10 border-b border-gray-200"
              >

                {/* 🔥 NUMBER (BIG BACKGROUND STYLE) */}
                <span className="absolute -top-6 right-0 text-[80px] font-bold text-gray-100 group-hover:text-orange-100 transition">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* 🔥 ICON */}
                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-orange-100 transition">
                  {Icon && <Icon className="w-7 h-7 text-orange-500" />}
                </div>

                {/* 🔥 TITLE */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-orange-500 transition">
                  {ind.title}
                </h3>

                {/* 🔥 DESCRIPTION */}
                <p className="text-gray-600 mb-5 leading-relaxed max-w-md">
                  {ind.desc}
                </p>

                {/* 🔥 FEATURES (INLINE MINIMAL STYLE) */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                  {ind.features.map((f) => (
                    <span
                      key={f}
                      className="text-sm text-gray-500 border-b border-gray-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* 🔥 CTA (ANIMATED LINE STYLE) */}
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 text-orange-500 font-medium relative"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />

                  {/* underline animation */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </a>

              </div>
            );
          })}
        </div>

        {/* 🔥 FINAL CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Let’s Build Your Next Retail Space
          </h3>

          <p className="text-gray-600 mb-8">
            From concept to execution — we deliver complete shopfitting solutions.
          </p>

          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
          >
            Talk to our expertise
          </a>
        </div>

      </div>
    </section>
  );
}