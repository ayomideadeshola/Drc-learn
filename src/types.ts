export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  lessons: number;
  progress?: number;
  image: string;
  rating: number;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  progress: number;
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  avatar: string;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
}
