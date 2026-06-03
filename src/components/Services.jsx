import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAdminData } from "../admin/context/AdminDataContext";


export default function Services() {
  const { data } = useAdminData();
  const servicesDetail = data.servicesDetail || [];

  return (
    <section id="services" className="pt-20 pb-12" style={{ background: 'linear-gradient(135deg, #f5f5ff 0%, #fff 50%, #fff8f0 100%)' }}>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-20">
        <span
          className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background: 'rgba(204,0,1,0.12)', color: '#CC0001' }}
        >
          Our Expertise
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Retail Solutions That <span style={{ color: '#CC0001' }}>Perform</span>
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Designed to attract customers, optimise flow, and maximise your store performance.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-0 grid md:grid-cols-2 lg:grid-cols-3 gap-2">

        {servicesDetail.map((service, index) => (
          <motion.div
            key={service.slug || index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group rounded-2xl overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={service.images && service.images[3] ? service.images[3] : service.images?.[0]}
              alt={service.title}
              className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-110"
            />

            {/* DARK OVERLAY with navy tint on hover */}
            <div
              className="absolute inset-0 transition duration-500"
              style={{ background: 'rgba(0,0,30,0.30)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,80,0.72)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,30,0.30)'}
            />
            {/* Re-add hover via group since inline doesn't support group-hover */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-[#000050]/70 transition duration-500" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-semibold mb-2">{service.title}</h3>

              <div className="opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                <p className="text-white/80 text-sm mb-3 max-w-xs">
                  {service.tagline || "Premium retail solutions designed for growth."}
                </p>
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 font-medium transition"
                  style={{ color: '#CC0001' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffb347'}
                  onMouseLeave={e => e.currentTarget.style.color = '#CC0001'}
                >
                  View Service <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

      </div>

      <div className="text-center mt-12">
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 px-10 py-4 text-white font-semibold rounded-full transition shadow-lg hover:shadow-xl hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #CC0001, #a80001)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #a80001, #8a0001)'}
          onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, #CC0001, #a80001)'}
        >
          Start Your Project <ArrowRight className="w-5 h-5" />
        </a>
      </div>

    </section>
  );
}
