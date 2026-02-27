import { FaArrowRight, FaCalculator } from "react-icons/fa";
import { STATS } from "../data/dummydata";

export default function HeroSection({ onScrollTo }) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16"
      style={{
        background: `
          linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(10,10,10,1) 100%),
          url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=80') center/cover no-repeat
        `,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* ── Left – Headline ── */}
        <div className="animate-[fadeUp_0.7s_ease_forwards]">
          <span className="block text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-3">
            Since 1998 · Award-Winning Construction
          </span>

          <h1
            className="text-white leading-[0.9] mb-6"
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(64px,10vw,110px)" }}
          >
            WE BUILD
            <br />
            <span className="text-amber-500">THE FUTURE</span>
          </h1>

          <p className="text-gray-300 text-[17px] leading-[1.7] max-w-[420px] mb-8">
            From commercial towers to luxury residences, BuildCraft delivers
            precision engineering and timeless architecture across North America.
          </p>

          <div className="flex flex-wrap gap-3">
            {/* Primary CTA */}
            <button
              onClick={() => onScrollTo("projects")}
              className="bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] px-7 py-3.5 rounded-[10px] font-bold text-sm cursor-pointer flex items-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all border-none"
            >
              View Projects <FaArrowRight />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => onScrollTo("calculator")}
              className="bg-white/[0.06] border border-white/[0.15] text-white px-7 py-3.5 rounded-[10px] font-medium text-sm cursor-pointer flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <FaCalculator /> Cost Calculator
            </button>
          </div>
        </div>

        {/* ── Right – Stat Cards ── */}
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-amber-500/[0.06] border border-amber-500/[0.15] rounded-2xl px-5 py-6 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)]"
            >
              <div
                className="text-amber-500"
                style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 48 }}
              >
                {s.n}
              </div>
              <div className="text-gray-500 text-[13px] mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}