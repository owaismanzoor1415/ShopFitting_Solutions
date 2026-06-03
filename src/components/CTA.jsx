import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { useAdminData } from '../admin/context/AdminDataContext';

export default function CTA() {
  const { data } = useAdminData();
  const cta = data.ctaContent || {};
  const contact = data.contactInfo || {};

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #00308F 0%, #002070 60%, #001850 100%)' }}>

      {/* Red glow orb */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #CC0001, transparent 70%)' }} />
      {/* Gold glow orb */}
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #FFCD00, transparent 70%)' }} />

      {/* Dot grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="font-semibold uppercase tracking-widest text-sm" style={{ color: '#CC0001' }}>
              {cta.badge || 'Start Your Project'}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
              {cta.heading ? (
                <span dangerouslySetInnerHTML={{ __html: cta.heading.replace(/([^?!.]+\??)$/, (m) => `<span style="color:#CC0001">${m}</span>`) }} />
              ) : (
                <>Ready to Build a <br />
                <span style={{ color: '#CC0001' }}>High-Impact Retail Space?</span></>
              )}
            </h2>

            <p className="text-lg mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.70)' }}>
              {cta.subheading || 'From concept to completion, we deliver premium shopfitting solutions designed to elevate your brand and increase customer engagement.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/#contact"
                className="group inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition"
                style={{ background: 'linear-gradient(135deg, #CC0001, #a80001)', boxShadow: '0 4px 20px rgba(204,0,1,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #a80001, #8a0001)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #CC0001, #a80001)'; e.currentTarget.style.transform = 'none'; }}
              >
                {cta.cta1 || 'Get Free Consultation'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </a>

              <a
                href={`tel:${(contact.phone || '1800335044').replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition"
                style={{ border: '1px solid rgba(255,255,255,0.20)', color: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>

          {/* RIGHT CONTACT INFO */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>

            {[
              { Icon: Phone, label: 'Phone', content: contact.phone || '1800 335 044', href: `tel:${(contact.phone || '1800335044').replace(/\s/g,'')}`, iconColor: '#CC0001' },
              { Icon: Mail, label: 'Email', content: contact.email || 'info@shopfittingsolutions.com.au', href: `mailto:${contact.email || 'info@shopfittingsolutions.com.au'}`, iconColor: '#CC0001' },
              { Icon: MapPin, label: 'Address', content: contact.address || 'Sydney • Melbourne • Brisbane • Perth • Adelaide', href: null, iconColor: '#FFCD00' },
            ].map(({ Icon, label, content, href, iconColor }) => (
              <div key={label} className="flex items-start gap-4 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition"
                  style={{ background: 'rgba(204,0,1,0.08)', border: '1px solid rgba(204,0,1,0.20)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: iconColor }} />
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.50)' }}>{label}</p>
                  {href ? (
                    <a href={href} className="font-medium transition" style={{ color: '#fff' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#CC0001'}
                      onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                    >{content}</a>
                  ) : (
                    <p className="font-medium" style={{ color: '#fff' }}>{content}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.50)' }}>Business Hours</p>
              <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
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
