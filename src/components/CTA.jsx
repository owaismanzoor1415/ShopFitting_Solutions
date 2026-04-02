import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-28 bg-gray-900 relative overflow-hidden">

      {/* 🔥 SUBTLE GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90" />

      {/* 🔥 LIGHT TEXTURE */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:30px_30px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* 🔥 LEFT CONTENT */}
          <div>
            <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
              Start Your Project
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              Ready to Build a <br />
              <span className="text-orange-500">High-Impact Retail Space?</span>
            </h2>

            <p className="text-white/70 text-lg mb-10 max-w-xl">
              From concept to completion, we deliver premium shopfitting solutions
              designed to elevate your brand and increase customer engagement.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">

              <a
                href="/#contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition shadow-lg"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="tel:18007436748"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>

            </div>

          </div>

          {/* 🔥 RIGHT CONTACT INFO (NO HEAVY BOX) */}
          <div className="space-y-8">

            <h3 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h3>

            {[
              {
                Icon: Phone,
                label: 'Phone',
                content: '1800 SHOP FIT (1800 746 734)',
                href: 'tel:18007436748',
              },
              {
                Icon: Mail,
                label: 'Email',
                content: 'info@shopfitpro.com.au',
                href: 'mailto:info@shopfitpro.com.au',
              },
              {
                Icon: MapPin,
                label: 'Service Areas',
                content:
                  'Sydney • Melbourne • Brisbane • Perth • Adelaide • Gold Coast • All Australia',
                href: null,
              },
            ].map(({ Icon, label, content, href }) => (
              <div key={label} className="flex items-start gap-4 group">

                {/* ICON */}
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-white/50 text-sm">{label}</p>

                  {href ? (
                    <a href={href} className="text-white font-medium hover:text-orange-400 transition">
                      {content}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{content}</p>
                  )}
                </div>

              </div>
            ))}

            {/* BUSINESS HOURS */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm mb-2">Business Hours</p>
              <p className="text-white/80 leading-relaxed">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 2:00 PM
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}