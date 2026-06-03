import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const industries = [
  'Jewellery Store', 'Supermarket', 'Kiosk/Stand', 'Cafe/Restaurant',
  'Fashion Retail', 'Beauty/Wellness', 'Other Retail',
];

const budgets = [
  'Under $50,000', '$50,000 - $100,000', '$100,000 - $250,000',
  '$250,000 - $500,000', '$500,000+', 'Not sure yet',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    industry: '', budget: '', location: '', message: '',
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClass =
    'w-full border-b py-3 outline-none transition bg-transparent focus:border-b-2';

  return (
    <section id="contact" className="py-28 scroll-mt-20" style={{ background: '#f5f5ff' }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div>
          <span className="font-semibold uppercase text-sm tracking-wider" style={{ color: '#CC0001' }}>
            Contact Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
            Let's Build Your <br />
            <span style={{ color: '#CC0001' }}>Next Retail Space</span>
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            From concept to completion, we deliver premium shopfitting solutions tailored to your business.
          </p>

          <div className="space-y-4 text-gray-700">
            <p style={{ color: '#FFCD00' }}>✔ Free consultation & planning</p>
            <p style={{ color: '#FFCD00' }}>✔ End-to-end project management</p>
            <p style={{ color: '#FFCD00' }}>✔ On-time delivery guarantee</p>
          </div>

          {/* Mini flag accent */}
          <div className="mt-10 w-24 h-1 rounded-full" style={{ background: 'linear-gradient(to right, #CC0001 33.3%, #e0e0e0 33.3% 66.6%, #FFCD00 66.6%)' }} />
        </div>

        {/* RIGHT SIDE FORM */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="name" required placeholder="Full Name"
                  value={form.name} onChange={handleChange}
                  className={inputClass}
                  style={{ borderColor: 'rgba(0,0,128,0.20)', '--tw-border-opacity': 1 }}
                  onFocus={e => e.target.style.borderColor = '#CC0001'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
                />
                <input type="email" name="email" required placeholder="Email"
                  value={form.email} onChange={handleChange}
                  className={inputClass}
                  style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                  onFocus={e => e.target.style.borderColor = '#CC0001'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
                />
                <input type="tel" name="phone" required placeholder="Phone"
                  value={form.phone} onChange={handleChange}
                  className={inputClass}
                  style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                  onFocus={e => e.target.style.borderColor = '#CC0001'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
                />
                <input type="text" name="company" placeholder="Company"
                  value={form.company} onChange={handleChange}
                  className={inputClass}
                  style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                  onFocus={e => e.target.style.borderColor = '#CC0001'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
                />
              </div>

              <select name="industry" required value={form.industry}
                onChange={handleChange}
                className={inputClass}
                style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                onFocus={e => e.target.style.borderColor = '#CC0001'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
              >
                <option value="">Select Industry</option>
                {industries.map((i) => <option key={i}>{i}</option>)}
              </select>

              <select name="budget" value={form.budget}
                onChange={handleChange}
                className={inputClass}
                style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                onFocus={e => e.target.style.borderColor = '#CC0001'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
              >
                <option value="">Select Budget</option>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>

              <input type="text" name="location" required placeholder="Project Location"
                value={form.location} onChange={handleChange}
                className={inputClass}
                style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                onFocus={e => e.target.style.borderColor = '#CC0001'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
              />

              <textarea name="message" rows={3} placeholder="Project Details"
                value={form.message} onChange={handleChange}
                className={`${inputClass} resize-none`}
                style={{ borderColor: 'rgba(0,0,128,0.20)' }}
                onFocus={e => e.target.style.borderColor = '#CC0001'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,128,0.20)'}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-6 px-8 py-4 text-white font-semibold rounded-full transition flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #CC0001, #a80001)', boxShadow: '0 4px 15px rgba(204,0,1,0.30)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #a80001, #8a0001)'}
                onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, #CC0001, #a80001)'}
              >
                {loading ? (
                  <>Sending <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Send Enquiry <Send className="w-4 h-4" /></>
                )}
              </button>

            </form>
          ) : (
            <div className="text-left">
              <CheckCircle className="w-12 h-12 mb-4" style={{ color: '#FFCD00' }} />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600">We'll contact you within 24 hours.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
