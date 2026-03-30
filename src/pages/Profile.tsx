import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Edit2, Camera } from 'lucide-react';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-on-surface">My Profile</h1>
          <p className="text-on-surface-variant mt-1">Manage your account settings and preferences</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-medium">
          <Edit2 size={18} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-md border border-outline-variant p-8 text-center shadow">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-3xl bg-primary-container flex items-center justify-center text-primary text-4xl font-bold shadow-inner overflow-hidden">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-outline-variant rounded-xl text-primary hover:bg-surface-container-low transition-all shadow-sm">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-on-surface mt-6">{user.name}</h2>
            <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold mt-1">{user.role}</p>
            
            <div className="mt-8 pt-8 border-t border-outline-variant space-y-4">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Mail size={18} className="text-primary" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Shield size={18} className="text-primary" />
                <span className="text-sm capitalize">{user.role} Access</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Calendar size={18} className="text-primary" />
                <span className="text-sm">Joined March 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Settings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-md border border-outline-variant p-8 shadow">
            <h3 className="text-lg font-bold text-on-surface mb-6">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">First Name</p>
                <p className="text-sm text-on-surface">{user.name.split(' ')[0]}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Last Name</p>
                <p className="text-sm text-on-surface">{user.name.split(' ').slice(1).join(' ')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email Address</p>
                <p className="text-sm text-on-surface">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md border border-outline-variant p-8 shadow">
            <h3 className="text-lg font-bold text-on-surface mb-6">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Two-Factor Authentication</p>
                    <p className="text-xs text-on-surface-variant">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">Enable</button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Password</p>
                    <p className="text-xs text-on-surface-variant">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
