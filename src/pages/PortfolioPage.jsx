import { useParams } from 'react-router-dom';
import { useState } from 'react'; // ✅ ADD THIS
import { portfolioDetail } from '../data/portfolioDetail';
import { ArrowRight } from 'lucide-react';

export default function PortfolioPage() {
  const [popupImg, setPopupImg] = useState(null);
  const { slug } = useParams();
  const project = portfolioDetail.find((p) => p.slug === slug);

  if (!project) return <div className="p-20 text-center">Project not found</div>;

  return (
    <section className="bg-white">

      {/* 🔥 HERO IMAGE */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-6 md:left-16 text-white max-w-3xl">
          <p className="uppercase text-orange-400 tracking-widest text-sm mb-3">
            {project.category} Project
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-white/80 max-w-xl">
            Designed to elevate brand presence and create an engaging retail experience.
          </p>
        </div>
      </div>

      {/* 🔥 PROJECT INFO */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">

        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Project Overview
          </h2>

          <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-8">
            {project.longDesc}
          </p>

          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Scope of Work
            </h3>

            <div className="flex flex-wrap gap-3">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Project Details
          </h3>

          <div className="space-y-4 text-sm text-gray-600">
            {project.stats.map((s) => (
              <div key={s.label} className="flex justify-between border-b pb-2">
                <span className="font-medium">{s.label}</span>
                <span>{s.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              window.location.href = '/#contact';
            }}
            className="mt-8 inline-flex items-center justify-center w-full px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Start Similar Project <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* 🔥 IMAGE GALLERY */}
        <div className="w-full pb-1">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Project Gallery
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {project.images.map((img, i) => (
            <div
              key={i}
              className="gallery-item overflow-hidden rounded-2xl"
              onClick={() => setPopupImg(img)}
            >
              <img
                src={img}
                alt=""
                className="w-full h-[350px] object-cover block"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 IMAGE MODAL */}
      {popupImg && (
        <div className="image-modal" onClick={() => setPopupImg(null)}>
          <span className="image-modal-close">×</span>
          <img src={popupImg} alt="Preview" />
        </div>
      )}

      {/* 🔥 CTA */}
      <div className="bg-gray-900 text-white text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let’s Build Your Next Retail Space
        </h2>

        <p className="text-white/70 mb-8 max-w-xl mx-auto">
          From concept to completion, we deliver premium shopfitting solutions
          tailored to your brand and business goals.
        </p>

        <button
          onClick={() => {
            window.location.href = '/#contact';
          }}
          className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold transition"
        >
          Get a Free Consultation
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
}