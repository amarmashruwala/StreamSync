import { Stream, User, StreamCategory } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'DemoUser',
  avatar: 'https://picsum.photos/seed/user1/50/50',
  isStreamer: true,
  followers: 120
};

export const MOCK_STREAMS: Stream[] = [
  {
    id: 's1',
    userId: 'u2',
    user: {
      id: 'u2',
      username: 'CodeMaster',
      avatar: 'https://picsum.photos/seed/u2/50/50',
      isStreamer: true,
      followers: 15400
    },
    title: 'Building a React App from Scratch! 🚀',
    game: 'Programming',
    thumbnail: 'https://picsum.photos/seed/s1/400/225',
    viewers: 1234,
    isLive: true,
    tags: ['English', 'Web Dev', 'React'],
    startedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 's2',
    userId: 'u3',
    user: {
      id: 'u3',
      username: 'SpeedRunnerX',
      avatar: 'https://picsum.photos/seed/u3/50/50',
      isStreamer: true,
      followers: 8900
    },
    title: 'World Record Attempt [Any%]',
    game: 'Elden Ring',
    thumbnail: 'https://picsum.photos/seed/s2/400/225',
    viewers: 8500,
    isLive: true,
    tags: ['No Glitch', 'Souls'],
    startedAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 's3',
    userId: 'u4',
    user: {
      id: 'u4',
      username: 'ChillBeats',
      avatar: 'https://picsum.photos/seed/u4/50/50',
      isStreamer: true,
      followers: 45000
    },
    title: 'Lofi Hip Hop Radio - Beats to Relax/Study to',
    game: 'Music',
    thumbnail: 'https://picsum.photos/seed/s3/400/225',
    viewers: 12000,
    isLive: true,
    tags: ['Lofi', 'Music', 'No Talk'],
    startedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 's4',
    userId: 'u5',
    user: {
      id: 'u5',
      username: 'IRL_Travels',
      avatar: 'https://picsum.photos/seed/u5/50/50',
      isStreamer: true,
      followers: 2300
    },
    title: 'Walking around Tokyo at Night 🌧️',
    game: 'IRL',
    thumbnail: 'https://picsum.photos/seed/s4/400/225',
    viewers: 450,
    isLive: true,
    tags: ['Travel', 'Japan', 'Walking'],
    startedAt: new Date(Date.now() - 1800000).toISOString()
  }
];

export const CATEGORIES = [
  { name: 'Just Chatting', img: 'https://picsum.photos/seed/c1/150/200' },
  { name: 'Minecraft', img: 'https://picsum.photos/seed/c2/150/200' },
  { name: 'Valorant', img: 'https://picsum.photos/seed/c3/150/200' },
  { name: 'Programming', img: 'https://picsum.photos/seed/c4/150/200' },
  { name: 'Music', img: 'https://picsum.photos/seed/c5/150/200' },
];

export const MOCK_CHAT_MESSAGES = [
  "PogChamp", "LUL", "Nice try!", "What song is this?", "Hello from Brazil!", "First", "Can you check my PR?", "This UI is clean"
];

export const MOCK_CHAT_USERS = [
  "PixelWarrior", "DevDave", "SarahSmith", "Gamer123", "TwitchFan", "ReactLover"
];

export const MOCK_CHAT_COLORS = [
  "#FF0000", "#00FF00", "#0000FF", "#B22222", "#FF7F50", "#9ACD32", "#DAA520"
];