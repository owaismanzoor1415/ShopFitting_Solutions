import {
  MessageSquare, Pencil, ClipboardCheck, Hammer, CheckCircle
} from 'lucide-react';

import { ArrowRight } from "lucide-react";
const steps = [
  {
    num: "01",
    title: "Consultation & Discovery",
    desc: "Understanding your brand, goals, and retail vision through detailed discussions.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "Concept & Design",
    desc: "Creating layouts, mood boards, and visual concepts tailored to your space.",
    icon: Pencil,
  },
  {
    num: "03",
    title: "Planning & Approval",
    desc: "Detailed drawings, budgeting, and approvals to ensure clarity before execution.",
    icon: ClipboardCheck,
  },
  {
    num: "04",
    title: "Manufacturing & Joinery",
    desc: "Custom fabrication of fixtures, cabinetry, and display units with precision.",
    icon: Hammer,
  },
  {
    num: "05",
    title: "Installation & Execution",
    desc: "On-site installation managed by experts ensuring quality and efficiency.",
    icon: Hammer,
  },
  {
    num: "06",
    title: "Final Handover",
    desc: "Quality checks, finishing touches, and smooth delivery of your retail space.",
    icon: CheckCircle,
  },
];

export default function Process() {
  return (
    <section id="process" className="py-16 bg-gray-100">
      <div className="w-full px-0">

        {/* 🔥 HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-orange-500 font-semibold tracking-wide mb-3">
            OUR PROCESS
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Delivering Excellence <br />
            <span className="text-orange-500">Step by Step</span>
          </h2>

          <p className="text-lg text-gray-600">
            A refined and structured approach to transform your retail space
            from concept to completion with precision and care.
          </p>
        </div>

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 relative overflow-hidden"
              >

                {/* NUMBER BACKGROUND */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-gray-100 group-hover:text-orange-100 transition">
                  {step.num}
                </span>

                {/* ICON */}
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition">
                  <Icon className="w-6 h-6 text-orange-500 group-hover:text-white transition" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-500 transition">
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

        {/* 🔥 CONNECTOR LINE (PREMIUM TOUCH) */}
        <div className="hidden lg:block mt-16 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-40"></div>

        {/* 🔥 CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg transition"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}