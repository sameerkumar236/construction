import { FaArrowRight } from "react-icons/fa";

export default function CTABanner({ onScrollTo }) {
  return (
    <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-20 px-6 text-center">
      <div className="max-w-[800px] mx-auto">
        <h2
          className="text-[#111] mb-4"
          style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px,8vw,90px)" }}
        >
          READY TO BUILD?
        </h2>

        <p className="text-[#333] text-[17px] mb-7">
          Let's discuss your project. Our experts are ready to bring your vision to life.
        </p>

        <button
          onClick={() => onScrollTo("contact")}
          className="bg-[#111] text-amber-500 border-none px-8 py-3.5 rounded-[10px] font-bold text-[15px] cursor-pointer inline-flex items-center gap-2 hover:bg-[#1a1a1a] transition-colors"
        >
          Start Your Project <FaArrowRight />
        </button>
      </div>
    </section>
  );
}