import { Youtube, Music, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleQuickLinkClick = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sedona-dark text-sedona-sand/80 border-t border-sedona-clay/20 pt-16 pb-8 relative overflow-hidden" id="footer">
      {/* Visual background details */}
      <div className="absolute left-10 bottom-0 w-80 h-80 bg-sedona-red/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top footer deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="block font-serif text-2xl tracking-widest text-sedona-sand">
              LUKE HARVEY
            </span>
            <span className="block text-xs uppercase tracking-[0.2em] text-sedona-orange font-mono">
              Sedona's Acoustic Soul
            </span>
            <p className="text-xs text-sedona-sand/70 leading-relaxed max-w-sm mt-3">
              Crafting warm, authentic acoustic sessions and folk rock storytelling inspired by the towering red rock structures, dry desert breeze, and ancient Southwest culture.
            </p>
            {/* Social media icons */}
            <div className="flex items-center space-x-3 pt-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-sedona-charcoal/80 hover:bg-sedona-clay/20 border border-sedona-clay/20 hover:border-sedona-orange rounded-lg text-sedona-copper hover:text-sedona-orange transition-colors"
                aria-label="YouTube Channel"
                id="social-btn-yt"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-sedona-charcoal/80 hover:bg-sedona-clay/20 border border-sedona-clay/20 hover:border-sedona-orange rounded-lg text-sedona-copper hover:text-sedona-orange transition-colors"
                aria-label="Spotify Artist Page"
                id="social-btn-spotify"
              >
                <Music className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-sedona-charcoal/80 hover:bg-sedona-clay/20 border border-sedona-clay/20 hover:border-sedona-orange rounded-lg text-sedona-copper hover:text-sedona-orange transition-colors"
                aria-label="Instagram Profile"
                id="social-btn-ig"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-sedona-orange">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {["home", "about", "music", "events", "gallery", "videos", "contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleQuickLinkClick(link)}
                    className="hover:text-sedona-orange transition-colors uppercase tracking-widest font-mono text-[10px] cursor-pointer text-left focus:outline-none"
                    id={`footer-link-${link}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-sedona-orange">
              Location & Booking
            </h4>
            <div className="space-y-3.5 text-xs">
              <span className="flex items-start text-sedona-sand/85 leading-snug">
                <MapPin className="w-4 h-4 mr-2.5 text-sedona-orange flex-shrink-0 mt-0.5" />
                <span>Sedona, Arizona, USA</span>
              </span>
              
              <a
                href="tel:928-300-7747"
                className="flex items-center text-sedona-sand/85 hover:text-sedona-orange transition-colors"
                id="footer-phone"
              >
                <Phone className="w-4 h-4 mr-2.5 text-sedona-orange flex-shrink-0" />
                <span>928-300-7747</span>
              </a>

              <a
                href="mailto:davidrrfd@yahoo.com"
                className="flex items-center text-sedona-sand/85 hover:text-sedona-orange transition-colors break-all"
                id="footer-email"
              >
                <Mail className="w-4 h-4 mr-2.5 text-sedona-orange flex-shrink-0" />
                <span>davidrrfd@yahoo.com</span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter signup (3 cols) */}
          <div className="lg:col-span-3 space-y-4" id="footer-newsletter">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-sedona-orange">
              Newsletter List
            </h4>
            <p className="text-[11px] text-sedona-sand/70 leading-relaxed">
              Sign up with your email to receive occasional updates regarding tour dates and music releases.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to Luke Harvey's newsletter!");
                (e.target as HTMLFormElement).reset();
              }}
              className="flex items-center space-x-1.5"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full px-3.5 py-2 bg-sedona-dark border border-sedona-clay/20 focus:border-sedona-orange rounded focus:outline-none text-[11px] font-sans text-sedona-sand"
              />
              <button
                type="submit"
                className="p-2 bg-sedona-red hover:bg-sedona-orange text-sedona-sand rounded border border-sedona-orange/10 transition-colors cursor-pointer"
                aria-label="Subscribe"
                id="btn-footer-subscribe"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright deck and developer attribution */}
        <div className="border-t border-sedona-clay/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-wider text-sedona-copper/60">
          <div>
            &copy; {currentYear} Luke Harvey Music. All Rights Reserved.
          </div>
          
          {/* Centered developer attribution developed by iWebNext */}
          <div className="text-center md:text-right" id="developer-attribution">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noreferrer" className="text-sedona-orange hover:text-sedona-red transition-colors underline underline-offset-4">iWebNext</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
