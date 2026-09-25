import api from './api';
import type { Event, CreateEventPayload } from '../types';

export const eventService = {
  async getAll(): Promise<Event[]> {
    const response = await api.get<Event[]>('/events');
    return response.data;
  },

  async getById(id: string): Promise<Event> {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  },

  async create(payload: CreateEventPayload): Promise<Event> {
    const response = await api.post<Event>('/events', payload);
    return response.data;
  },

  async update(id: string, payload: CreateEventPayload): Promise<Event> {
    const response = await api.put<Event>(`/events/${id}`, payload);
    return response.data;
  },

  async delete(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  async register(id: string): Promise<Event> {
    const response = await api.post<Event>(`/events/${id}/register`);
    return response.data;
  },

  async cancelRegistration(id: string): Promise<Event> {
    const response = await api.delete<Event>(`/events/${id}/register`);
    return response.data;
  },

  async getMyEvents(): Promise<Event[]> {
    const response = await api.get<Event[]>('/users/me/events');
    return response.data;
  },
};
