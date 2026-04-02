import { Quote, Star } from 'lucide-react';
import { testimonials } from '../data/siteData';

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '25+', label: 'Years Experience' },
  { value: '10', label: 'Year Warranty' },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-gray-900 text-white">
      <div className="w-full px-0">

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
            Testimonials
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold mt-4 leading-tight">
            Trusted by <span className="text-orange-500">Retail Brands</span>
          </h2>

          <p className="text-white/70 mt-6 text-lg">
            We partner with businesses to create high-performing retail environments
            that drive growth and customer engagement.
          </p>
        </div>

        {/* 🔥 TESTIMONIALS GRID */}
        <div className="grid md:grid-cols-2 gap-2">

          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative border border-white/10 rounded-3xl p-10 bg-white/5 backdrop-blur hover:bg-white/10 transition"
            >

              {/* QUOTE ICON */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-orange-500/20" />

              {/* STARS */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* TEXT */}
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                “{t.quote}”
              </p>

              {/* USER */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                />
                <div>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-white/60">{t.role}</p>
                  <p className="text-xs text-white/40">{t.location}</p>
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* 🔥 STATS (PREMIUM STYLE) */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {stats.map(({ value, label }) => (
            <div key={label}>
              <h3 className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                {value}
              </h3>
              <p className="text-white/60 text-sm uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}