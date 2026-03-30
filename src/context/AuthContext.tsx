import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authApi from '../api/auth.js';
import { User } from '../api/auth.js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'user' | 'creator') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authApi.getMe();
        setUser(userData);
      } catch (error: any) {
        if (error.response?.status !== 401) {
          console.error('Auth check failed:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authApi.login({ email, password });
      setUser(userData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(message);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'user' | 'creator' = 'user') => {
    try {
      const userData = await authApi.signup({ email, password, name, role });
      setUser(userData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Signup failed';
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
