import React from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  BarChart3,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';

const Assessments: React.FC = () => {
  const assessments = [
    { id: '1', title: 'Strategic Leadership Final', course: 'Strategic Leadership & Management', type: 'Final Exam', questions: 50, duration: '60m', status: 'Active', completions: 840, avgScore: 78 },
    { id: '2', title: 'Data Analytics Quiz 1', course: 'Data-Driven Decision Making', type: 'Quiz', questions: 15, duration: '20m', status: 'Active', completions: 1240, avgScore: 82 },
    { id: '3', title: 'Digital Transformation Midterm', course: 'Digital Transformation Strategy', type: 'Midterm', questions: 30, duration: '45m', status: 'Draft', completions: 0, avgScore: 0 },
    { id: '4', title: 'Financial Risk Assessment', course: 'Financial Risk Management', type: 'Assessment', questions: 40, duration: '50m', status: 'Active', completions: 420, avgScore: 74 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-on-surface">Assessments & Quizzes</h1>
          <p className="text-on-surface-variant mt-2">Create, manage, and analyze learner evaluations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 text-sm flex items-center gap-2">
            <Plus size={18} />
            <span>Create Assessment</span>
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary-container text-primary rounded-xl">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-sm font-bold text-on-surface">Avg. Passing Rate</h3>
          </div>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-display font-bold text-on-surface">84.2%</h4>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={14} />
              <span>3.2%</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-secondary-container text-secondary rounded-xl">
              <Users size={20} />
            </div>
            <h3 className="text-sm font-bold text-on-surface">Total Attempts</h3>
          </div>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-display font-bold text-on-surface">24,840</h4>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={14} />
              <span>12.5%</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-sm font-bold text-on-surface">High Performers</h3>
          </div>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-display font-bold text-on-surface">1,240</h4>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={14} />
              <span>8.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative flex-1 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text" 
            placeholder="Search assessments..." 
            className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface font-semibold rounded-xl hover:bg-outline-variant transition-all text-sm">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface font-semibold rounded-xl hover:bg-outline-variant transition-all text-sm">
            <span>Sort by: Newest</span>
          </button>
        </div>
      </div>

      {/* Assessments List */}
      <div className="grid grid-cols-1 gap-6">
        {assessments.map((assessment, index) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
              <ClipboardCheck size={32} />
            </div>
            
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${assessment.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                  {assessment.status}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">• {assessment.type}</span>
              </div>
              <h3 className="text-lg font-display font-bold text-on-surface truncate group-hover:text-primary transition-colors">{assessment.title}</h3>
              <p className="text-sm text-on-surface-variant font-medium mt-1">{assessment.course}</p>
            </div>

            <div className="flex items-center gap-8 shrink-0">
              <div className="text-center">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Questions</p>
                <p className="text-sm font-bold text-on-surface">{assessment.questions}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Duration</p>
                <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-on-surface">
                  <Clock size={14} className="text-primary" />
                  <span>{assessment.duration}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Avg. Score</p>
                <p className={`text-sm font-bold ${assessment.avgScore >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {assessment.avgScore}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button className="px-4 py-2 bg-surface-container-low text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all text-xs">
                Edit Quiz
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all">
                <MoreVertical size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Assessments;
