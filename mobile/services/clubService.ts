import api from './api';
import type { Club } from '../types';

export const clubService = {
  async getAll(): Promise<Club[]> {
    const response = await api.get<Club[]>('/clubs');
    return response.data;
  },
};
