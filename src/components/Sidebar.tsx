import React, { useEffect, useState } from 'react';
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
  GraduationCap,
  X
} from 'lucide-react';
import { motion, useAnimation } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const controls = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        controls.start({ x: 0 });
      } else {
        controls.start({ x: isOpen ? 0 : -256 });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, controls]);

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
    <motion.aside 
      initial={false}
      animate={controls}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="w-64 bg-primary text-white h-screen fixed left-0 top-0 flex flex-col z-50"
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <GraduationCap className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-none">LearnOS</h1>
            <p className="text-[10px] text-secondary-container uppercase tracking-widest font-medium mt-1">Executive Suite</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 cursor-pointer hover:bg-white/10 rounded-lg lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
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
    </motion.aside>
  );
};

export default Sidebar;
