import {
  FaBuilding,
  FaHome,
  FaTools,
  FaWrench,
} from "react-icons/fa";
import { MdConstruction, MdSecurity } from "react-icons/md";
import { SERVICES_DATA } from "../data/servicesdata";

const ICON_MAP = {
  building:     <FaBuilding size={28} />,
  home:         <FaHome size={28} />,
  construction: <MdConstruction size={28} />,
  tools:        <FaTools size={28} />,
  wrench:       <FaWrench size={28} />,
  security:     <MdSecurity size={28} />,
};

export default function ServicesSection() {
  return (
    <section
      id="services"
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
          What We Do
        </span>
        <h2
          className="text-white mb-2"
          style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,6vw,72px)" }}
        >
          OUR <span className="text-amber-500">SERVICES</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-12" />

        {/* Grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {SERVICES_DATA.map((s, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)]"
            >
              <div className="text-amber-500 mb-4 inline-block">
                {ICON_MAP[s.iconKey]}
              </div>

              <h3 className="font-semibold text-[17px] text-white mb-2">{s.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>

              <span className="bg-amber-500/[0.12] border border-amber-500/30 text-amber-500 text-[11px] px-3 py-0.5 rounded-full font-semibold inline-block">
                {s.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}