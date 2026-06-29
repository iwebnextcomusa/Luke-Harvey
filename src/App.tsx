import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import MusicSection from "./components/MusicSection";
import EventsSection from "./components/EventsSection";
import Interactive3D from "./components/Interactive3D";
import GallerySection from "./components/GallerySection";
import VideosSection from "./components/VideosSection";
import ContactSection from "./components/ContactSection";
import ChatbotWidget from "./components/ChatbotWidget";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Intersection Observer to highlight active navigation tab as the user scrolls
  useEffect(() => {
    const sections = ["home", "about", "music", "events", "gallery", "videos", "contact"];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        {
          rootMargin: "-25% 0px -65% 0px" // Triggers when the section dominates the viewport middle
        }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-sedona-dark text-sedona-sand selection:bg-sedona-orange/30 selection:text-sedona-sand antialiased overflow-x-hidden">
      {/* 1. Transparent Floating Header */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* 2. Main Sections */}
      <main className="relative z-10" id="main-content-flow">
        
        {/* Hero Section */}
        <Hero onNavigate={setActiveSection} />

        {/* Biography Section */}
        <AboutSection />

        {/* Music Player & Streaming Section */}
        <MusicSection />

        {/* Gig Calendar Section */}
        <EventsSection />

        {/* Interactive Three.js 3D Section */}
        <Interactive3D />

        {/* Masonry Image Gallery Section */}
        <GallerySection />

        {/* Video Performance Grid Section */}
        <VideosSection />

        {/* Contact form & Google Sedona Map Section */}
        <ContactSection />

      </main>

      {/* 3. Global Floating Action Widgets */}
      <ChatbotWidget />
      <ScrollToTop />

      {/* 4. Footer & iWebNext Attribution */}
      <Footer onNavigate={setActiveSection} />
    </div>
  );
}
