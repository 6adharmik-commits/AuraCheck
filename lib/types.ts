export interface AuraRatings {
  aura: number;
  style: number;
  confidence: number;
  energy: number;
}

export interface AuraColor {
  name: string;
  hex: string;
}

export interface AuraAnalysis {
  primaryVibe: string;
  secondaryVibe: string;
  vibeDescription: string;
  outfitAnalysis: string;
  aesthetic: string;
  captions: string[];
  songMood: string;
  songKeywords: string[];
  ratings: AuraRatings;
  colors: AuraColor[];
  hashtags: string[];
}

export interface Song {
  title: string;
  artist: string;
  moods: string[];
  genres: string[];
  energy: number;
  aesthetic: string[];
}

export interface SongMatch extends Song {
  matchReason: string;
  matchScore: number;
}

export interface AuraResultRecord {
  id: string;
  timestamp: number;
  imageDataUrl: string;
  analysis: AuraAnalysis;
  songs: SongMatch[];
  localColors: AuraColor[];
  demoMode?: boolean;
}
