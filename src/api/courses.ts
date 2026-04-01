import http from '../lib/http.js';

const API_URL = '/courses';

export interface Course {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  price: number;
  category: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    name: string;
    email: string;
  };
}

export const courseApi = {
  getAll: async () => {
    const response = await http.get<Course[]>(API_URL);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await http.get<Course>(`${API_URL}/${id}`);
    return response.data;
  },
  create: async (courseData: Partial<Course>) => {
    const response = await http.post<Course>(API_URL, courseData);
    return response.data;
  },
  update: async (id: string, courseData: Partial<Course>) => {
    const response = await http.put<Course>(`${API_URL}/${id}`, courseData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await http.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
