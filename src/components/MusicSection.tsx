import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Download, Heart } from "lucide-react";
import { TRACKS } from "../data/musicData";
import { Track } from "../types";

export default function MusicSection() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // Simulated start progress
  const [volume, setVolume] = useState(80);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  // Toggle Play / Pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Skip Forward
  const handleNext = () => {
    setIsPlaying(true);
    setProgress(0);
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % TRACKS.length);
  };

  // Skip Backward
  const handlePrev = () => {
    setIsPlaying(true);
    setProgress(0);
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + TRACKS.length) % TRACKS.length);
  };

  // Select particular track
  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setProgress(0);
    setIsPlaying(true);
  };

  // Toggle Like track
  const toggleLike = (trackId: string) => {
    setLikes((prev) => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  // Simulating playback progress
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentTrackIndex]);

  // Calculate current and total times based on progress percent
  useEffect(() => {
    // Parse track duration "M:SS"
    const parts = currentTrack.duration.split(":");
    const totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    
    setDuration(currentTrack.duration);

    const elapsedSeconds = Math.floor((progress / 100) * totalSeconds);
    const m = Math.floor(elapsedSeconds / 60);
    const s = elapsedSeconds % 60;
    setCurrentTime(`${m}:${s < 10 ? "0" : ""}${s}`);
  }, [progress, currentTrackIndex]);

  return (
    <section id="music" className="py-24 bg-sedona-charcoal/30 relative overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute left-1/3 top-1/3 w-96 h-96 bg-sedona-orange/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-sedona-orange">
            Discography & Soundscape
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sedona-sand mt-3 mb-6">
            Latest Music
          </h2>
          <div className="w-16 h-0.5 bg-sedona-red mx-auto"></div>
        </div>

        {/* Music Player & Discography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Custom Interactive Audio Player Box */}
          <div className="lg:col-span-5 bg-sedona-charcoal/80 border border-sedona-clay/20 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm" id="music-player-container">
            <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-sedona-orange mb-4">
              Now Streaming
            </span>
            
            {/* Player Album Art Cover */}
            <div className="relative group aspect-square rounded-xl overflow-hidden mb-6 bg-sedona-dark shadow-lg">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.albumName}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ${
                  isPlaying ? "scale-110" : "scale-100"
                }`}
                referrerPolicy="no-referrer"
                id="player-album-art"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-xs font-mono text-sedona-sand/80 bg-sedona-clay/40 px-3 py-1 rounded border border-sedona-orange/30 backdrop-blur-sm">
                  {currentTrack.albumName} ({currentTrack.releaseYear})
                </p>
              </div>
            </div>

            {/* Track Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="truncate pr-4">
                <h3 className="font-serif text-xl md:text-2xl text-sedona-sand truncate">
                  {currentTrack.title}
                </h3>
                <p className="font-sans text-sm text-sedona-copper truncate mt-1">
                  Luke Harvey &bull; Sedona Sessions
                </p>
              </div>
              <button
                onClick={() => toggleLike(currentTrack.id)}
                className={`p-2 rounded-full border transition-colors ${
                  likes[currentTrack.id]
                    ? "bg-sedona-red/20 border-sedona-red text-sedona-red"
                    : "border-sedona-clay/30 hover:border-sedona-orange text-sedona-sand/60 hover:text-sedona-orange"
                }`}
                id="btn-like-track"
              >
                <Heart className={`w-5 h-5 ${likes[currentTrack.id] ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Player Progress Bar */}
            <div className="mb-4">
              <div
                className="relative h-1.5 w-full bg-sedona-dark/80 rounded-full cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percentage = Math.round((clickX / rect.width) * 100);
                  setProgress(percentage);
                }}
                id="player-progress-track"
              >
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-sedona-red to-sedona-orange rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-sedona-sand border-2 border-sedona-red rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 7px)` }}
                ></div>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-sedona-copper/70 mt-2">
                <span>{currentTime}</span>
                <span>{duration}</span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-between mt-4">
              {/* Volume Slider */}
              <div className="flex items-center space-x-2 w-24">
                <Volume2 className="w-4 h-4 text-sedona-copper/80" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-sedona-dark rounded-full appearance-none accent-sedona-orange cursor-pointer"
                  id="player-volume-slider"
                />
              </div>

              {/* Central Control Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-sedona-charcoal hover:bg-sedona-warm-gray text-sedona-sand hover:text-sedona-orange border border-sedona-clay/20 transition-all cursor-pointer"
                  id="player-btn-prev"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-sedona-red hover:bg-sedona-orange text-sedona-sand hover:scale-105 transition-all shadow-lg shadow-sedona-red/20 border border-sedona-orange/10 cursor-pointer"
                  id="player-btn-play-pause"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-sedona-charcoal hover:bg-sedona-warm-gray text-sedona-sand hover:text-sedona-orange border border-sedona-clay/20 transition-all cursor-pointer"
                  id="player-btn-next"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Download Indicator */}
              <button
                onClick={() => alert(`Starting download for '${currentTrack.title}.mp3' (Demo placeholder).`)}
                className="p-2.5 rounded-full border border-sedona-clay/20 hover:border-sedona-orange hover:bg-sedona-clay/10 text-sedona-copper/80 hover:text-sedona-orange transition-all cursor-pointer"
                title="Download preview track"
                id="player-btn-download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Track List Grid */}
          <div className="lg:col-span-7" id="track-list-container">
            <h3 className="font-serif text-2xl text-sedona-sand mb-6 flex items-center">
              <Music className="w-5 h-5 text-sedona-orange mr-2" /> Track Selection
            </h3>
            
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2" id="track-list">
              {TRACKS.map((track, idx) => (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                    currentTrackIndex === idx
                      ? "bg-sedona-clay/25 border-sedona-orange/50 shadow-md shadow-sedona-clay/10"
                      : "bg-sedona-charcoal/40 hover:bg-sedona-charcoal/75 border-sedona-clay/10 hover:border-sedona-clay/35"
                  }`}
                  id={`track-row-${track.id}`}
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <span className="font-mono text-xs text-sedona-copper w-4 text-center">
                      {idx + 1}
                    </span>
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover border border-sedona-clay/20 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <p className="font-serif text-sm tracking-wide text-sedona-sand truncate">
                        {track.title}
                      </p>
                      <p className="text-[11px] text-sedona-copper/80 truncate mt-0.5">
                        {track.albumName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 flex-shrink-0 pl-3">
                    <span className="font-mono text-xs text-sedona-sand/50">
                      {track.duration}
                    </span>
                    {currentTrackIndex === idx && isPlaying ? (
                      <div className="flex items-center space-x-0.5 h-3.5">
                        <span className="w-0.5 h-3 bg-sedona-orange rounded animate-[bounce_0.8s_infinite]"></span>
                        <span className="w-0.5 h-2 bg-sedona-orange rounded animate-[bounce_0.8s_infinite_0.2s]"></span>
                        <span className="w-0.5 h-3.5 bg-sedona-orange rounded animate-[bounce_0.8s_infinite_0.1s]"></span>
                      </div>
                    ) : (
                      <Play className="w-3.5 h-3.5 text-sedona-copper group-hover:text-sedona-orange opacity-60" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* External Streaming Platform Cards */}
            <div className="mt-8 border-t border-sedona-clay/20 pt-8" id="streaming-platforms">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-sedona-orange mb-5">
                Stream & Support Luke on External Platforms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-sedona-charcoal/50 hover:bg-sedona-charcoal border border-sedona-clay/10 hover:border-sedona-orange/30 rounded-xl group transition-all"
                  id="platform-spotify"
                >
                  <span className="font-serif text-sm text-sedona-sand font-medium group-hover:text-sedona-orange transition-colors">
                    Spotify
                  </span>
                  <span className="text-[10px] font-mono text-sedona-copper/80 group-hover:translate-x-1 transition-transform">
                    Listen &rarr;
                  </span>
                </a>
                
                <a
                  href="https://apple.com/apple-music"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-sedona-charcoal/50 hover:bg-sedona-charcoal border border-sedona-clay/10 hover:border-sedona-orange/30 rounded-xl group transition-all"
                  id="platform-apple"
                >
                  <span className="font-serif text-sm text-sedona-sand font-medium group-hover:text-sedona-orange transition-colors">
                    Apple Music
                  </span>
                  <span className="text-[10px] font-mono text-sedona-copper/80 group-hover:translate-x-1 transition-transform">
                    Listen &rarr;
                  </span>
                </a>
                
                <a
                  href="https://music.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-sedona-charcoal/50 hover:bg-sedona-charcoal border border-sedona-clay/10 hover:border-sedona-orange/30 rounded-xl group transition-all"
                  id="platform-youtube"
                >
                  <span className="font-serif text-sm text-sedona-sand font-medium group-hover:text-sedona-orange transition-colors">
                    YouTube Music
                  </span>
                  <span className="text-[10px] font-mono text-sedona-copper/80 group-hover:translate-x-1 transition-transform">
                    Listen &rarr;
                  </span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
