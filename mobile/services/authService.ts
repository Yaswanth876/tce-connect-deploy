import api from './api';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types';

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/login', payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<{ message: string }> {
    const response = await api.post('/users/register', payload);
    return response.data;
  },

  async adminLogin(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/admin/login', payload);
    return response.data;
  },
};
