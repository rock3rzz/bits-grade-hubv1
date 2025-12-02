import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Calculator, ScrollText, AlertTriangle } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleText = "BITS Grade Hub";
  const letters = titleText.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 } 
    }
  };

  return (
    <div id="home" className="flex flex-col items-center justify-center py-16 lg:py-28 text-center max-w-5xl mx-auto relative perspective-1000 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 space-y-6 md:space-y-8 w-full"
      >
        {/* Title Container */}
        <div className="relative inline-block w-full">
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight break-words"
          >
            {letters.map((char, index) => (
              <motion.span 
                key={index} 
                variants={childVariants}
                className={`inline-block ${index > 4 ? 'text-transparent bg-clip-text bg-gradient-to-r from-bits-blue to-bits-cyan dark:from-white dark:to-slate-300' : 'text-bits-blue dark:text-white'}`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="hidden md:block absolute -top-6 -right-16 rotate-12"
          >
            <span className="bg-bits-gold text-bits-blue text-sm font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white dark:border-[#0B111A]">
              Unofficial
            </span>
          </motion.div>
        </div>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-slate-600 dark:text-slate-200 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium px-2"
        >
          The unofficial guide that should’ve been official. Made by a student who got tired of guessing his own GPA and reading that <span className="text-bits-blue dark:text-white font-semibold">TABLE PDF</span>.
        </motion.p>

        {/* Disclaimer Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-full px-4 py-1.5"
        >
           <AlertTriangle size={14} className="text-amber-600 dark:text-amber-500" />
           <span className="text-[10px] md:text-xs font-bold text-amber-800 dark:text-amber-500 uppercase tracking-wide">
             Independent Student Project • Not Official
           </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center pt-6 md:pt-8 w-full max-w-md mx-auto sm:max-w-none"
        >
            <button 
                onClick={() => scrollTo('calculators')}
                className="group relative flex items-center justify-center gap-3 bg-bits-blue dark:bg-white text-white dark:text-bits-blue px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-bits-blue/20 hover:shadow-bits-blue/40 dark:shadow-white/10 hover:-translate-y-1 transition-all overflow-hidden w-full sm:w-auto"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Calculator size={20} />
                <span>Open Calculator</span>
            </button>
            <button 
                onClick={() => scrollTo('policy')}
                className="flex items-center justify-center gap-3 bg-white/50 dark:bg-white/5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-bits-gold hover:text-bits-gold dark:hover:border-bits-gold dark:hover:text-bits-gold transition-all backdrop-blur-sm hover:-translate-y-1 w-full sm:w-auto"
            >
                <ScrollText size={20} />
                <span>Grading Policy</span>
            </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;