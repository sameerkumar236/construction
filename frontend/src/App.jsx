import { useState, useEffect } from 'react'
import './App.css'

import { useAuth } from './context/AuthContext.jsx'

import Navbar              from "./components/Navbar";
import HeroSection         from "./components/HeroSection";
import ServicesSection     from "./components/ServiceSection";
import ProjectsSection     from "./components/ProjectSection";
import CalculatorSection   from "./components/Calculatorsection";
import WhyUsSection        from "./components/Whyussection ";
import TeamSection         from "./components/Teamsection ";
import TestimonialsSection from "./components/Testimonialssection";
import CTABanner           from "./components/Ctabanner";
import ContactSection      from "./components/Contactsection ";
import Footer              from "./components/Footer";
import AuthPage            from "./Pages/AuthPage";
import Dashboard           from "./Pages/Dashboard";

// ── URL helpers ───────────────────────────────────────────────────────────────
const getPageFromPath = () => {
  const path = window.location.pathname;
  if (path === "/dashboard") return "dashboard";
  if (path === "/login")     return "auth";
  return "home";
};

const navigate = (page) => {
  const pathMap = { home: "/", auth: "/login", dashboard: "/dashboard" };
  window.history.pushState({ page }, "", pathMap[page] || "/");
};

export default function App() {
  const { user, checkingAuth, login, logout } = useAuth();

  const [activeSection, setActiveSection] = useState("home");
  const [page,          setPage]          = useState(getPageFromPath);

  const goTo = (p) => { navigate(p); setPage(p); };

  // ── Browser back/forward ──────────────────────────────────────────────────
  useEffect(() => {
    const onPop = () => setPage(getPageFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // ── Intersection Observer ─────────────────────────────────────────────────
  useEffect(() => {
    if (page !== "home") return;
    const ids = ["home", "services", "projects", "calculator", "team", "testimonials", "contact"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [page]);

  // ── Scroll helper ─────────────────────────────────────────────────────────
  const scrollTo = (id) => {
    if (page !== "home") {
      goTo("home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }, 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleAuthSuccess = (userData) => {
    login(userData);   // sets user in context (no localStorage)
    goTo("dashboard");
  };

  const handleLogout = async () => {
    await logout();    // clears cookie via server + sets user null in context
    goTo("home");
  };

  // ── Loading splash ────────────────────────────────────────────────────────
  if (checkingAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 28, height: 28, border: "2px solid rgba(245,158,11,0.2)", borderTop: "2px solid #f59e0b", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (page === "auth") return <AuthPage onAuthSuccess={handleAuthSuccess} />;

  if (page === "dashboard") {
    if (!user) { goTo("auth"); return null; }
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <Navbar
        activeSection={activeSection}
        onScrollTo={scrollTo}
        user={user}
        onDashboard={() => goTo("dashboard")}
        onLoginClick={() => goTo("auth")}
      />
      <HeroSection         onScrollTo={scrollTo} />
      <ServicesSection     />
      <div className="divider" />
      <ProjectsSection     />
      <CalculatorSection   onScrollTo={scrollTo} />
      <WhyUsSection        />
      <TeamSection         />
      <TestimonialsSection />
      <CTABanner           onScrollTo={scrollTo} />
      <ContactSection      />
      <Footer              />
    </div>
  );
}