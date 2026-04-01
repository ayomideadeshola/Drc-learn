import React, { useState } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  Star, 
  Users, 
  Clock, 
  BookOpen,
  Play,
  Plus
} from 'lucide-react';
import { COURSES } from '../constants';
import { motion } from 'motion/react';

const Courses: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = ['All Courses', 'Leadership', 'Analytics', 'Technology', 'Finance', 'Management', 'Soft Skills'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-on-surface">Course Library</h1>
          <p className="text-on-surface-variant mt-1 text-sm sm:text-base">
            Explore our comprehensive suite of executive learning modules.
          </p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm whitespace-nowrap">
          <Plus size={16} />
          <span>New Course</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl border border-outline-variant p-4 sm:p-6 shadow-sm space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === i
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-outline-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + View Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input
              type="text"
              placeholder="Search library..."
              className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <div className="flex bg-surface-container-low rounded-xl p-1 border border-outline-variant shrink-0">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid / List */}
      <div className={`grid gap-5 sm:gap-6 lg:gap-8 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {COURSES.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-surface-container-lowest rounded-2xl sm:rounded-3xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer ${
              view === 'list' ? 'flex flex-col sm:flex-row sm:items-center sm:gap-6 sm:p-4' : ''
            }`}
          >
            {/* Thumbnail */}
            <div className={`relative overflow-hidden shrink-0 ${
              view === 'list'
                ? 'w-full h-48 sm:w-52 sm:h-36 sm:rounded-2xl'
                : 'aspect-video'
            }`}>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play className="text-white fill-white ml-1" size={24} />
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
                  {course.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 p-4 sm:p-5 ${view === 'list' ? 'sm:p-0' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={13} fill="currentColor" />
                  <span className="text-xs font-bold text-on-surface">{course.rating}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  course.level === 'Advanced'
                    ? 'bg-red-500/10 text-red-600'
                    : course.level === 'Intermediate'
                    ? 'bg-blue-500/10 text-blue-600'
                    : 'bg-emerald-500/10 text-emerald-600'
                }`}>
                  {course.level}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-display font-bold text-on-surface leading-tight group-hover:text-primary transition-colors mb-3">
                {course.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-on-surface-variant text-xs font-medium mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen size={13} />
                  <span>{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} />
                  <span>{course.enrolled.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    {course.instructor.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <span className="text-xs font-bold text-on-surface truncate max-w-[120px]">{course.instructor}</span>
                </div>
                <button className="text-xs font-bold text-primary hover:underline whitespace-nowrap ml-2">
                  Preview
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;