
import { Post, User, Story, Notification, Conversation } from './types';

export const COLORS = {
  fbBlue: '#1877F2',
  fbBg: '#F0F2F5',
  fbWhite: '#FFFFFF',
  fbTextPrimary: '#050505',
  fbTextSecondary: '#65676B',
  fbGreen: '#42B72A'
};

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@example.com',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    reputation: 1250,
    bio: 'Tech Lead & Problem Solver'
  },
  {
    id: 'u2',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://picsum.photos/seed/john/100/100',
    reputation: 840,
    bio: 'Startup Founder & Enthusiast'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: 'Sarah Chen',
    userAvatar: 'https://picsum.photos/seed/sarah/100/100',
    category: 'Technology',
    title: 'Optimizing React Rendering',
    content: 'I have a large list of 10k items and even with memoization, the re-renders are sluggish. Anyone found a better way than virtualization?',
    imageUrl: 'https://picsum.photos/seed/tech/800/400',
    timestamp: Date.now() - 3600000,
    votes: 42,
    isSolved: false,
    solutions: [
      {
        id: 's1',
        userId: 'u2',
        userName: 'John Doe',
        userAvatar: 'https://picsum.photos/seed/john/100/100',
        text: 'Have you tried web workers for heavy data processing outside the main thread?',
        timestamp: Date.now() - 1800000,
        upvotes: 12
      }
    ]
  },
  {
    id: 'p2',
    userId: 'u2',
    userName: 'John Doe',
    userAvatar: 'https://picsum.photos/seed/john/100/100',
    category: 'Business',
    title: 'Customer Acquisition Costs',
    content: 'Our CAC is climbing higher than our LTV. We are a B2B SaaS. Any creative low-cost strategies for lead gen?',
    timestamp: Date.now() - 7200000,
    votes: 15,
    isSolved: false,
    solutions: []
  },
  {
    id: 'p3',
    userId: 'u1',
    userName: 'Sarah Chen',
    userAvatar: 'https://picsum.photos/seed/sarah/100/100',
    category: 'Creative',
    title: 'Logo Color Palette',
    content: 'Working on a sustainable fashion brand. Should I stick with greens or go for a modern beige/earth-tone look?',
    imageUrl: 'https://picsum.photos/seed/design/800/400',
    timestamp: Date.now() - 86400000,
    votes: 89,
    isSolved: true,
    solutions: [
      {
        id: 's2',
        userId: 'u3',
        userName: 'Alex River',
        userAvatar: 'https://picsum.photos/seed/alex/100/100',
        text: 'Earth tones are trending and feel more "premium" and natural than standard greens.',
        timestamp: Date.now() - 43200000,
        upvotes: 25
      }
    ]
  }
];

export const STORIES: Story[] = [
  { id: 'st1', userId: 'u1', userName: 'Sarah Chen', userAvatar: 'https://picsum.photos/seed/sarah/100/100', thumbnail: 'https://picsum.photos/seed/sarah/200/300' },
  { id: 'st2', userId: 'u2', userName: 'John Doe', userAvatar: 'https://picsum.photos/seed/john/100/100', thumbnail: 'https://picsum.photos/seed/john/200/300' },
  { id: 'st3', userId: 'u3', userName: 'Alex River', userAvatar: 'https://picsum.photos/seed/alex/100/100', thumbnail: 'https://picsum.photos/seed/alex/200/300' },
  { id: 'st4', userId: 'u4', userName: 'Maria Lopez', userAvatar: 'https://picsum.photos/seed/maria/100/100', thumbnail: 'https://picsum.photos/seed/maria/200/300' }
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', text: 'Sarah Chen suggested a solution to your problem.', time: '2h ago', read: false, avatar: 'https://picsum.photos/seed/sarah/50/50' },
  { id: 'n2', text: 'Your problem reached 50 helpful votes!', time: '5h ago', read: true, avatar: 'https://picsum.photos/seed/star/50/50' },
  { id: 'n3', text: 'Alex River started following your solutions.', time: '1d ago', read: false, avatar: 'https://picsum.photos/seed/alex/50/50' }
];
