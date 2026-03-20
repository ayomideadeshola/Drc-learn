import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { motion, AnimatePresence } from 'motion/react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopBar />
        <div className="p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
