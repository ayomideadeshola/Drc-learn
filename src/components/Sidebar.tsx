import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  Award, 
  Mail, 
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: BookOpen, label: 'Course Library', path: '/courses' },
    { icon: Users, label: 'User Management', path: '/users' },
    { icon: ClipboardCheck, label: 'Assessments', path: '/assessments' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Mail, label: 'Inbox', path: '/inbox' },
  ];

  return (
    <aside className="w-64 bg-primary text-white h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <GraduationCap className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg leading-none">LearnOS</h1>
          <p className="text-[10px] text-secondary-container uppercase tracking-widest font-medium mt-1">Executive Suite</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-white/10 text-white font-medium shadow-lg' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'}
            `}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-all text-sm">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all text-sm">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
