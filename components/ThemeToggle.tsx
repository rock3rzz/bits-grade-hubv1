import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bits-gold dark:focus:ring-offset-slate-900"
      aria-label="Toggle Theme"
    >
      <motion.div
        className="absolute top-1 left-1 bg-white dark:bg-slate-700 w-6 h-6 rounded-full shadow-sm flex items-center justify-center text-bits-gold dark:text-bits-cyan"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;