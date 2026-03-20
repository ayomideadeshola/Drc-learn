import { Course, User, Activity } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Strategic Leadership & Management',
    category: 'Leadership',
    instructor: 'Dr. Sarah Jenkins',
    duration: '12h 45m',
    lessons: 24,
    progress: 65,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    enrolled: 1240,
    level: 'Advanced'
  },
  {
    id: '2',
    title: 'Data-Driven Decision Making',
    category: 'Analytics',
    instructor: 'Prof. Michael Chen',
    duration: '8h 30m',
    lessons: 15,
    progress: 30,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    enrolled: 850,
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Digital Transformation Strategy',
    category: 'Technology',
    instructor: 'Elena Rodriguez',
    duration: '10h 15m',
    lessons: 18,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    enrolled: 2100,
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'Financial Risk Management',
    category: 'Finance',
    instructor: 'Robert Wilson',
    duration: '15h 00m',
    lessons: 30,
    progress: 85,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    enrolled: 640,
    level: 'Advanced'
  },
  {
    id: '5',
    title: 'Agile Project Management',
    category: 'Management',
    instructor: 'James Taylor',
    duration: '6h 45m',
    lessons: 12,
    progress: 10,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    enrolled: 1500,
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Executive Communication Skills',
    category: 'Soft Skills',
    instructor: 'Amanda Lee',
    duration: '5h 20m',
    lessons: 10,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    enrolled: 3200,
    level: 'Beginner'
  }
];

export const USERS: User[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.t@company.com',
    role: 'Senior Manager',
    department: 'Operations',
    progress: 78,
    status: 'Active',
    lastActive: '2 mins ago',
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: '2',
    name: 'Jessica Chen',
    email: 'j.chen@company.com',
    role: 'Product Lead',
    department: 'Product',
    progress: 45,
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'https://i.pravatar.cc/150?u=jessica'
  },
  {
    id: '3',
    name: 'Marcus Wright',
    email: 'm.wright@company.com',
    role: 'Data Analyst',
    department: 'Analytics',
    progress: 92,
    status: 'Active',
    lastActive: 'Just now',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    id: '4',
    name: 'Sarah Miller',
    email: 's.miller@company.com',
    role: 'HR Director',
    department: 'Human Resources',
    progress: 15,
    status: 'Pending',
    lastActive: '2 days ago',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'd.wilson@company.com',
    role: 'Software Engineer',
    department: 'Engineering',
    progress: 60,
    status: 'Inactive',
    lastActive: '1 week ago',
    avatar: 'https://i.pravatar.cc/150?u=david'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    user: 'Alex Thompson',
    action: 'completed module',
    target: 'Strategic Planning',
    time: '10 mins ago',
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: '2',
    user: 'Jessica Chen',
    action: 'started course',
    target: 'Agile Leadership',
    time: '45 mins ago',
    avatar: 'https://i.pravatar.cc/150?u=jessica'
  },
  {
    id: '3',
    user: 'Marcus Wright',
    action: 'passed assessment',
    target: 'Data Analytics 101',
    time: '2 hours ago',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    id: '4',
    user: 'Elena Rodriguez',
    action: 'earned certificate',
    target: 'Digital Transformation',
    time: '5 hours ago',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];
