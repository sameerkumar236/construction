  import { useState,useEffect } from 'react'
  import reactLogo from './assets/react.svg'

import './App.css'

import Navbar            from "./components/Navbar";
import HeroSection       from "./components/HeroSection";
import ServicesSection   from "./components/ServiceSection";
import ProjectsSection   from "./components/ProjectSection";
import CalculatorSection from "./components/Calculatorsection";
import WhyUsSection      from "./components/Whyussection ";
import TeamSection       from "./components/Teamsection ";
import TestimonialsSection from "./components/Testimonialssection";
import CTABanner         from "./components/Ctabanner";
import ContactSection    from "./components/Contactsection";
import Footer            from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // ── Smooth scroll helper ──────────────────────────────────────────────────
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Intersection Observer – highlights active nav link ───────────────────
  useEffect(() => {
    const ids = [
      "home", "services", "projects", "calculator",
      "team", "testimonials", "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <Navbar activeSection={activeSection} onScrollTo={scrollTo} />

      <HeroSection       onScrollTo={scrollTo} />
      <ServicesSection   />
      <div className="divider" />
      <ProjectsSection   />
      <CalculatorSection onScrollTo={scrollTo} />
      <WhyUsSection      />
      <TeamSection       />
      <TestimonialsSection />
      <CTABanner         onScrollTo={scrollTo} />
      <ContactSection    />
      <Footer            />
    </div>
  );
}