import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';

const Analytics: React.FC = () => {
  const departmentStats = [
    { name: 'Operations', learners: 450, completion: 82, trend: 5.4 },
    { name: 'Product Management', learners: 320, completion: 75, trend: -2.1 },
    { name: 'Engineering', learners: 840, completion: 68, trend: 12.8 },
    { name: 'Human Resources', learners: 120, completion: 94, trend: 0.5 },
    { name: 'Marketing', learners: 280, completion: 71, trend: 4.2 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-on-surface">Analytics Dashboard</h1>
          <p className="text-on-surface-variant mt-2">Detailed insights into your organization's learning performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface font-semibold rounded-xl hover:bg-outline-variant transition-all text-sm">
            <Calendar size={18} />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface font-semibold rounded-xl hover:bg-outline-variant transition-all text-sm">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 text-sm">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Activity Chart Placeholder */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-display font-bold text-on-surface">Weekly Activity</h2>
              <p className="text-sm text-on-surface-variant mt-1">Total learning hours per day</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs font-bold text-on-surface-variant">Current Week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-outline-variant rounded-full"></div>
                <span className="text-xs font-bold text-on-surface-variant">Previous Week</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[65, 45, 80, 55, 90, 70, 40].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative flex items-end justify-center gap-1 h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height - 15}%` }}
                    transition={{ delay: i * 0.05, duration: 1 }}
                    className="w-full max-w-[40px] bg-outline-variant/30 rounded-t-lg"
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.05 + 0.2, duration: 1 }}
                    className="w-full max-w-[40px] bg-primary rounded-t-lg absolute bottom-0 group-hover:bg-secondary transition-colors"
                  />
                </div>
                <span className="text-xs font-bold text-on-surface-variant">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Learner Status Distribution */}
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 shadow-sm">
          <h2 className="text-xl font-display font-bold text-on-surface mb-8">Learner Status</h2>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-surface-container-low" />
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray="502.4" strokeDashoffset="125.6" className="text-primary" />
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray="502.4" strokeDashoffset="376.8" className="text-secondary" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-bold text-on-surface">12.4k</span>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Learners</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10 w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-xs font-bold text-on-surface-variant">Active</span>
                </div>
                <p className="text-lg font-display font-bold text-on-surface">75%</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-xs font-bold text-on-surface-variant">Completed</span>
                </div>
                <p className="text-lg font-display font-bold text-on-surface">20%</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-outline-variant rounded-full"></div>
                  <span className="text-xs font-bold text-on-surface-variant">Inactive</span>
                </div>
                <p className="text-lg font-display font-bold text-on-surface">5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance Table */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-8 border-b border-outline-variant flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-on-surface">Department Performance</h2>
          <button className="text-primary text-sm font-bold hover:underline">View Detailed Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Department</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total Learners</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Completion Rate</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Trend</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {departmentStats.map((dept) => (
                <tr key={dept.name} className="hover:bg-surface-container-low transition-all group">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{dept.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-on-surface-variant">{dept.learners}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden max-w-[120px]">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${dept.completion}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-on-surface">{dept.completion}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`flex items-center gap-1 text-xs font-bold ${dept.trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {dept.trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {Math.abs(dept.trend)}%
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <button className="text-xs font-bold text-primary hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
