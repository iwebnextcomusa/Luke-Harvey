import { useState, useEffect } from "react";
import { Menu, X, Music, Phone } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "music", label: "Music" },
    { id: "events", label: "Events" },
    { id: "gallery", label: "Gallery" },
    { id: "videos", label: "Videos" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to the component with that ID
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-sedona-dark/90 backdrop-blur-md border-b border-sedona-clay/20 py-4 shadow-lg shadow-black/30"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-2 text-left focus:outline-none group cursor-pointer"
          id="btn-nav-logo"
        >
          <div className="p-2 bg-sedona-clay/20 rounded border border-sedona-orange/30 group-hover:border-sedona-red/80 transition-colors">
            <Music className="w-6 h-6 text-sedona-orange group-hover:text-sedona-red transition-colors" />
          </div>
          <div>
            <span className="block font-serif text-xl tracking-widest text-sedona-sand group-hover:text-sedona-orange transition-colors">
              LUKE HARVEY
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-sedona-copper/70 font-mono">
              Sedona Musician
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" id="nav-desktop">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-md transition-all duration-300 cursor-pointer ${
                activeSection === item.id
                  ? "text-sedona-orange font-semibold bg-sedona-clay/10 border border-sedona-orange/25"
                  : "text-sedona-sand/80 hover:text-sedona-orange hover:bg-sedona-charcoal/30 border border-transparent"
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="tel:928-300-7747"
            className="ml-4 px-4 py-2 bg-sedona-red hover:bg-sedona-orange text-sedona-sand text-xs font-mono uppercase tracking-widest rounded-md transition-all duration-300 flex items-center space-x-2 shadow-md shadow-sedona-red/10 border border-sedona-orange/20"
            id="nav-call-btn"
          >
            <Phone className="w-3 h-3" />
            <span>Call</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-sedona-sand hover:text-sedona-orange focus:outline-none border border-sedona-clay/20 rounded bg-sedona-charcoal/50"
          aria-label="Toggle navigation menu"
          id="btn-mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-sedona-orange" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 top-[72px] bg-sedona-dark/95 backdrop-blur-lg z-40 md:hidden transition-transform duration-300 transform border-t border-sedona-clay/20 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="nav-mobile"
      >
        <div className="flex flex-col p-8 space-y-4 h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-4 px-6 font-mono text-sm uppercase tracking-widest rounded border transition-all duration-300 cursor-pointer ${
                activeSection === item.id
                  ? "text-sedona-orange bg-sedona-clay/20 border-sedona-orange/30 font-semibold pl-8"
                  : "text-sedona-sand/80 hover:text-sedona-orange hover:bg-sedona-charcoal/50 border-transparent"
              }`}
              id={`mobile-nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-6 border-t border-sedona-clay/20 flex flex-col space-y-4">
            <a
              href="tel:928-300-7747"
              className="py-4 text-center bg-sedona-red hover:bg-sedona-orange text-sedona-sand text-sm font-mono uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              id="mobile-nav-call-btn"
            >
              <Phone className="w-4 h-4" />
              <span>928-300-7747</span>
            </a>
            <div className="text-center font-mono text-[10px] text-sedona-copper/50">
              davidrrfd@yahoo.com
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
