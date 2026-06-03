import { Gem, ShoppingCart, Store, Coffee, Shirt, Sparkles, ArrowRight } from 'lucide-react';
import { useAdminData } from '../admin/context/AdminDataContext';

const iconMap = {
  gem: Gem,
  'shopping-cart': ShoppingCart,
  store: Store,
  coffee: Coffee,
  shirt: Shirt,
  sparkles: Sparkles,
};

export default function Industries() {
  const { data } = useAdminData();
  const industries = data.industries || [];

  return (
    <section id="industries" className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-2xl mb-20">
          <p className="font-semibold tracking-widest mb-4" style={{ color: '#CC0001' }}>
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

          {/* Flag accent line */}
          <div className="mt-6 w-32 h-1 rounded-full" style={{ background: 'linear-gradient(to right, #CC0001 33.3%, #e0e0e0 33.3% 66.6%, #FFCD00 66.6%)' }} />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {industries.map((ind, index) => {
            const Icon = iconMap[ind.icon];
            return (
              <div
                key={ind.title}
                className="group relative pb-10 border-b"
                style={{ borderColor: 'rgba(0,0,128,0.10)' }}
              >
                {/* BIG NUMBER */}
                <span className="absolute -top-6 right-0 text-[80px] font-bold transition" style={{ color: 'rgba(0,0,128,0.05)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* ICON */}
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition"
                  style={{ background: '#f5f5ff' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(204,0,1,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f5f5ff'}
                >
                  {Icon && <Icon className="w-7 h-7" style={{ color: '#CC0001' }} />}
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 transition group-hover:text-[#CC0001]">
                  {ind.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 mb-5 leading-relaxed max-w-md">
                  {ind.desc}
                </p>

                {/* FEATURES */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                  {ind.features.map((f) => (
                    <span
                      key={f}
                      className="text-sm text-gray-500 border-b"
                      style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 font-medium relative"
                  style={{ color: '#CC0001' }}
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full" style={{ background: 'linear-gradient(to right, #CC0001, #00308F)' }} />
                </a>
              </div>
            );
          })}
        </div>

        {/* FINAL CTA */}
        <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid rgba(0,0,128,0.10)' }}>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Let's Build Your Next Retail Space
          </h3>
          <p className="text-gray-600 mb-8">
            From concept to execution — we deliver complete shopfitting solutions.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 text-white font-semibold rounded-full transition"
            style={{ background: 'linear-gradient(135deg, #00308F, #1a1a8e)', boxShadow: '0 4px 15px rgba(0,0,128,0.25)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #CC0001, #a80001)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(204,0,1,0.30)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #00308F, #1a1a8e)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,128,0.25)'; }}
          >
            Talk to our expertise
          </a>
        </div>

      </div>
    </section>
  );
}
