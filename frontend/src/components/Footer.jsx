import { FaHardHat } from "react-icons/fa";

const FOOTER_LINKS = ["Privacy", "Terms", "Sitemap"];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between items-center gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[7px] bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <FaHardHat size={14} color="#111" />
          </div>
          <span
            className="text-white tracking-[0.12em]"
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22 }}
          >
            BUILD<span className="text-amber-500">CRAFT</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-[#444] text-[13px]">
          © 2025 BuildCraft Construction. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex gap-5 text-[13px]">
          {FOOTER_LINKS.map((l) => (
            <span
              key={l}
              className="text-gray-600 cursor-pointer hover:text-amber-500 transition-colors"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}