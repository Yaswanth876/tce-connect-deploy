// TypeScript interfaces for TCE Connect Mobile
// Mirrors the backend MongoDB models exactly

export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'student' | 'organizer' | 'admin';
  department?: string;
  year?: string;
  registerNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'organizer';
  department?: string;
  year?: string;
  registerNumber?: string;
}

export interface Event {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  venue: string;
  department: string;
  type: 'technical' | 'cultural' | 'sports';
  club?: string;
  maxParticipants: number;
  organizer: User | string;
  participants: (User | string)[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  date: string;
  time?: string;
  venue?: string;
  department?: string;
  type?: 'technical' | 'cultural' | 'sports';
  club?: string;
  maxParticipants?: number;
}

export interface Club {
  _id?: string;
  name: string;
  description?: string;
  members: number;
  portalUrl?: string;
  icon?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  activeClubs: number;
  todaysEventsCount: number;
}

export interface AdminAnalytics {
  stats: AdminStats;
  todaysEvents: Event[];
  pastEvents: Event[];
  upcomingEvents: Event[];
  organizers: User[];
}

export interface ApiError {
  error?: string;
  message?: string;
}

export type EventFilterType = 'All' | 'Technical' | 'Cultural' | 'Sports';
