import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { GraduationCap, ArrowUp, AlertTriangle } from 'lucide-react';
import GradientBlinds from './GradientBlinds';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDark, toggleTheme }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const darkColors = ['#0F2445', '#172554', '#0B111A'];
  // Refined light colors: Ice Blue, Pale Gold, Slate to give more character than plain gray
  const lightColors = ['#EFF6FF', '#FEFCE8', '#F1F5F9'];
  const activeColors = isDark ? darkColors : lightColors;

  return (
    <div className={`flex flex-col min-h-screen relative w-full overflow-x-hidden ${isDark ? 'dark' : ''}`}>
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-screen w-full">
        <GradientBlinds
            gradientColors={activeColors}
            angle={120}
            noise={isDark ? 0.08 : 0.04}
            blindCount={12} 
            blindMinWidth={20}
            spotlightRadius={0.6}
            spotlightSoftness={0.8}
            spotlightOpacity={isDark ? 1 : 0.8}
            mouseDampening={0.1}
            distortAmount={0.2}
            shineDirection="top"
            mixBlendMode={isDark ? "screen" : "multiply"}
            isDark={isDark}
        />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-bits-gold/10 dark:bg-bits-gold/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none opacity-40"></div>
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#05090F]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-sm dark:shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4 select-none cursor-pointer group" onClick={scrollToTop}>
            <div className="w-10 h-10 bg-bits-blue dark:bg-white rounded-lg shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 group-hover:rotate-3 shrink-0">
              <GraduationCap className="text-bits-gold dark:text-bits-blue" size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-bits-blue dark:text-white leading-none group-hover:text-bits-gold dark:group-hover:text-bits-cyan transition-colors drop-shadow-sm whitespace-nowrap">
                BITS Grade Hub
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 dark:text-slate-300">
              <button onClick={() => scrollToSection('calculators')} className="hover:text-bits-blue dark:hover:text-white transition-colors relative group py-2">
                Calculators
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bits-blue dark:bg-bits-cyan transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('journey')} className="hover:text-bits-blue dark:hover:text-white transition-colors relative group py-2">
                Curriculum
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bits-blue dark:bg-bits-cyan transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('policy')} className="hover:text-bits-blue dark:hover:text-white transition-colors relative group py-2">
                Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bits-blue dark:bg-bits-cyan transition-all group-hover:w-full"></span>
              </button>
            </nav>
            
            {/* Right Cluster */}
            <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full pl-4 pr-1 py-1 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-bits-gold/50 transition-colors">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wide uppercase hidden sm:block">Unofficial</span>
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col pt-28 flex-1 overflow-x-hidden">
        <main className="w-full pb-12">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-12 mt-auto relative z-20 bg-slate-50/80 dark:bg-[#05090F]/90 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center gap-8 select-none text-center">
              
              {/* Signature / Humor Block */}
              <div className="flex flex-col items-center gap-3 group">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-800 dark:text-slate-200 transform group-hover:-rotate-12 transition-transform duration-500">
                      <path d="M2.5 10.5C2.5 10.5 5 9.5 7 11C7 11 8.5 7.5 12 7.5C15.5 7.5 17 11 17 11C19 9.5 21.5 10.5 21.5 10.5C21.5 10.5 20.5 15.5 12 15.5C3.5 15.5 2.5 10.5 2.5 10.5Z" />
                  </svg>
                  <p className="font-mono text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium tracking-tight">
                    vibe-coded and stitched together by rk during questionable hours.
                  </p>
              </div>

              {/* Separator */}
              <div className="w-16 h-px bg-slate-200 dark:bg-slate-800"></div>

              {/* Official Disclaimer */}
              <div className="space-y-2 max-w-lg">
                  <p className="text-[11px] text-slate-900 dark:text-slate-200 font-bold uppercase tracking-[0.15em]">
                      BITS Grade Hub · Unofficial
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      This application is a student-led initiative and is <strong className="text-slate-700 dark:text-slate-300">not affiliated with, endorsed by, or connected to BITS Pilani</strong>. 
                      Academic decisions are solely made by the Institute.
                  </p>
              </div>
          </div>
      </footer>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-6 md:right-24 z-40 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-bits-blue dark:hover:text-bits-cyan rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;