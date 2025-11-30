export interface User {
  id: string;
  username: string;
  avatar: string;
  isStreamer: boolean;
  followers: number;
}

export interface Stream {
  id: string;
  userId: string;
  user: User;
  title: string;
  game: string;
  thumbnail: string;
  viewers: number;
  isLive: boolean;
  tags: string[];
  startedAt: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  color: string;
  content: string;
  timestamp: number;
  isModerator?: boolean;
  isSubscriber?: boolean;
}

export enum StreamCategory {
  JUST_CHATTING = "Just Chatting",
  GAMING = "Gaming",
  MUSIC = "Music",
  PROGRAMMING = "Programming",
  IRL = "IRL"
}

export interface AdConfig {
  preroll: boolean;
  midroll: boolean;
  overlay: boolean;
}

export interface AnalyticsData {
  time: string;
  viewers: number;
  revenue: number;
}