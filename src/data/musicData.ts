import { Track, MusicianEvent, GalleryItem, VideoItem } from "../types";

export const TRACKS: Track[] = [
  {
    id: "1",
    title: "Red Rock Canyon",
    duration: "4:12",
    spotifyUrl: "https://open.spotify.com/track/placeholder1",
    appleMusicUrl: "https://music.apple.com/us/album/placeholder1",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=placeholder1",
    type: "album",
    albumName: "Sedona Sessions",
    releaseYear: 2026,
    coverUrl: "/src/assets/images/luke_harvey_album_1782764473132.jpg"
  },
  {
    id: "2",
    title: "Desert Whispers",
    duration: "3:45",
    spotifyUrl: "https://open.spotify.com/track/placeholder2",
    appleMusicUrl: "https://music.apple.com/us/album/placeholder2",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=placeholder2",
    type: "album",
    albumName: "Sedona Sessions",
    releaseYear: 2026,
    coverUrl: "/src/assets/images/luke_harvey_album_1782764473132.jpg"
  },
  {
    id: "3",
    title: "Sedona Dust",
    duration: "5:01",
    spotifyUrl: "https://open.spotify.com/track/placeholder3",
    appleMusicUrl: "https://music.apple.com/us/album/placeholder3",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=placeholder3",
    type: "album",
    albumName: "Sedona Sessions",
    releaseYear: 2026,
    coverUrl: "/src/assets/images/luke_harvey_album_1782764473132.jpg"
  },
  {
    id: "4",
    title: "Oak Creek Chords",
    duration: "3:22",
    spotifyUrl: "https://open.spotify.com/track/placeholder4",
    appleMusicUrl: "https://music.apple.com/us/album/placeholder4",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=placeholder4",
    type: "single",
    albumName: "Oak Creek Chords (Single)",
    releaseYear: 2025,
    coverUrl: "https://picsum.photos/seed/oakcreek/400/400"
  },
  {
    id: "5",
    title: "Canyon Sunrise",
    duration: "4:30",
    spotifyUrl: "https://open.spotify.com/track/placeholder5",
    appleMusicUrl: "https://music.apple.com/us/album/placeholder5",
    youtubeMusicUrl: "https://music.youtube.com/watch?v=placeholder5",
    type: "single",
    albumName: "Canyon Sunrise (Single)",
    releaseYear: 2025,
    coverUrl: "https://picsum.photos/seed/sunrise/400/400"
  }
];

export const EVENTS: MusicianEvent[] = [
  {
    id: "e1",
    date: "2026-07-15",
    time: "7:00 PM",
    venue: "Sedona Red Rock Amphitheater",
    city: "Sedona",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: false,
    status: "upcoming"
  },
  {
    id: "e2",
    date: "2026-07-28",
    time: "6:30 PM",
    venue: "Voz de Sedona Winery & Vineyard",
    city: "Cornville",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: false,
    status: "upcoming"
  },
  {
    id: "e3",
    date: "2026-08-12",
    time: "8:00 PM",
    venue: "The Oak Creek Lounge",
    city: "Sedona",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: false,
    status: "upcoming"
  },
  {
    id: "e4",
    date: "2026-08-30",
    time: "5:00 PM",
    venue: "Desert Horizon Music Festival",
    city: "Phoenix",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: false,
    status: "upcoming"
  },
  {
    id: "e5",
    date: "2026-09-18",
    time: "7:30 PM",
    venue: "Bell Rock Acoustic Plaza",
    city: "Sedona",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: true,
    status: "upcoming"
  },
  {
    id: "e6",
    date: "2026-05-10",
    time: "7:00 PM",
    venue: "Sedona Arts Center Theatre",
    city: "Sedona",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: true,
    status: "past"
  },
  {
    id: "e7",
    date: "2026-04-22",
    time: "6:00 PM",
    venue: "Tlaquepaque Chapel & Courtyard",
    city: "Sedona",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: true,
    status: "past"
  },
  {
    id: "e8",
    date: "2026-03-14",
    time: "7:00 PM",
    venue: "Flagstaff Acoustic Barn",
    city: "Flagstaff",
    state: "AZ",
    ticketsUrl: "#contact",
    isSoldOut: true,
    status: "past"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    url: "/src/assets/images/luke_harvey_hero_1782764440399.jpg",
    caption: "Performing live at Sedona Red Rock Amphitheater, sunset 2026",
    category: "live"
  },
  {
    id: "g2",
    url: "/src/assets/images/luke_harvey_profile_1782764455085.jpg",
    caption: "Professional portrait session at Cathedral Rock, Sedona",
    category: "portrait"
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
    caption: "Studio mixing and mastering sessions",
    category: "studio"
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1485278537138-4e8911a13c02?auto=format&fit=crop&q=80&w=600",
    caption: "Luke's signature custom wooden acoustic guitar details",
    category: "studio"
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600",
    caption: "Intimate fireside backyard concert series",
    category: "live"
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600",
    caption: "Playing on stage under the bright festival lights",
    category: "live"
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    caption: "Sedona red rocks landscape inspiring Southwest Americana tracks",
    category: "landscape"
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=600",
    caption: "Acoustic jam session under the clear desert stars",
    category: "portrait"
  }
];

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "v1",
    youtubeId: "dQw4w9WgXcQ", // Standard recognizable video placeholder or custom
    title: "Red Rock Canyon - Live Acoustic from Cathedral Rock",
    description: "An authentic, one-take live acoustic recording of Luke Harvey playing his hit single 'Red Rock Canyon' at Cathedral Rock in Sedona, Arizona."
  },
  {
    id: "v2",
    youtubeId: "dQw4w9WgXcQ",
    title: "Desert Whispers (Official Studio Lyric Video)",
    description: "The official lyric video for 'Desert Whispers', celebrating the spiritual energy, warmth, and beautiful landscapes of Sedona."
  },
  {
    id: "v3",
    youtubeId: "dQw4w9WgXcQ",
    title: "Live Tour Vlog: Folk in the Red Rocks Festival 2026",
    description: "Behind-the-scenes footage, fan interactions, jam sessions, and highlights from Luke Harvey's live set at the Sedona Folk Festival."
  }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    text: "Luke Harvey's music captures the very soul of Sedona. Listening to him perform live as the sunset hits the red rocks is a spiritual experience you cannot miss.",
    author: "Sarah Jenkins",
    location: "Sedona Visitor Center"
  },
  {
    id: "t2",
    text: "The warmth of Luke's voice and his impeccable acoustic guitar arrangements make him one of the most professional and authentic folk musicians we've ever booked.",
    author: "Marcus Vance",
    location: "Voz de Sedona Winery"
  },
  {
    id: "t3",
    text: "A beautiful fusion of modern acoustic rock and Southwest storytelling. His album 'Sedona Sessions' has been on repeat for months. A true masterpiece!",
    author: "Elena Rostova",
    location: "Acoustic Echoes Blog"
  }
];
