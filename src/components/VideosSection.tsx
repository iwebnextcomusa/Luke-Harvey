import { useState } from "react";
import { Youtube, Play, Film } from "lucide-react";
import { VIDEO_ITEMS } from "../data/musicData";

export default function VideosSection() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handlePlayVideo = (id: string) => {
    setActiveVideoId(id);
  };

  return (
    <section id="videos" className="py-24 bg-sedona-dark relative overflow-hidden">
      {/* Background visual glowing core */}
      <div className="absolute right-10 bottom-1/3 w-80 h-80 bg-sedona-orange/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-sedona-orange">
            Live Recordings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sedona-sand mt-3 mb-6">
            Featured Videos
          </h2>
          <div className="w-16 h-0.5 bg-sedona-red mx-auto"></div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="videos-grid">
          {VIDEO_ITEMS.map((video) => (
            <div
              key={video.id}
              className="bg-sedona-charcoal/40 border border-sedona-clay/15 rounded-2xl p-5 flex flex-col justify-between group hover:border-sedona-orange/30 hover:bg-sedona-charcoal/70 transition-all duration-300 shadow-lg hover:shadow-2xl"
              id={`video-card-${video.id}`}
            >
              <div>
                {/* Responsive Embedded Video Container / Custom Player Cover */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-5 bg-black shadow border border-sedona-clay/10">
                  {activeVideoId === video.id ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=0`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      id={`iframe-${video.id}`}
                    ></iframe>
                  ) : (
                    <div className="relative w-full h-full group/cover cursor-pointer">
                      {/* High-contrast beautiful preview artwork block */}
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        onError={(e) => {
                          // Fallback if maxres is missing
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                        }}
                        className="w-full h-full object-cover opacity-75 group-hover/cover:scale-105 group-hover/cover:opacity-90 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Terracotta hue overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-sedona-dark via-sedona-dark/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-sedona-clay/10 group-hover/cover:bg-transparent transition-colors"></div>

                      {/* Floating glowing Play icon */}
                      <button
                        onClick={() => handlePlayVideo(video.id)}
                        className="absolute inset-0 flex items-center justify-center focus:outline-none cursor-pointer"
                        aria-label="Play video"
                        id={`btn-play-video-${video.id}`}
                      >
                        <div className="w-14 h-14 bg-sedona-red/90 group-hover/cover:bg-sedona-orange group-hover/cover:scale-110 text-sedona-sand flex items-center justify-center rounded-full shadow-lg shadow-black/40 border border-sedona-orange/20 transition-all">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </button>

                      {/* YouTube tag in corner */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/75 rounded font-mono text-[9px] uppercase tracking-wider text-sedona-sand flex items-center space-x-1 border border-sedona-clay/10">
                        <Youtube className="w-3.5 h-3.5 text-red-600 fill-current" />
                        <span>YouTube</span>
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="font-serif text-lg text-sedona-sand group-hover:text-sedona-orange transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
                
                <p className="text-xs text-sedona-sand/75 leading-relaxed mt-3 line-clamp-3 font-sans">
                  {video.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-sedona-clay/10 flex items-center justify-between text-[10px] font-mono text-sedona-copper/50">
                <span className="flex items-center">
                  <Film className="w-3.5 h-3.5 mr-1.5 text-sedona-orange/80" /> LIVE FROM ARIZONA
                </span>
                <a
                  href={`https://youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sedona-orange transition-colors"
                  id={`btn-watch-yt-${video.id}`}
                >
                  Watch on YouTube &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Youtube Channel subscription block */}
        <div className="mt-16 text-center max-w-lg mx-auto p-8 border border-sedona-clay/15 bg-sedona-charcoal/20 rounded-2xl" id="yt-subscribe-block">
          <Youtube className="w-10 h-10 text-red-600 fill-current mx-auto mb-4" />
          <h4 className="font-serif text-lg text-sedona-sand mb-2">
            Subscribe to Luke Harvey's Channel
          </h4>
          <p className="text-xs text-sedona-sand/70 leading-relaxed mb-6">
            Get instant notifications about fresh live canyon acoustics, new song demos, studio breakdowns, and performance streams directly from Sedona.
          </p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest rounded shadow-md transition-all duration-300"
            id="btn-subscribe-channel"
          >
            <span>Subscribe Now</span>
          </a>
        </div>

      </div>
    </section>
  );
}
