import { Play, Calendar, Mail } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const handleCtaClick = (sectionId: string) => {
    onNavigate(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sedona-dark pt-20"
    >
      {/* Background Image with Fallback and Sedona Terracotta Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/luke_harvey_hero_1782764440399.jpg"
          alt="Luke Harvey Sedona Hero sunset"
          className="w-full h-full object-cover scale-105 animate-[pulse_8s_infinite] opacity-60 md:opacity-75 transition-opacity duration-1000"
          referrerPolicy="no-referrer"
          id="hero-bg-img"
        />
        {/* Modern multi-layer gradient overlays to create a cohesive Sedona glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-sedona-dark via-sedona-dark/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-sedona-dark/90 via-transparent to-sedona-dark/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-sedona-clay/15 via-transparent to-sedona-dark/95 mix-blend-color-burn"></div>
      </div>

      {/* Floating subtle desert elements / ambient particles container */}
      <div className="absolute inset-0 z-1 pointer-events-none" id="hero-particles">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-sedona-orange/5 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sedona-red/5 rounded-full filter blur-[150px] animate-pulse delay-1000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-10 pb-20">
        {/* Subtle upper-headline tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sedona-clay/30 border border-sedona-orange/30 rounded-full mb-6 shadow-lg backdrop-blur-sm animate-[fadeIn_1.2s_ease-out]">
          <span className="w-1.5 h-1.5 rounded-full bg-sedona-orange animate-ping"></span>
          <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-sedona-sand/90">
            Acoustic Folk-Rock &bull; Sedona, Arizona
          </span>
        </div>

        {/* Master Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tight leading-tight text-sedona-sand mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sedona-sand via-sedona-copper to-sedona-orange">
            LUKE HARVEY
          </span>
        </h1>

        {/* Short Artist Introduction */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-sedona-sand/85 font-sans font-light tracking-wide leading-relaxed mb-12">
          Crafting authentic folk acoustic melodies inspired by the deep red sandstone canyons, 
          shimmering desert heat, and ancient spiritual winds of Sedona. Discover warm, 
          handcrafted music direct from the heart of the Southwest.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => handleCtaClick("music")}
            className="w-full sm:w-auto px-8 py-4 bg-sedona-red hover:bg-sedona-orange text-sedona-sand font-mono text-sm uppercase tracking-widest rounded-md transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-sedona-red/25 hover:shadow-sedona-orange/30 border border-sedona-orange/10 cursor-pointer"
            id="hero-btn-music"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Listen Music</span>
          </button>
          
          <button
            onClick={() => handleCtaClick("events")}
            className="w-full sm:w-auto px-8 py-4 bg-sedona-charcoal/60 hover:bg-sedona-warm-gray text-sedona-sand border border-sedona-clay/40 hover:border-sedona-orange/50 font-mono text-sm uppercase tracking-widest rounded-md transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm cursor-pointer"
            id="hero-btn-events"
          >
            <Calendar className="w-4 h-4 text-sedona-orange" />
            <span>Upcoming Shows</span>
          </button>

          <button
            onClick={() => handleCtaClick("contact")}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-sedona-clay/20 text-sedona-copper hover:text-sedona-orange font-mono text-sm uppercase tracking-widest rounded-md transition-all duration-300 flex items-center justify-center space-x-2 border border-transparent cursor-pointer"
            id="hero-btn-contact"
          >
            <Mail className="w-4 h-4" />
            <span>Booking</span>
          </button>
        </div>

        {/* Elegant downward transition detail */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-6 h-10 rounded-full border border-sedona-copper flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-sedona-orange rounded-full animate-[scroll_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
