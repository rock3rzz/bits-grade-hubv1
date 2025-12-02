import React from 'react';
import { Scale, AlertCircle, FileText } from 'lucide-react';

const Policy: React.FC = () => {
  return (
    <section id="policy" className="scroll-mt-32 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
      <div className="flex items-center gap-4 mb-10 justify-center">
        <Scale className="text-bits-blue dark:text-bits-cyan" size={28} />
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Grading & Policy</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Weightage */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-6 flex items-center gap-3">
            <FileText size={18} className="text-slate-400" /> Evaluation Split
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Graded Quizzes</span>
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">30%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Assignments</span>
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">20%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Comprehensive Exam</span>
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">50%</span>
            </div>
          </div>
        </div>

        {/* Card 2: Grade Points */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
           <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-6">
             Grade Points
           </h3>
           <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300 font-medium">A</span><span className="font-mono font-bold dark:text-white">10</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300 font-medium">A-</span><span className="font-mono font-bold dark:text-white">9</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300 font-medium">B</span><span className="font-mono font-bold dark:text-white">8</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300 font-medium">B-</span><span className="font-mono font-bold dark:text-white">7</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300 font-medium">C</span><span className="font-mono font-bold dark:text-white">6</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300 font-medium">C-</span><span className="font-mono font-bold dark:text-white">5</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300 font-medium">D</span><span className="font-mono font-bold dark:text-white">4</span></div>
              <div className="flex justify-between"><span className="text-bits-red font-bold">E (Fail)</span><span className="font-mono font-bold text-bits-red">2</span></div>
           </div>
           <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Non-letter grades (Excellent, Good, S, U) carry <strong>0 grade points</strong>.
              </p>
           </div>
        </div>

        {/* Card 3: Rules */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-6">
             Official Rules
          </h3>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
            <li className="flex gap-3">
               <span className="text-bits-blue dark:text-bits-cyan font-bold">•</span>
               <span>
                 <strong>Relative Grading:</strong> Based on batch distribution (histogram). No fixed cutoffs.
               </span>
            </li>
            <li className="flex gap-3">
               <span className="text-bits-blue dark:text-bits-cyan font-bold">•</span>
               <span>
                 <strong>CGPA Calculation:</strong> <br/>
                 <code className="font-mono text-xs bg-slate-100 dark:bg-black/30 px-2 py-0.5 rounded mt-1 inline-block">Σ(units × grade points) / Σ(units)</code>
               </span>
            </li>
            <li className="flex gap-3">
               <span className="text-bits-blue dark:text-bits-cyan font-bold">•</span>
               <span>
                 <strong>Repeats:</strong> New grade replaces old grade in CGPA.
               </span>
            </li>
            <li className="flex gap-3">
               <span className="text-bits-blue dark:text-bits-cyan font-bold">•</span>
               <span>
                 <strong>Status Flags:</strong> AC, NC, AU, RC, DP, RRA, EL, S, U, W are statuses, not points.
               </span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
          <AlertCircle size={14} />
          For reference only; official decisions are made by BITS Pilani.
        </p>
      </div>
    </section>
  );
};

export default Policy;