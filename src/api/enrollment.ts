import http from '../lib/http';


export const enrollInCourse = async (courseId: string) => {
  const response = await http.post('/enrollments/join', { courseId });
  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await http.get('/enrollments/my-courses');
  return response.data;
};

export const getCourseStudents = async (courseId: string) => {
  const response = await http.get('/enrollments/course/${courseId}/students');
  return response.data;
};
