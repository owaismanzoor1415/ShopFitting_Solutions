import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const sections = [
  {
    title: "Premium Retail Design",
    text: "We specialize in designing premium retail environments that enhance customer experience and maximize product visibility.Our shopfitting solutions combine aesthetics with functionality to create visually stunning and practical spaces.",
    image: "/AboutImages/PTC_GC_160418_003.jpg",
  },
  {
    title: "Smart Space Planning",
    text: "Our team focuses on intelligent space planning to ensure efficient layouts that improve customer flow and product accessibility.Every design is optimized for both performance and visual appeal.",
    image: "/AboutImages/Famous_PF_0616_0054.jpg",
  },
  {
    title: "Custom Fit-Out Solutions",
    text: "We deliver custom fit-out solutions tailored to your business needs, whether it's retail stores, kiosks, or commercial spaces.Each project is crafted with precision and attention to detail.",
    image: "/AboutImages/ID_DL_0624_0104.jpg",
  },
  {
    title: "Execution & Quality Delivery",
    text: "From concept to completion, we ensure high-quality execution using skilled professionals and modern construction techniques.We are committed to delivering projects on time without compromising quality.",
    image: "/AboutImages/SeaFuel_1216_075.jpg",
    isLast: true,
  },
];

  return (
    <section id="about" className="bg-white">

      {/* 🔥 HERO (CLEAN WHITE / GREY SINGLE FLOW) */}
<div className="relative py-24 px-6 md:px-20 text-center bg-gradient-to-b from-gray-50 to-white">

  <motion.h1
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-3xl md:text-5xl font-bold tracking-wide text-gray-900"
  >
    ABOUT <span className="text-orange-500">SHOPFITTING SOLUTIONS</span>
  </motion.h1>

  {/* Line */}
  <div className="w-20 h-1 bg-orange-500 mx-auto mt-6"></div>

  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg leading-relaxed"
  >
    We create premium retail environments that combine design, functionality, and quality execution. 
    Our goal is to transform commercial spaces into modern, efficient, and visually engaging experiences.
  </motion.p>

</div>

      {/* 🔥 SECTIONS */}
      {sections.map((section, index) => (
        <div key={index} className="grid md:grid-cols-2">

          {/* 🔥 IMAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`h-[350px] md:h-[450px] overflow-hidden group relative ${
              index % 2 !== 0 ? "md:order-2" : ""
            }`}
          >
            {/* IMAGE */}
            {section.image ? (
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm md:text-lg">
                Add Image Here
              </div>
            )}
          </motion.div>

          {/* 🔥 TEXT */}
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

              {/* 🔥 LAST SECTION CTA */}
              {section.isLast && (
                <>
                  <ul className="text-gray-700 mb-6 space-y-0">
                    <li>• Quality Assurance Certified</li>
                    <li>• Experienced Professionals</li>
                    <li>• Reliable Project Delivery</li>
                    <li>• Scalable Solutions</li>
                  </ul>

                  <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="border border-gray-400 px-6 py-2 text-sm tracking-wide hover:bg-orange-500 hover:text-white transition hover:scale-105"
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
