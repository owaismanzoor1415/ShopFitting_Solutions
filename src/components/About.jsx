import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "Premium Retail Design",
    text: "We specialize in designing premium retail environments that enhance customer experience and maximize product visibility. Our shopfitting solutions combine aesthetics with functionality to create visually stunning and practical spaces.",
    image: "/AboutImages/PTC_GC_160418_003-compressed.webp",
  },
  {
    title: "Smart Space Planning",
    text: "Our team focuses on intelligent space planning to ensure efficient layouts that improve customer flow and product accessibility. Every design is optimized for both performance and visual appeal.",
    image: "/AboutImages/Famous_PF_0616_0054-compressed.webp",
  },
  {
    title: "Custom Fit-Out Solutions",
    text: "We deliver custom fit-out solutions tailored to your business needs, whether it's retail stores, kiosks, or commercial spaces. Each project is crafted with precision and attention to detail.",
    image: "/AboutImages/ID_DL_0624_0104-compressed.webp",
  },
  {
    title: "Execution & Quality Delivery",
    text: "From concept to completion, we ensure high-quality execution using skilled professionals and modern construction techniques. We are committed to delivering projects on time without compromising quality.",
    image: "/AboutImages/SeaFuel_1216_075-compressed.webp",
    isLast: true,
  },
];

// Stats data for About page
const aboutStats = [
  { value: '500+',   label: 'Projects Delivered', suffix: '+' },
  { value: '18',     label: 'Years Experience', suffix: '' },
  { value: '98%',    label: 'Client Satisfaction', suffix: '%' },
  { value: '£120M+', label: 'Value Fitted Out', suffix: 'M+' },
  { value: '50+',    label: 'Expert Team Members', suffix: '+' },
  { value: '25+',    label: 'Industry Awards', suffix: '+' },
];

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    const num = parseInt(target.replace(/[^\d]/g, ''), 10);
    if (!num) return;
    
    let current = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);
    
    return () => clearInterval(timer);
  }, [start, target, duration]);
  
  return count;
}

// Stat item component - REDUCED SIZE
function StatItem({ stat, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const num = parseInt(stat.value.replace(/[^\d]/g, ''), 10);
  const prefix = stat.value.match(/^[^\d]*/)?.[0] ?? '';
  const count = useCounter(stat.value, 2000, isVisible);
  const display = num ? `${prefix}${count}${stat.suffix}` : stat.value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-center px-2 md:px-4"
    >
      {/* REDUCED: text-2xl md:text-3xl instead of text-4xl md:text-5xl lg:text-6xl */}
      <div className="text-1xl md:text-1xl font-bold text-orange-500 mb-0 font-serif">
        {display}
      </div>
      {/* REDUCED: text-xs md:text-sm instead of text-sm md:text-base */}
      <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-white relative z-10" style={{ marginTop: 0, paddingTop: 0 }}>
      
      {/* HERO - REDUCED PADDING */}
      <div className="relative py-8 md:py-12 px-6 md:px-20 text-center bg-gradient-to-b from-gray-50 to-white" style={{ marginTop: 0 }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-wide text-gray-900"
        >
          ABOUT <span className="text-orange-500">SHOPFITTING SOLUTIONS</span>
        </motion.h1>

        <div className="w-20 h-1 bg-orange-500 mx-auto mt-4" />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg leading-relaxed"
        >
          We create premium retail environments that combine design, functionality, and quality execution.
          Our goal is to transform commercial spaces into modern, efficient, and visually engaging experiences.
        </motion.p>
      </div>

      {/* STATS SECTION - REDUCED SIZE */}
      {/* REDUCED: py-8 md:py-10 instead of py-12 md:py-16 */}
      <div className="py-8 md:py-10 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* REDUCED: gap-6 md:gap-3 instead of gap-8 md:gap-4 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-3">
            {aboutStats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      {sections.map((section, index) => (
        <div key={index} className="grid md:grid-cols-2">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`h-[350px] md:h-[450px] overflow-hidden group relative ${
              index % 2 !== 0 ? "md:order-2" : ""
            }`}
          >
            {section.image ? (
              <img
                src={section.image}
                alt={section.title}
                loading="lazy"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm md:text-lg">
                Add Image Here
              </div>
            )}
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center bg-gray-100 px-8 md:px-16 py-16"
          >
            <div>
              <h2 className="text-xl md:text-3xl font-semibold text-orange-500 mb-4">
                {section.title}
              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {section.text}
              </p>

              {section.isLast && (
                <>
                  <ul className="text-gray-700 mb-6 space-y-1">
                    <li>• Quality Assurance Certified</li>
                    <li>• Experienced Professionals</li>
                    <li>• Reliable Project Delivery</li>
                    <li>• Scalable Solutions</li>
                  </ul>

                  <a
                    href="#contact"
                    className="border border-gray-400 px-6 py-2 text-sm tracking-wide hover:bg-orange-500 hover:text-white transition hover:scale-105 inline-block"
                  >
                    CONTACT SHOPFITTING SOLUTIONS
                  </a>
                </>
              )}
            </div>
          </motion.div>
        </div>
      ))}

    </section>
  );
}