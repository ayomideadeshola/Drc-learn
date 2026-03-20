import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  Users, 
  Clock, 
  BookOpen,
  Play
} from 'lucide-react';
import { COURSES } from '../constants';
import { motion } from 'motion/react';

const Courses: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const categories = ['All Courses', 'Leadership', 'Analytics', 'Technology', 'Finance', 'Management', 'Soft Skills'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-on-surface">Course Library</h1>
          <p className="text-on-surface-variant mt-2">Explore our comprehensive suite of executive learning modules.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 text-sm">
            Create New Course
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-outline-variant hover:text-on-surface'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="Search library..." 
              className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <div className="flex bg-surface-container-low rounded-xl p-1 border border-outline-variant">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {COURSES.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-surface-container-lowest rounded-3xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer ${view === 'list' ? 'flex items-center gap-8 p-4' : ''}`}
          >
            <div className={`relative overflow-hidden ${view === 'list' ? 'w-64 h-40 rounded-2xl shrink-0' : 'aspect-video'}`}>
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play className="text-white fill-white ml-1" size={28} />
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">{course.category}</span>
              </div>
            </div>

            <div className={`p-6 flex-1 ${view === 'list' ? 'p-0' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold text-on-surface">{course.rating}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${course.level === 'Advanced' ? 'bg-red-500/10 text-red-600' : course.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                  {course.level}
                </span>
              </div>
              
              <h3 className="text-lg font-display font-bold text-on-surface leading-tight group-hover:text-primary transition-colors mb-4">{course.title}</h3>
              
              <div className="flex items-center gap-4 text-on-surface-variant text-xs font-medium mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  <span>{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>{course.enrolled.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-outline-variant">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-xs font-bold text-on-surface">{course.instructor}</span>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">Preview Course</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
