import { useState } from "react";
import { Image, Layers } from "lucide-react";
import { GALLERY_ITEMS } from "../data/musicData";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "live", label: "Live Gigs" },
    { id: "portrait", label: "Portraits" },
    { id: "studio", label: "Studio" },
    { id: "landscape", label: "Sedona" }
  ];

  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-sedona-charcoal/30 relative overflow-hidden">
      <div className="absolute left-10 top-1/4 w-80 h-80 bg-sedona-red/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-sedona-orange">
            Visual Storytelling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sedona-sand mt-3 mb-6">
            Photo Gallery
          </h2>
          <div className="w-16 h-0.5 bg-sedona-red mx-auto"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-sedona-orange text-sedona-sand border-sedona-orange shadow-md"
                  : "border-sedona-clay/20 hover:border-sedona-orange/50 text-sedona-sand/75 hover:text-sedona-orange bg-sedona-charcoal/40"
              }`}
              id={`filter-btn-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-xl border border-sedona-clay/15 bg-sedona-charcoal hover:border-sedona-orange/30 transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-xl"
              id={`gallery-item-${item.id}`}
            >
              {/* Aspect Ratio Constraint based on item */}
              <div className="aspect-square sm:aspect-[4/3] md:aspect-square overflow-hidden bg-sedona-dark">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay with Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sedona-orange mb-1">
                  {item.category}
                </span>
                <p className="text-xs text-sedona-sand/90 font-sans tracking-wide leading-relaxed">
                  {item.caption}
                </p>
                <div className="mt-3 pt-2 border-t border-sedona-clay/10 flex items-center justify-between text-[8px] font-mono text-sedona-copper/50">
                  <span>LUKE HARVEY MUSIC</span>
                  <span>GALLERY &bull; {idx + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-dashed border-sedona-clay/20 rounded-2xl bg-sedona-charcoal/20">
            <Layers className="w-8 h-8 text-sedona-copper/40 mx-auto mb-3" />
            <p className="font-serif text-sm text-sedona-sand/60">
              No photos found in this category. Check back soon for new snapshots!
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
