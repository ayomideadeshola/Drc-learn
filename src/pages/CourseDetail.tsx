import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  MessageSquare, 
  Share2, 
  MoreVertical,
  Star,
  Users,
  Calendar,
  Lock
} from 'lucide-react';
import { COURSES } from '../constants';
import { motion } from 'motion/react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id) || COURSES[0];
  const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'discussion'>('content');

  const syllabus = [
    { 
      title: 'Introduction to Strategic Leadership', 
      duration: '45m',
      lessons: [
        { title: 'The Evolution of Modern Leadership', duration: '12:45', completed: true },
        { title: 'Defining Your Leadership Style', duration: '18:20', completed: true },
        { title: 'Core Competencies for Executives', duration: '14:15', completed: false },
      ]
    },
    { 
      title: 'Strategic Decision Making Frameworks', 
      duration: '1h 15m',
      lessons: [
        { title: 'Cognitive Biases in Decision Making', duration: '22:10', completed: false, locked: true },
        { title: 'The OODA Loop in Business', duration: '15:45', completed: false, locked: true },
        { title: 'Scenario Planning & Risk Mitigation', duration: '35:20', completed: false, locked: true },
      ]
    },
    { 
      title: 'Building High-Performance Teams', 
      duration: '55m',
      lessons: [
        { title: 'Psychological Safety & Trust', duration: '20:15', completed: false, locked: true },
        { title: 'Conflict Resolution Strategies', duration: '18:30', completed: false, locked: true },
        { title: 'Empowerment & Delegation', duration: '16:45', completed: false, locked: true },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs & Actions */}
      <div className="flex items-center justify-between">
        <Link to="/courses" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-bold text-sm group">
          <div className="p-1.5 bg-surface-container-low rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
            <ChevronLeft size={18} />
          </div>
          <span>Back to Library</span>
        </Link>
        <div className="flex gap-3">
          <button className="p-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface rounded-xl transition-all border border-outline-variant">
            <Share2 size={20} />
          </button>
          <button className="p-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface rounded-xl transition-all border border-outline-variant">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Player */}
          <div className="bg-black rounded-3xl overflow-hidden aspect-video relative group shadow-2xl">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 transform hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Play className="text-white fill-white ml-1" size={32} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-white font-display font-bold text-lg">1.3 Core Competencies for Executives</h4>
                  <p className="text-white/60 text-sm font-medium">Strategic Leadership & Management • Module 1</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white text-sm font-bold">14:15</span>
                  <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-container text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">{course.category}</span>
              <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                <Star size={16} fill="currentColor" />
                <span>{course.rating} (1.2k reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-display font-bold text-on-surface leading-tight mb-6">{course.title}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Instructor</p>
                <p className="text-sm font-bold text-on-surface">{course.instructor}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Duration</p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-on-surface">
                  <Clock size={14} className="text-primary" />
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Level</p>
                <p className="text-sm font-bold text-on-surface">{course.level}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Enrolled</p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-on-surface">
                  <Users size={14} className="text-primary" />
                  <span>{course.enrolled.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex border-b border-outline-variant mb-8">
              {['content', 'resources', 'discussion'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="prose prose-sm max-w-none text-on-surface-variant leading-relaxed">
              <p>
                This comprehensive executive program is designed to equip senior leaders with the frameworks and mental models necessary to navigate complex organizational challenges. Through a blend of theoretical insights and practical case studies, you will learn how to align strategy with execution, build resilient teams, and drive sustainable growth in a rapidly changing global landscape.
              </p>
              <h4 className="text-on-surface font-display font-bold mt-6 mb-3">Key Learning Objectives:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                {[
                  'Master strategic decision-making frameworks',
                  'Build and lead high-performance executive teams',
                  'Drive organizational digital transformation',
                  'Navigate complex financial risk landscapes',
                  'Enhance executive communication and influence',
                  'Implement agile methodologies at scale'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar / Curriculum */}
        <div className="space-y-8">
          {/* Live Training Card */}
          <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-display font-bold mb-2">Live Training Session</h3>
            <p className="text-white/60 text-sm mb-6">Join Dr. Sarah Jenkins for a live Q&A session on strategic frameworks.</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl backdrop-blur-md">
                <Calendar size={16} />
                <span className="text-xs font-bold">Today, 2:00 PM</span>
              </div>
            </div>
            <button className="w-full py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary-container hover:text-secondary transition-all shadow-lg shadow-secondary/20">
              Join Session
            </button>
          </div>

          {/* Curriculum */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold text-on-surface">Course Curriculum</h2>
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">12% Complete</span>
            </div>
            
            <div className="space-y-6">
              {syllabus.map((section, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-on-surface">{section.title}</h4>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{section.duration}</span>
                  </div>
                  <div className="space-y-2">
                    {section.lessons.map((lesson, j) => (
                      <div key={j} className={`flex items-center gap-4 p-3 rounded-xl transition-all border ${lesson.locked ? 'opacity-50 cursor-not-allowed border-transparent' : 'hover:bg-surface-container-low border-transparent hover:border-outline-variant cursor-pointer group'}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${lesson.completed ? 'bg-emerald-500/10 text-emerald-600' : lesson.locked ? 'bg-surface-container-low text-on-surface-variant' : 'bg-primary-container text-primary'}`}>
                          {lesson.completed ? <CheckCircle2 size={16} /> : lesson.locked ? <Lock size={16} /> : <Play size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${lesson.completed ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>{lesson.title}</p>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">{lesson.duration}</p>
                        </div>
                        {!lesson.locked && !lesson.completed && (
                          <Download size={14} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 shadow-sm">
            <h2 className="text-xl font-display font-bold text-on-surface mb-8">Resource Library</h2>
            <div className="space-y-4">
              {[
                { title: 'Strategic Frameworks PDF', size: '2.4 MB', type: 'PDF' },
                { title: 'Decision Matrix Template', size: '1.1 MB', type: 'XLSX' },
                { title: 'Case Study: Digital Pivot', size: '4.8 MB', type: 'PDF' },
              ].map((res, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-outline-variant">
                  <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">{res.title}</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">{res.size} • {res.type}</p>
                  </div>
                  <Download size={18} className="text-on-surface-variant hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
