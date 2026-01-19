export interface JournalEntry {
  id: string;
  date: string; // ISO format YYYY-MM-DD
  imageUrl: string;
  caption: string;
  mood?: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  catName: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  isDailyQuestion?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
}

export interface DailyTopic {
  question: string;
  description: string;
}

export enum ViewState {
  HOME = 'HOME', // Personal Dashboard (Check-ins, Gallery)
  JOURNAL = 'JOURNAL', // Detailed List (Legacy, kept if needed or merged)
  ENTRY_DETAIL = 'ENTRY_DETAIL', // Single page view
  COMMUNITY = 'COMMUNITY', // Social feed (Default start)
  ADD_ENTRY = 'ADD_ENTRY', // Camera/Upload flow
  PROFILE = 'PROFILE', // User/Cat Profile from Community Avatar
  LIBRARY = 'LIBRARY', // Bookshelf of years
  FLIPBOOK = 'FLIPBOOK', // 3D Book reading experience
}