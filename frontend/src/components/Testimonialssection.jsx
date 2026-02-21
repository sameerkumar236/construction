import { FaStar } from "react-icons/fa";
import { TESTIMONIALS } from "../data/dummydata";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <span className="block text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-3">
          Client Reviews
        </span>
        <h2
          className="text-white mb-2"
          style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,6vw,72px)" }}
        >
          WHAT CLIENTS <span className="text-amber-500">SAY</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-12" />

        {/* Grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)]"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} size={14} className="text-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-500 text-sm leading-[1.7] mb-5 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#333] shrink-0"
                />
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}