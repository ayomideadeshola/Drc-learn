import React from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Star, 
  Users, 
  Calendar,
  MoreVertical,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const Certifications: React.FC = () => {
  const certifications = [
    { id: '1', title: 'Executive Leadership Professional', provider: 'LearnOS Academy', issued: 1240, rating: 4.9, duration: '6 Months', status: 'Accredited', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800' },
    { id: '2', title: 'Advanced Data Strategy', provider: 'LearnOS Academy', issued: 850, rating: 4.8, duration: '3 Months', status: 'Accredited', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { id: '3', title: 'Digital Transformation Expert', provider: 'LearnOS Academy', issued: 2100, rating: 4.7, duration: '4 Months', status: 'Accredited', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
    { id: '4', title: 'Strategic Financial Planning', provider: 'LearnOS Academy', issued: 640, rating: 4.6, duration: '5 Months', status: 'Accredited', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-on-surface">Accreditation Portal</h1>
          <p className="text-on-surface-variant mt-2">Manage professional certifications and institutional credentials.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 text-sm flex items-center gap-2">
            <Plus size={18} />
            <span>Create Track</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary-container text-primary rounded-xl">
              <Award size={20} />
            </div>
            <h3 className="text-sm font-bold text-on-surface">Total Issued</h3>
          </div>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-display font-bold text-on-surface">4,830</h4>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={14} />
              <span>15.2%</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-secondary-container text-secondary rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-bold text-on-surface">Active Tracks</h3>
          </div>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-display font-bold text-on-surface">12</h4>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={14} />
              <span>2.5%</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-sm font-bold text-on-surface">Verification Rate</h3>
          </div>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-display font-bold text-on-surface">99.8%</h4>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={14} />
              <span>0.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface-container-lowest rounded-3xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    {cert.status}
                  </span>
                </div>
                <h3 className="text-white font-display font-bold leading-tight group-hover:text-secondary-container transition-colors">{cert.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold text-on-surface">{cert.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant">
                  <Users size={14} />
                  <span>{cert.issued.toLocaleString()} Issued</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                  <Calendar size={14} className="text-primary" />
                  <span>{cert.duration}</span>
                </div>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Issuance Table */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-8 border-b border-outline-variant flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-on-surface">Recent Issuance</h2>
          <button className="text-primary text-sm font-bold hover:underline">View All Records</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Learner</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Certification Track</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Issue Date</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Credential ID</th>
                <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {[
                { name: 'Alex Thompson', track: 'Executive Leadership Professional', date: 'Mar 18, 2026', id: 'CERT-12480-AT' },
                { name: 'Jessica Chen', track: 'Advanced Data Strategy', date: 'Mar 17, 2026', id: 'CERT-12481-JC' },
                { name: 'Marcus Wright', track: 'Digital Transformation Expert', date: 'Mar 15, 2026', id: 'CERT-12482-MW' },
                { name: 'Sarah Miller', track: 'Strategic Financial Planning', date: 'Mar 14, 2026', id: 'CERT-12483-SM' },
              ].map((record, index) => (
                <tr key={index} className="hover:bg-surface-container-low transition-all group">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{record.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-on-surface-variant">{record.track}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-on-surface-variant">{record.date}</span>
                  </td>
                  <td className="px-8 py-5">
                    <code className="text-xs font-mono bg-surface-container-low px-2 py-1 rounded text-primary font-bold">{record.id}</code>
                  </td>
                  <td className="px-8 py-5">
                    <button className="text-xs font-bold text-primary hover:underline">Download PDF</button>
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

export default Certifications;
