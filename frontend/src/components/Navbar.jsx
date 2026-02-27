import { useState } from "react";
import { FaHardHat, FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { NAV_LINKS } from "../data/dummydata";
import logo from "../assets/construction.png"

export default function Navbar({ activeSection, onScrollTo }) {
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = (id) => {
    onScrollTo(id);
    setNavOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.92)] backdrop-blur-md border-b border-white/[0.06]">

      {/* ── Desktop Row ── */}
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
       <div className="flex items-center gap-2.5">
  <img 
    src={logo} 
    alt="AV Construction Logo"
    className="w-10 h-10 object-contain"
  />
  <span
    className="text-white tracking-[0.12em]"
    style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26 }}
  >
    AV<span className="text-amber-500"> Construction</span>
  </span>
</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className={`relative bg-transparent border-none cursor-pointer text-sm font-medium py-1 transition-colors ${
                activeSection === l.id ? "text-amber-500" : "text-gray-400 hover:text-white"
              }`}
            >
              {l.label}
              {/* Active underline */}
              <span
                className="absolute -bottom-1 left-0 h-0.5 bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: activeSection === l.id ? "100%" : 0 }}
              />
            </button>
          ))}

          {/* Get Quote CTA */}
          <button
            onClick={() => handleNav("contact")}
            className="bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] px-5 py-2.5 rounded-lg font-bold text-[13px] cursor-pointer flex items-center gap-1.5 border-none hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            Get Quote <FaArrowRight size={11} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden bg-transparent border-none text-gray-400 cursor-pointer"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {navOpen && (
        <div className="md:hidden bg-[#111] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className={`bg-transparent border-none cursor-pointer text-[15px] font-medium text-left py-1 transition-colors ${
                activeSection === l.id ? "text-amber-500" : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}