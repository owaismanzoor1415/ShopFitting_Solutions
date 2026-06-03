import { Quote, Star } from 'lucide-react';
import { useAdminData } from '../admin/context/AdminDataContext';

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '25+', label: 'Years Experience' },
  { value: '10', label: 'Year Warranty' },
];

export default function Testimonials() {
  const { data } = useAdminData();
  const testimonials = data.testimonials || [];

  return (
    <section className="py-28" style={{ background: 'linear-gradient(135deg, #00308F 0%, #002070 60%, #001850 100%)', color: '#fff' }}>
      <div className="w-full px-0">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-semibold uppercase tracking-widest text-sm" style={{ color: '#CC0001' }}>
            Testimonials
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4 leading-tight">
            Trusted by <span style={{ color: '#CC0001' }}>Retail Brands</span>
          </h2>

          <p className="mt-6 text-lg" style={{ color: 'rgba(255,255,255,0.70)' }}>
            We partner with businesses to create high-performing retail environments
            that drive growth and customer engagement.
          </p>

          {/* Flag accent */}
          <div className="mt-8 mx-auto w-24 h-1 rounded-full" style={{ background: 'linear-gradient(to right, #CC0001 33.3%, rgba(255,255,255,0.2) 33.3% 66.6%, #FFCD00 66.6%)' }} />
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid md:grid-cols-2 gap-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-3xl p-10 backdrop-blur transition"
              style={{ border: '1px solid rgba(204,0,1,0.15)', background: 'rgba(255,255,255,0.04)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10" style={{ color: 'rgba(204,0,1,0.15)' }} />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ fill: '#CC0001', color: '#CC0001' }} />
                ))}
              </div>

              <p className="leading-relaxed mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.80)' }}>
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                  style={{ border: '2px solid #CC0001' }}
                />
                <div>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>{t.role}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <h3 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#CC0001' }}>
                {value}
              </h3>
              <p className="text-sm uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.60)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
