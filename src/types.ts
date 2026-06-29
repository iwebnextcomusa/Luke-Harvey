export interface Track {
  id: string;
  title: string;
  duration: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeMusicUrl: string;
  type: 'single' | 'album';
  albumName: string;
  releaseYear: number;
  coverUrl: string;
}

export interface MusicianEvent {
  id: string;
  date: string; // ISO string or human-readable (e.g. '2026-07-15')
  time: string;
  venue: string;
  city: string;
  state: string;
  ticketsUrl: string;
  isSoldOut: boolean;
  status: 'upcoming' | 'past';
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'live' | 'studio' | 'landscape' | 'portrait';
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
