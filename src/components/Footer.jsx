import { FaHardHat } from "react-icons/fa";
import logo from "../components/construction.png"

const FOOTER_LINKS = ["Privacy", "Terms", "Sitemap"];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between items-center gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
  <img 
    src={logo} 
    alt="AV Construction Logo"
    className="w-10 h-10 object-contain"
  />
  <span
    className="text-white tracking-[0.12em]"
    style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22 }}
  >
    AV<span className="text-amber-500"> Construction</span>
  </span>
</div>
        {/* Copyright */}
        <p className="text-[#444] text-[13px]">
          © 2025 AV Construction. All rights reserved.
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