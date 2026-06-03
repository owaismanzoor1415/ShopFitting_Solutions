import {
  MessageSquare, Pencil, ClipboardCheck, Hammer, CheckCircle
} from 'lucide-react';
import { ArrowRight } from "lucide-react";
import { useAdminData } from '../admin/context/AdminDataContext';

const iconComponentMap = {
  'message-square': MessageSquare,
  pencil: Pencil,
  'clipboard-check': ClipboardCheck,
  hammer: Hammer,
  'check-circle': CheckCircle,
};

export default function Process() {
  const { data } = useAdminData();
  const processSteps = data.processSteps || [];

  return (
    <section id="process" className="py-16" style={{ background: '#f5f5ff' }}>
      <div className="w-full px-0">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="font-semibold tracking-wide mb-3" style={{ color: '#CC0001' }}>
            OUR PROCESS
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Delivering Excellence <br />
            <span style={{ color: '#CC0001' }}>Step by Step</span>
          </h2>

          <p className="text-lg text-gray-600">
            A refined and structured approach to transform your retail space
            from concept to completion with precision and care.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {processSteps.map((step, index) => {
            const Icon = iconComponentMap[step.icon] || MessageSquare;
            return (
              <div
                key={step.num}
                className="group bg-white p-8 rounded-2xl transition-all duration-300 relative overflow-hidden"
                style={{ border: '1px solid rgba(0,0,128,0.08)', boxShadow: '0 1px 4px rgba(0,0,128,0.06)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(204,0,1,0.18)'; e.currentTarget.style.borderColor = 'rgba(204,0,1,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,128,0.06)'; e.currentTarget.style.borderColor = 'rgba(0,0,128,0.08)'; }}
              >
                {/* NUMBER BACKGROUND */}
                <span className="absolute top-6 right-6 text-5xl font-bold transition" style={{ color: 'rgba(0,0,128,0.05)' }}>
                  {step.num}
                </span>

                {/* ICON */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition"
                  style={{ background: 'rgba(204,0,1,0.08)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#CC0001'; e.currentTarget.querySelector('svg').style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(204,0,1,0.08)'; e.currentTarget.querySelector('svg').style.color = '#CC0001'; }}
                >
                  <Icon className="w-6 h-6 transition" style={{ color: '#CC0001' }} />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#CC0001] transition">
                  {step.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CONNECTOR LINE */}
        <div className="hidden lg:block mt-16 h-[2px] opacity-30" style={{ background: 'linear-gradient(to right, transparent, #CC0001 25%, #FFCD00 75%, transparent)' }} />

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full shadow-lg transition"
            style={{ background: 'linear-gradient(135deg, #CC0001, #a80001)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #00308F, #1a1a8e)'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, #CC0001, #a80001)'}
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
