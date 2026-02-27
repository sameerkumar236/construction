import { FaAward } from "react-icons/fa";
import { MdSpeed, MdSecurity } from "react-icons/md";
import { WHY_US } from "../data/dummydata";

const ICONS = [
  <MdSpeed size={32} />,
  <FaAward size={32} />,
  <MdSecurity size={32} />,
];

export default function WhyUsSection() {
  return (
    <section className="py-[72px] px-6 bg-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-10">
        {WHY_US.map((w, i) => (
          <div key={i} className="flex gap-[18px] items-start w-[280px]">
            <div className="text-amber-500 mt-0.5 shrink-0">
              {ICONS[i]}
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">{w.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{w.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}