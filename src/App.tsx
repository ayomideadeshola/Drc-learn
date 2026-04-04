import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Assessments from './pages/Assessments';
import Certifications from './pages/Certifications';
import Inbox from './pages/Inbox';
import MyCourses from './pages/MyCourses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
import CoursePlayer from './components/CoursePlayer';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/learn/:courseId" element={
            <ProtectedRoute>
              <CoursePlayer />
            </ProtectedRoute>
          } />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="courses" element={<Courses />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="courses/:id" element={<CourseDetail />} />
            <Route path="profile" element={<Profile />} />
            
            {/* Admin Only */}
            <Route path="users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Users />
              </ProtectedRoute>
            } />
            
            {/* Creator and Admin */}
            <Route path="assessments" element={
              <ProtectedRoute allowedRoles={['admin', 'creator']}>
                <Assessments />
              </ProtectedRoute>
            } />
            
            <Route path="certifications" element={<Certifications />} />
            <Route path="inbox" element={<Inbox />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
