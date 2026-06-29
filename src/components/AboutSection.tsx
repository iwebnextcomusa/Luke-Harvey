import { Music4, Mic2, Sparkles, MapPin } from "lucide-react";

export default function AboutSection() {
  const coreValues = [
    {
      icon: <Music4 className="w-5 h-5 text-sedona-orange" />,
      title: "Handcrafted Sound",
      desc: "Luke's signature style centers around pure, steel-string acoustic guitar tones combined with storytelling lyrics."
    },
    {
      icon: <MapPin className="w-5 h-5 text-sedona-orange" />,
      title: "Sedona-Inspired",
      desc: "Every melody is born in the desert air, capturing the spiritual depth and red rock resonance of Sedona's natural canyons."
    },
    {
      icon: <Mic2 className="w-5 h-5 text-sedona-orange" />,
      title: "Live Intimacy",
      desc: "Over 15 years of live experience playing intimate wine lounges, red-rock chapels, and cozy Southwest festivals."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-sedona-orange" />,
      title: "Desert Mysticism",
      desc: "Warm acoustic folk-rock that blends natural imagery with deep emotional truths, establishing a welcoming community."
    }
  ];

  return (
    <section id="about" className="py-24 bg-sedona-dark/95 relative overflow-hidden">
      {/* Decorative side canyon line art / glow */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-sedona-red/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-sedona-copper/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-sedona-orange">
            The Musician & The Canyon
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sedona-sand mt-3 mb-6">
            Meet Luke Harvey
          </h2>
          <div className="w-16 h-0.5 bg-sedona-red mx-auto"></div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Professional Photo Column (luke_harvey_profile_1782764455085.jpg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm md:max-w-full">
              {/* Copper Frame Accent */}
              <div className="absolute -inset-2 bg-gradient-to-r from-sedona-clay to-sedona-orange rounded-xl opacity-40 group-hover:opacity-65 transition-opacity duration-500 blur-sm"></div>
              
              <div className="relative overflow-hidden rounded-lg bg-sedona-charcoal border border-sedona-orange/20 shadow-2xl">
                <img
                  src="/src/assets/images/luke_harvey_profile_1782764455085.jpg"
                  alt="Luke Harvey sitting in Sedona"
                  className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="about-profile-img"
                />
                
                {/* Decorative overlay detailing location */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-sedona-sand">Luke Harvey</h3>
                    <p className="font-mono text-xs text-sedona-orange/90 flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> Sedona, Arizona
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-sedona-clay/60 border border-sedona-orange/30 rounded text-[10px] font-mono uppercase tracking-widest text-sedona-sand">
                    Acoustic Guitarist
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography and Info Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-sedona-sand mb-6">
              Handcrafting Melodies In The Heart Of Red Rock Country
            </h3>
            
            <p className="text-sedona-sand/85 text-sm sm:text-base leading-relaxed mb-6">
              Luke Harvey is an authentic acoustic folk-rock musician, singer, and songwriter. 
              Calling the majestic canyons of Sedona, Arizona his home, his music is deeply 
              entwined with the Southwest spirit. Over the last decade and a half, Luke has become 
              a staple of the Arizona music landscape, known for his resonant voice, pristine steel-string guitar technique, and soulful songwriting.
            </p>

            <p className="text-sedona-sand/85 text-sm sm:text-base leading-relaxed mb-8">
              Drawing inspiration from folk legends like John Prine, Neil Young, and the sweeping canyon acoustics, 
              Luke crafts warm-hearted, artistic acoustic sessions. Whether playing at local wine cellars, Sedona red-rock 
              chapels, or outdoor plazas beneath the towering cliffs, his performances invite listeners into an intimate circle of storytelling and sonic warmth.
            </p>

            {/* Core Values Bento Grid Accent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-features-grid">
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-sedona-charcoal/50 hover:bg-sedona-charcoal border border-sedona-clay/15 hover:border-sedona-orange/30 transition-all duration-300"
                  id={`about-card-${idx}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-sedona-clay/10 rounded-md border border-sedona-orange/20">
                      {val.icon}
                    </div>
                    <h4 className="font-serif text-sm tracking-wider text-sedona-sand font-semibold">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-xs text-sedona-sand/70 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
