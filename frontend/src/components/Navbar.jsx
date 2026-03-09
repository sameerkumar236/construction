import { useState } from "react";
import { FaBars, FaTimes, FaArrowRight, FaTachometerAlt } from "react-icons/fa";
import { NAV_LINKS } from "../data/dummydata";
import logo from "../assets/construction.png";

// Props:
//  activeSection  - currently active section string
//  onScrollTo     - fn(sectionId) to scroll
//  user           - user object if logged in, null if not
//  onDashboard    - fn() to navigate to dashboard
//  onLoginClick   - fn() to navigate to login/auth page

export default function Navbar({ activeSection, onScrollTo, user, onDashboard, onLoginClick }) {
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
          <img src={logo} alt="AV Construction Logo" className="w-10 h-10 object-contain" />
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
              <span
                className="absolute -bottom-1 left-0 h-0.5 bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: activeSection === l.id ? "100%" : 0 }}
              />
            </button>
          ))}

          {/* ── Dashboard / Auth Button ── */}
          {user ? (
            // Logged in → show Dashboard button
            <button
              onClick={onDashboard}
              className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-lg font-semibold text-[13px] cursor-pointer hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
            >
              <FaTachometerAlt size={12} />
              Dashboard
            </button>
          ) : (
            // Not logged in → show Login button
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 bg-transparent border border-white/15 text-gray-400 px-4 py-2 rounded-lg font-semibold text-[13px] cursor-pointer hover:text-white hover:border-white/30 transition-all"
            >
              Admin Login
            </button>
          )}

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

          {/* Mobile Dashboard / Login */}
          <div className="border-t border-white/[0.07] pt-3 flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => { onDashboard(); setNavOpen(false); }}
                className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2.5 rounded-lg font-semibold text-[14px] cursor-pointer"
              >
                <FaTachometerAlt size={13} /> Dashboard
              </button>
            ) : (
              <button
                onClick={() => { onLoginClick(); setNavOpen(false); }}
                className="flex items-center gap-2 border border-white/15 text-gray-400 px-4 py-2.5 rounded-lg font-semibold text-[14px] cursor-pointer"
              >
                Admin Login
              </button>
            )}
            <button
              onClick={() => handleNav("contact")}
              className="bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] px-4 py-2.5 rounded-lg font-bold text-[14px] cursor-pointer flex items-center gap-2 justify-center"
            >
              Get Quote <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}