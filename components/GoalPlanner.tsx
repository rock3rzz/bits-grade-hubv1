import React, { useState, useEffect } from 'react';
import { Target, TrendingUp } from 'lucide-react';

const GoalPlanner: React.FC = () => {
  const [currentCGPA, setCurrentCGPA] = useState<string>('');
  const [completedUnits, setCompletedUnits] = useState<string>('');
  const [targetCGPA, setTargetCGPA] = useState<string>('');
  const [remainingUnits, setRemainingUnits] = useState<string>('');
  const [requiredGPA, setRequiredGPA] = useState<number | null>(null);

  useEffect(() => {
    const curr = parseFloat(currentCGPA);
    const comp = parseFloat(completedUnits);
    const targ = parseFloat(targetCGPA);
    const rem = parseFloat(remainingUnits);

    if (!isNaN(curr) && !isNaN(comp) && !isNaN(targ) && !isNaN(rem) && rem > 0) {
        const currentPoints = curr * comp;
        const totalUnits = comp + rem;
        const targetPoints = targ * totalUnits;
        const pointsNeeded = targetPoints - currentPoints;
        const req = pointsNeeded / rem;
        setRequiredGPA(req);
    } else {
        setRequiredGPA(null);
    }
  }, [currentCGPA, completedUnits, targetCGPA, remainingUnits]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-amber-50 dark:bg-bits-gold/20 p-2.5 rounded-lg text-bits-gold dark:text-bits-gold">
            <Target size={22} />
        </div>
        <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">CGPA Goal Planner</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Reverse engineer your path to a target GPA.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Current CGPA</label>
                <input 
                    type="number" 
                    value={currentCGPA}
                    onChange={e => setCurrentCGPA(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-bits-blue/20 focus:border-bits-blue dark:focus:border-bits-cyan outline-none transition-all"
                    placeholder="e.g. 7.5"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Units Done</label>
                <input 
                    type="number" 
                    value={completedUnits}
                    onChange={e => setCompletedUnits(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-bits-blue/20 focus:border-bits-blue dark:focus:border-bits-cyan outline-none transition-all"
                    placeholder="e.g. 45"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Target CGPA</label>
                <input 
                    type="number" 
                    value={targetCGPA}
                    onChange={e => setTargetCGPA(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-bits-blue/20 focus:border-bits-blue dark:focus:border-bits-cyan outline-none transition-all"
                    placeholder="e.g. 8.5"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Units Left</label>
                <input 
                    type="number" 
                    value={remainingUnits}
                    onChange={e => setRemainingUnits(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-bits-blue/20 focus:border-bits-blue dark:focus:border-bits-cyan outline-none transition-all"
                    placeholder="e.g. 15"
                />
            </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-inner">
             {/* Background glow */}
             <div className={`absolute inset-0 bg-bits-blue/5 blur-2xl transition-opacity duration-500 ${requiredGPA ? 'opacity-100' : 'opacity-0'}`}></div>
             
             {requiredGPA !== null ? (
                <>
                    <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mb-3 z-10">Required Average in Remaining Courses</p>
                    <div className="relative z-10">
                        <span className={`text-5xl font-bold tracking-tighter ${requiredGPA > 10 ? 'text-bits-red' : 'text-bits-blue dark:text-bits-cyan'}`}>
                            {requiredGPA.toFixed(2)}
                        </span>
                        <span className="text-lg text-slate-400 font-medium ml-1">GPA</span>
                    </div>
                    {requiredGPA > 10 ? (
                        <p className="text-xs text-bits-red font-medium mt-4 z-10">Impossible. Max GPA is 10.0</p>
                    ) : (
                        <p className="text-xs text-bits-blue dark:text-bits-cyan font-medium mt-4 z-10 flex items-center gap-1">
                            <TrendingUp size={14} /> Achievable
                        </p>
                    )}
                </>
             ) : (
                <span className="text-sm text-slate-400 italic">Enter all fields to calculate</span>
             )}
        </div>
      </div>
    </div>
  );
};

export default GoalPlanner;