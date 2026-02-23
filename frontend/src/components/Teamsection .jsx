import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { TEAM } from "../data/dummydata";

export default function TeamSection() {
  return (
    <section
      id="team"
      className="py-24 px-6 bg-[#111]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <span className="block text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-3">
          Our People
        </span>
        <h2
          className="text-white mb-2"
          style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,6vw,72px)" }}
        >
          MEET THE <span className="text-amber-500">TEAM</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-12" />

        {/* Grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {TEAM.map((m, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)]"
            >
              <img
                src={m.avatar}
                alt={m.name}
                className="w-[72px] h-[72px] rounded-full mx-auto mb-3.5 object-cover border-2 border-amber-500/35 block"
              />
              <h3 className="font-semibold text-white text-[15px]">{m.name}</h3>
              <p className="text-amber-500 text-[13px] mt-1">{m.role}</p>
              <p className="text-gray-600 text-xs mt-0.5">{m.exp} experience</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}