import { CommunityPost, JournalEntry, Comment } from './types';

// "French Summer" Gradient Palette
export const COLORS = {
  yellow: '#FAE37C', // Sunshine Daisy
  mint: '#C1E9D2',   // Mint Sugar
  blue: '#5D9BEC',   // Borage Blue
  textDark: '#423E37', // Dark Grey/Brown for contrast
  textLight: '#FFFFFF',
  cardBg: 'rgba(255, 255, 255, 0.6)',
};

export const MOCK_USER = {
    name: 'Cal Corn',
    breed: 'Ginger Tabby',
    age: '3 years',
    weight: '4.5 kg',
    avatar: 'https://picsum.photos/id/64/200/200',
    coverImage: 'https://picsum.photos/id/237/800/600',
    bio: 'Professional napper and red dot hunter.',
    checkInStreak: 12,
    yearlyDays: 245,
    followers: 1205,
    following: 42,
};

export const MOCK_FOLLOWERS = [
    { id: '1', name: 'Luna the Void', avatar: 'https://picsum.photos/id/65/100/100' },
    { id: '2', name: 'Simba', avatar: 'https://picsum.photos/id/1025/100/100' },
    { id: '3', name: 'Bella & Nala', avatar: 'https://picsum.photos/id/237/100/100' },
    { id: '4', name: 'Oliver Twist', avatar: 'https://picsum.photos/id/169/100/100' },
    { id: '5', name: 'Garfield', avatar: 'https://picsum.photos/id/219/100/100' },
    { id: '6', name: 'Mochi', avatar: 'https://picsum.photos/id/611/100/100' },
];

export const MOCK_DAILY_COMMENTS: Comment[] = [
    { id: 'c1', author: 'Mimi', text: 'My cat sleeps on my face!' },
    { id: 'c2', author: 'Oreo', text: 'Does anyone else cat bark?' },
    { id: 'c3', author: 'Felix', text: 'Just caught a fly!' },
];

export const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: '2023-10-24',
    imageUrl: 'https://picsum.photos/id/237/800/1000',
    caption: 'Every cat is a tiger in your family.',
  },
  {
    id: '2',
    date: '2023-10-25',
    imageUrl: 'https://picsum.photos/id/40/800/1000',
    caption: 'Tried to catch the red dot again. It remains elusive.',
  },
  {
    id: '3',
    date: '2023-10-26',
    imageUrl: 'https://picsum.photos/id/1025/800/1000',
    caption: 'Sleeping on the keyboard while human tries to work.',
  },
  {
    id: '4',
    date: '2023-10-27',
    imageUrl: 'https://picsum.photos/id/1074/800/800',
    caption: 'Watching the birds.',
  },
  {
    id: '5',
    date: '2023-10-28',
    imageUrl: 'https://picsum.photos/id/1084/800/800',
    caption: 'Walrus impression.',
  },
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: '101',
    author: 'Sarah & Mittens',
    authorAvatar: 'https://picsum.photos/id/64/100/100',
    catName: 'Mittens',
    imageUrl: 'https://picsum.photos/id/219/800/800',
    caption: 'Looking majestic this morning!',
    likes: 45,
    comments: [],
  },
  {
    id: '102',
    author: 'Tom & Jerry',
    authorAvatar: 'https://picsum.photos/id/91/100/100',
    catName: 'Jerry',
    imageUrl: 'https://picsum.photos/id/593/800/800',
    caption: 'Guilty face after knocking over the plant.',
    likes: 120,
    comments: [],
  },
];