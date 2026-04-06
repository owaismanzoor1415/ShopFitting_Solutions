import { Link } from "react-router-dom";
import { servicesDetail } from "../data/servicesDetail";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";


export default function Services() {
  return (
    <section id="services" className="pt-20 pb-12 bg-gradient-to-r from-gray-100 via-white to-orange-100">

      {/* 🔥 HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-20">
        <span className="inline-block px-5 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
          Our Expertise
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Retail Solutions That <span className="text-orange-500">Perform</span>
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Designed to attract customers, optimise flow, and maximise your store performance.
        </p>
      </div>

      {/* 🔥 GRID */}
      <div className="max-w-7xl mx-auto px-0 grid md:grid-cols-2 lg:grid-cols-3 gap-2">

        {servicesDetail.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group rounded-2xl overflow-hidden">

            {/* 🔥 IMAGE */}
            <img
              src={service.images[3]}
              alt={service.title}
              className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-110"
            />

            {/* 🔥 DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition duration-500"></div>

            {/* 🔥 CONTENT */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">

              {/* TITLE */}
              <h3 className="text-white text-xl font-semibold mb-2">
                {service.title}
              </h3>

              {/* 🔥 HOVER CONTENT (PREMIUM EFFECT) */}
              <div className="opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">

                <p className="text-white/80 text-sm mb-3 max-w-xs">
                  {service.tagline || "Premium retail solutions designed for growth."}
                </p>

                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300"
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
            className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition shadow-lg hover:shadow-xl hover:scale-105"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </a>
        </div>

    </section>
  );
}