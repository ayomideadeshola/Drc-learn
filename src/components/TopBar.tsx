import { Search, Bell, User, ChevronDown, HelpCircle, Menu } from 'lucide-react';
import React, { useState } from 'react';

interface TopBarProps {
  onMenuClick: () => void
}
const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [profile, setProfile] = useState({
    name: "Ayomide Joseph",
    role: "System Administrator",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRBQNLO5G80U13E2OG_2VW1cuyPritJ3TziMTvtIEx0YlB5mUTcQhRRO7pKf1afUcEc1VK105g19dW3zYFSjkGNwBNZwn6zTNn6y1TnLDhglZUQKbIntfpVcjtMxvN2ujLz94lykq9CXilEh62OmEtPsQcB6gkHMlUYuAKeBhukiv4BnU1r1R-kTDmCO7pq4_ZL6WJmEJ8GyOYCrIN-uLJH0poheboLMP78cZHgeBVJ_ICByu5xcnGWpRzq65d7TYre8dP4lSWiHQ"
  });

  const getInitial = (name: string) => {
    const userName = name.split(" ");
    return userName.map(n => n[0]).join("").toUpperCase();
  }

  return (
    <>
      <header className="h-20 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            onClick={onMenuClick}
            className="p-2 cursor-pointer hover:bg-surface-container-low rounded-xl transition-all text-on-surface-variant lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search courses, users, or analytics..."
              className="w-full bg-surface-container-low border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="p-2.5 cursor-pointer hover:bg-surface-container-low rounded-xl transition-all text-on-surface-variant relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface-container-lowest"></span>
            </button>
            <button className="p-2.5 cursor-pointer hover:bg-surface-container-low rounded-xl transition-all text-on-surface-variant">
              <HelpCircle size={20} />
            </button>
          </div>

          <div className="h-8 w-px bg-outline-variant mx-2"></div>

          <button className="flex cursor-pointer items-center gap-3 p-1.5 hover:bg-surface-container-low rounded-2xl transition-all group">
            {profile.image ? (
              <>
                <img alt="User profile avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src={profile.image} />
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary font-bold shadow-sm">
                  {getInitial(profile.image)}
                </div>
              </>
            )}
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-on-surface leading-none">{profile.name}</p>
              <p className="text-[11px] text-on-surface-variant mt-1">{profile.role}</p>
            </div>
            <ChevronDown size={16} className="text-on-surface-variant group-hover:text-on-surface transition-colors" />
          </button>
        </div>
      </header>
    </>
  );
};

export default TopBar;
