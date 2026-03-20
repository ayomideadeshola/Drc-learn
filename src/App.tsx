/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Assessments from './pages/Assessments';
import Certifications from './pages/Certifications';
import Inbox from './pages/Inbox';
import CourseDetail from './pages/CourseDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="users" element={<Users />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </Router>
  );
}
