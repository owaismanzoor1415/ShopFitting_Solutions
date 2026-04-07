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
    'w-full border-b border-gray-300 py-3 focus:border-orange-500 outline-none transition bg-transparent';

  return (
    // ✅ CHANGE: Added scroll-mt-20 — offsets the fixed navbar height so the
    // section snaps flush to the navbar instead of leaving a black gap above it.
    <section id="contact" className="py-28 bg-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

        {/* 🔥 LEFT SIDE */}
        <div>
          <span className="text-orange-500 font-semibold uppercase text-sm tracking-wider">
            Contact Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
            Let's Build Your <br />
            <span className="text-orange-500">Next Retail Space</span>
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            From concept to completion, we deliver premium shopfitting solutions tailored to your business.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>✔ Free consultation & planning</p>
            <p>✔ End-to-end project management</p>
            <p>✔ On-time delivery guarantee</p>
          </div>
        </div>

        {/* 🔥 RIGHT SIDE FORM */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="name" required placeholder="Full Name"
                  value={form.name} onChange={handleChange} className={inputClass} />

                <input type="email" name="email" required placeholder="Email"
                  value={form.email} onChange={handleChange} className={inputClass} />

                <input type="tel" name="phone" required placeholder="Phone"
                  value={form.phone} onChange={handleChange} className={inputClass} />

                <input type="text" name="company" placeholder="Company"
                  value={form.company} onChange={handleChange} className={inputClass} />
              </div>

              <select name="industry" required value={form.industry}
                onChange={handleChange} className={inputClass}>
                <option value="">Select Industry</option>
                {industries.map((i) => <option key={i}>{i}</option>)}
              </select>

              <select name="budget" value={form.budget}
                onChange={handleChange} className={inputClass}>
                <option value="">Select Budget</option>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>

              <input type="text" name="location" required placeholder="Project Location"
                value={form.location} onChange={handleChange} className={inputClass} />

              <textarea name="message" rows={3} placeholder="Project Details"
                value={form.message} onChange={handleChange}
                className={`${inputClass} resize-none`} />

              {/* 🔥 BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition flex items-center gap-2"
              >
                {loading ? (
                  <>
                    Sending <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Enquiry <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          ) : (
            <div className="text-left">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600">We'll contact you within 24 hours.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}