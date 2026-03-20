import React, { useState } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Mail, 
  Shield, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { USERS } from '../constants';
import { motion } from 'motion/react';

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-on-surface">User Management</h1>
          <p className="text-on-surface-variant mt-2">Manage learners, instructors, and administrative access.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-low text-on-surface font-semibold rounded-xl hover:bg-outline-variant transition-all text-sm">
            Bulk Import
          </button>
          <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 text-sm">
            Add New User
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <button className="p-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface rounded-xl transition-all border border-outline-variant">
            <Filter size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm font-bold text-on-surface-variant">
            <span>Show:</span>
            <select className="bg-transparent border-none outline-none text-primary cursor-pointer">
              <option>All Users</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-all">
            <Download size={18} />
            <span>Export List</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">User</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Role & Dept</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Learning Progress</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Last Active</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {USERS.map((user, index) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-surface-container-low transition-all group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover shrink-0 border border-outline-variant" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{user.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                        <Shield size={14} className="text-primary" />
                        <span>{user.role}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium">{user.department}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden max-w-[120px]">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${user.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <span className="text-sm font-bold text-on-surface">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' :
                      user.status === 'Inactive' ? 'bg-red-500/10 text-red-600' :
                      'bg-amber-500/10 text-amber-600'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle2 size={12} /> :
                       user.status === 'Inactive' ? <XCircle size={12} /> :
                       <Loader2 size={12} className="animate-spin" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                      <Clock size={14} />
                      <span>{user.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-on-surface-variant hover:bg-white hover:text-primary rounded-lg transition-all shadow-sm border border-transparent hover:border-outline-variant">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-on-surface-variant hover:bg-white hover:text-primary rounded-lg transition-all shadow-sm border border-transparent hover:border-outline-variant">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-6 border-t border-outline-variant flex items-center justify-between bg-surface-container-low/30">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Showing 1 to 5 of 1,240 users</p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-outline-variant rounded-lg text-on-surface-variant hover:text-primary transition-all disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3, '...', 12].map((page, i) => (
              <button 
                key={i} 
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${page === 1 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white border border-outline-variant text-on-surface-variant hover:text-primary'}`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 bg-white border border-outline-variant rounded-lg text-on-surface-variant hover:text-primary transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
