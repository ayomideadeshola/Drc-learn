import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl border border-outline-variant shadow-[0_16px_32px_rgba(0,17,58,0.06)] overflow-hidden"
      >
        <div className="p-8 pb-0 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold text-on-surface">Welcome Back</h1>
          <p className="text-on-surface-variant mt-2">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-surface-container-low border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Password</label>
              <button type="button" className="text-[11px] font-bold text-primary hover:underline">Forgot Password?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 group disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-sm text-on-surface-variant">
              Don't have an account? {' '}
              <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </form>

        <div className="p-6 bg-surface-container-low border-t border-outline-variant text-center">
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em]">Demo Credentials</p>
          <div className="mt-3 flex flex-wrap justify-center gap-4">
            <div className="text-[11px] text-on-surface-variant">
              <span className="font-bold text-on-surface">Admin:</span> admin@learnos.com / admin123
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
