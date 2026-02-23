import { FaMapMarkerAlt, FaRulerCombined, FaStar } from "react-icons/fa";
import { PROJECTS } from "../data/dummydata";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <span className="block text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-3">
          Portfolio
        </span>
        <h2
          className="text-white mb-2"
          style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,6vw,72px)" }}
        >
          FEATURED <span className="text-amber-500">PROJECTS</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-12" />

        {/* Grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)]"
            >
              {/* Image */}
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.08]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                    p.status === "Completed"
                      ? "bg-green-500/85 text-white"
                      : "bg-amber-500/90 text-[#111]"
                  }`}
                >
                  {p.status}
                </span>

                {/* Type Tag */}
                <div className="absolute bottom-2.5 left-3.5">
                  <span className="bg-amber-500/[0.12] border border-amber-500/30 text-amber-500 text-[11px] px-3 py-0.5 rounded-full font-semibold">
                    {p.type}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-5 py-[18px]">
                <h3 className="font-semibold text-base text-white mb-1.5">{p.title}</h3>

                <p className="text-gray-600 text-[13px] flex items-center gap-1 mb-3">
                  <FaMapMarkerAlt size={11} /> {p.location}
                </p>

                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaRulerCombined size={11} /> {p.area.toLocaleString()} sqft
                  </span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <FaStar size={11} /> {p.rating}
                  </span>
                  <span>{p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}