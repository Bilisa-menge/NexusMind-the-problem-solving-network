
export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  birthday?: string;
  gender?: string;
  reputation: number;
  bio?: string;
  isAdmin?: boolean;
  joinedAt?: number;
  lastLogin?: number;
  isBanned?: boolean;
}

export interface Solution {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: number;
  upvotes: number;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  category: string;
  title: string;
  content: string;
  imageUrl?: string;
  timestamp: number;
  votes: number;
  solutions: Solution[];
  isSolved: boolean;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  thumbnail: string;
}

export interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  avatar: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage: string;
  time: string;
}
