import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

interface WhatIfSimulatorProps {
  onSimulationChange: (total: number) => void;
}

const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ onSimulationChange }) => {
  const [quizAvg, setQuizAvg] = useState(80);
  const [assignmentAvg, setAssignmentAvg] = useState(80);
  const [examScore, setExamScore] = useState(60);
  const [total, setTotal] = useState(0);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('bgh_whatif_state');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.quizAvg !== undefined) setQuizAvg(data.quizAvg);
        if (data.assignmentAvg !== undefined) setAssignmentAvg(data.assignmentAvg);
        if (data.examScore !== undefined) setExamScore(data.examScore);
      } catch (e) {
        console.error("Failed to load WhatIf state", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('bgh_whatif_state', JSON.stringify({ quizAvg, assignmentAvg, examScore }));
  }, [quizAvg, assignmentAvg, examScore]);

  useEffect(() => {
    // 30% Quizzes, 20% Assignments, 50% Final
    const t = (quizAvg * 0.3) + (assignmentAvg * 0.2) + (examScore * 0.5);
    setTotal(t);
    onSimulationChange(t);
  }, [quizAvg, assignmentAvg, examScore]);

  const handleReset = () => {
      setQuizAvg(80);
      setAssignmentAvg(80);
      setExamScore(60);
      localStorage.removeItem('bgh_whatif_state');
  };

  const Slider = ({ label, val, setVal, weight }: { label: string, val: number, setVal: (n: number) => void, weight: string }) => (
    <div className="space-y-3 touch-none">
      <div className="flex justify-between items-end select-none">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">{label}</label>
        <span className="text-sm font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-right min-w-[3rem]">{val}%</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100"
        step="1"
        value={val} 
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-bits-blue dark:accent-bits-gold hover:accent-bits-gold transition-all touch-none focus:outline-none focus:ring-2 focus:ring-bits-blue/30 dark:focus:ring-bits-gold/30"
      />
      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
        <span>0%</span>
        <span className="text-bits-blue dark:text-bits-cyan">{weight} Weight</span>
        <span>100%</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-8 select-none">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-bits-blue dark:bg-bits-cyan animate-pulse shadow-[0_0_10px_currentColor]"></div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">What-If Simulator</h3>
        </div>
        <button 
            onClick={handleReset}
            className="text-slate-400 hover:text-bits-blue dark:hover:text-bits-gold transition-colors p-1"
            title="Reset to defaults"
        >
            <RefreshCcw size={14} />
        </button>
      </div>
      
      <div className="space-y-8">
        <Slider label="Quiz Average" val={quizAvg} setVal={setQuizAvg} weight="30%" />
        <Slider label="Assignment Avg" val={assignmentAvg} setVal={setAssignmentAvg} weight="20%" />
        <Slider label="Final Exam" val={examScore} setVal={setExamScore} weight="50%" />
      </div>

      <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
        <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">Simulated Total</span>
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
                {total.toFixed(1)}<span className="text-xl text-slate-400">%</span>
            </span>
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulator;