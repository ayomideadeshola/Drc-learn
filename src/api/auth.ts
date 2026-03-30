import http from '../lib/http.js';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'creator' | 'user';
}

export const signup = async (data: any): Promise<User> => {
  const response = await http.post('/auth/signup', data);
  return response.data;
};

export const login = async (data: any): Promise<User> => {
  const response = await http.post('/auth/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await http.post('/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const response = await http.get('/auth/me');
  return response.data;
};
