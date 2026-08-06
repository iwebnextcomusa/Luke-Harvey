import { useState, useRef } from "react";
import { Play, Calendar, Mail, Volume2, VolumeX } from "lucide-react";
import heroImg from "../assets/images/luke_harvey_hero_1782764440399.jpg";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const HERO_VIDEO_URL = "https://nu4vmjwwlctw3mhe.public.blob.vercel-storage.com/Create_video_for_crafting_melodies_202608070420.mp4";

export default function Hero({ onNavigate }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
      {/* Background Video with Fallback Poster and Sedona Terracotta Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          poster={heroImg || "/images/luke_harvey_hero_1782764440399.jpg"}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-65 md:opacity-80 transition-opacity duration-1000"
          id="hero-bg-video"
        />
        {/* Modern multi-layer gradient overlays to create a cohesive Sedona glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-sedona-dark via-sedona-dark/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-sedona-dark/90 via-transparent to-sedona-dark/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-sedona-clay/15 via-transparent to-sedona-dark/95 mix-blend-color-burn"></div>
      </div>

      {/* Audio Mute / Unmute Toggle Button */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={toggleMute}
          className="flex items-center space-x-2 px-3.5 py-2 bg-sedona-dark/80 hover:bg-sedona-charcoal text-sedona-sand border border-sedona-clay/30 hover:border-sedona-orange/50 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 cursor-pointer group"
          title={isMuted ? "Unmute video audio" : "Mute video audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          id="hero-mute-toggle-btn"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-sedona-orange animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-sedona-copper group-hover:text-sedona-sand">
                Sound Off
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-green-400" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-sedona-sand">
                Sound On
              </span>
            </>
          )}
        </button>
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
