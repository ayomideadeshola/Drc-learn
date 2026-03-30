import React from 'react';
import {
  Users,
  GraduationCap,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';
import { ACTIVITIES, COURSES } from '../constants';
import { motion } from 'motion/react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Learners', value: '12,480', trend: 12.5, icon: Users, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Active Courses', value: '48', trend: 4.2, icon: GraduationCap, color: 'bg-emerald-500/10 text-emerald-600' },
    { label: 'Avg. Completion', value: '72%', trend: -2.1, icon: CheckCircle2, color: 'bg-amber-500/10 text-amber-600' },
    { label: 'Learning Hours', value: '8,240', trend: 18.4, icon: Clock, color: 'bg-purple-500/10 text-purple-600' },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="md:flex grid grid-cols-s gap-3 items-end justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-on-surface">Institutional Performance</h1>
            <p className="text-on-surface-variant mt-2">Welcome back, John. Here's what's happening across your organization today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 cursor-pointer bg-surface-container-low text-on-surface font-semibold rounded-md hover:bg-outline-variant transition-all text-sm">
              Export Report
            </button>
            <button className="px-5 py-2.5 cursor-pointer bg-primary text-white font-semibold rounded-md hover:bg-primary-container transition-all shadow-lg shadow-primary/20 text-sm">
              Generate Insights
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-container-lowest p-6 rounded-md border border-outline-variant hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trend > 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                  {stat.trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(stat.trend)}%
                </div>
              </div>
              <p className="text-on-surface-variant text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-display font-bold text-on-surface mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-md border border-outline-variant p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold text-on-surface">Core Learning Modules</h2>
              <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {COURSES.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center gap-6 p-4 hover:bg-surface-container-low rounded-md transition-all group cursor-pointer border border-transparent hover:border-outline-variant">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="text-white fill-white" size={24} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-primary-container text-[#FFFFFF] text-[10px] font-bold rounded uppercase tracking-wider">{course.category}</span>
                      <span className="text-on-surface-variant text-xs">• {course.duration}</span>
                    </div>
                    <h4 className="font-display font-bold text-on-surface truncate group-hover:text-primary transition-colors">{course.title}</h4>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-on-surface-variant font-medium">Progress</span>
                        <span className="text-primary font-bold">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-on-surface-variant hover:bg-surface-container-lowest rounded-lg transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-surface-container-lowest rounded-md border border-outline-variant p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold text-on-surface">Live Activity</h2>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-8">
              {ACTIVITIES.map((activity, index) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {index !== ACTIVITIES.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-[-24px] w-px bg-outline-variant"></div>
                  )}
                  <img src={activity.avatar} alt={activity.user} className="w-12 h-12 rounded-xl object-cover shrink-0 border-2 border-surface-container-lowest" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm text-on-surface">
                      <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-semibold text-primary">{activity.target}</span>
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1 font-medium">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 bg-surface-container-low text-on-surface font-bold rounded-xl hover:bg-outline-variant transition-all text-sm">
              View Full Log
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
