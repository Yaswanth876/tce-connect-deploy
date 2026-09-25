import api from './api';
import type { User } from '../types';

export const userService = {
  async getMe(): Promise<User> {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  async updateMe(updates: Partial<User>): Promise<User> {
    const response = await api.put<User>('/users/me', updates);
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.put('/users/me/password', { currentPassword, newPassword });
    return response.data;
  },
};
