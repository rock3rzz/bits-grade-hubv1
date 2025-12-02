import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RefreshCcw, TrendingUp, Skull, History, Bookmark, ChevronDown } from 'lucide-react';
import { Snapshot, UserCourse } from '../types';
import { SEMESTERS } from '../constants';

interface GradePredictorProps {
  courses: UserCourse[];
  onSave: (courseId: string, finalPercentage: number) => void;
  children?: React.ReactNode;
}

type ComponentType = 'QUIZ' | 'ASSIGNMENT' | 'EXAM';

interface FixedComponent {
  id: string;
  name: string;
  bitsName?: string;
  type: ComponentType;
  weight: number;
}

const FIXED_COMPONENTS: FixedComponent[] = [
  { id: 'q1', name: 'Quiz 1', bitsName: 'Pain Token 1', type: 'QUIZ', weight: 6 },
  { id: 'q2', name: 'Quiz 2', bitsName: 'Pain Token 2', type: 'QUIZ', weight: 6 },
  { id: 'q3', name: 'Quiz 3', bitsName: 'Pain Token 3', type: 'QUIZ', weight: 6 },
  { id: 'q4', name: 'Quiz 4', bitsName: 'Pain Token 4', type: 'QUIZ', weight: 6 },
  { id: 'q5', name: 'Quiz 5', bitsName: 'Pain Token 5', type: 'QUIZ', weight: 6 },
  { id: 'a1', name: 'Assignment 1', bitsName: 'Suffering Grade 1', type: 'ASSIGNMENT', weight: 10 },
  { id: 'a2', name: 'Assignment 2', bitsName: 'Suffering Grade 2', type: 'ASSIGNMENT', weight: 10 },
  { id: 'final', name: 'Final Exam', bitsName: 'Doom Attempt', type: 'EXAM', weight: 50 },
];

const GradePredictor: React.FC<GradePredictorProps> = ({ courses: userCourses, onSave, children }) => {
  const [scores, setScores] = useState<Record<string, string>>({});
  const [bitsMode, setBitsMode] = useState(false);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [showSnapshots, setShowSnapshots] = useState(false);
  const [targetCutoff, setTargetCutoff] = useState<number>(75);
  
  // Selection States
  const [selectedSem, setSelectedSem] = useState<number>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  
  // Get available courses for the selected semester from constant
  const availableCourses = SEMESTERS.find(s => s.id === selectedSem)?.courses || [];

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bgh_single_course_state');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setScores(data.scores || {});
        setBitsMode(data.bitsMode || false);
        setSnapshots(data.snapshots || []);
        setTargetCutoff(data.targetCutoff ?? 75);
        
        if (data.selectedSem) setSelectedSem(data.selectedSem);
        if (data.selectedCourseId) setSelectedCourseId(data.selectedCourseId);
      } catch (e) {
        console.error("Failed to load predictor state", e);
      }
    }
  }, []);

  // Save state to local storage on change
  useEffect(() => {
    const state = { 
        scores, 
        bitsMode, 
        snapshots, 
        targetCutoff, 
        selectedSem, 
        selectedCourseId 
    };
    localStorage.setItem('bgh_single_course_state', JSON.stringify(state));
  }, [scores, bitsMode, snapshots, targetCutoff, selectedSem, selectedCourseId]);

  // Initialize defaults only if no selection and no saved state overrides
  useEffect(() => {
    if (availableCourses.length > 0 && !selectedCourseId) {
        setSelectedCourseId(availableCourses[0].id);
    }
  }, [availableCourses]);

  // Reset scores when course changes (only if it's a manual change, avoiding infinite loops on load)
  // We use a ref to track if this is the initial load or a user action if needed, 
  // but simpler is to just let the user clear manually if they switch. 
  // However, traditionally switching context clears inputs. 
  // To support persistence, we keep inputs if staying on same course. 
  // If switching courses, we usually clear.
  // The current logic `useEffect(() => { setScores({}) }, [selectedCourseId])` wipes data on load too.
  // We need to bypass this wipe on initial load.
  const [prevCourseId, setPrevCourseId] = useState(selectedCourseId);
  useEffect(() => {
    if (prevCourseId !== '' && selectedCourseId !== prevCourseId) {
       setScores({});
    }
    setPrevCourseId(selectedCourseId);
  }, [selectedCourseId]);

  const [totals, setTotals] = useState({
    quizContribution: 0,
    assignmentContribution: 0,
    examContribution: 0,
    totalPercentage: 0,
    internalTotal: 0
  });

  const updateScore = (id: string, value: string) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
        setScores(prev => ({ ...prev, [id]: value }));
    }
  };

  const clearAll = () => {
    setScores({});
    setSnapshots([]);
    localStorage.removeItem('bgh_single_course_state');
  };

  const takeSnapshot = () => {
    const snap: Snapshot = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        name: `Snapshot ${snapshots.length + 1}`,
        totalPercentage: totals.totalPercentage,
        components: { ...scores }
    };
    setSnapshots([snap, ...snapshots]);
  };

  const loadSnapshot = (snap: Snapshot) => {
    setScores(snap.components);
    setShowSnapshots(false);
  };

  useEffect(() => {
    let qTotal = 0;
    let aTotal = 0;
    let eTotal = 0;

    FIXED_COMPONENTS.forEach(comp => {
      const score = parseFloat(scores[comp.id] || '0');
      const contribution = (score * comp.weight) / 100;
      
      if (comp.type === 'QUIZ') qTotal += contribution;
      else if (comp.type === 'ASSIGNMENT') aTotal += contribution;
      else if (comp.type === 'EXAM') eTotal += contribution;
    });

    setTotals({
      quizContribution: qTotal,
      assignmentContribution: aTotal,
      examContribution: eTotal,
      totalPercentage: qTotal + aTotal + eTotal,
      internalTotal: qTotal + aTotal
    });
  }, [scores]);

  const handleSave = () => {
    if (selectedCourseId) {
        onSave(selectedCourseId, parseFloat(totals.totalPercentage.toFixed(2)));
    }
  };

  const getProjection = (examPercent: number) => {
    return totals.internalTotal + (examPercent * 0.5);
  };

  const renderRow = (comp: FixedComponent) => {
    const scoreVal = scores[comp.id] || '';
    const contribution = ((parseFloat(scoreVal || '0') * comp.weight) / 100).toFixed(2);
    const isExam = comp.type === 'EXAM';
    
    return (
      <div key={comp.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors px-4 rounded-lg -mx-4 group">
        <div className="col-span-5 flex items-center gap-2">
           <span className={`text-sm font-medium ${isExam ? 'text-bits-blue dark:text-bits-cyan font-bold text-base' : 'text-slate-700 dark:text-slate-300'}`}>
               {bitsMode ? comp.bitsName : comp.name}
           </span>
           {isExam && <span className="text-[10px] bg-bits-blue/10 dark:bg-bits-cyan/20 text-bits-blue dark:text-bits-cyan px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">Major</span>}
        </div>
        
        <div className="col-span-2 text-center">
            <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {comp.weight}%
            </span>
        </div>
        
        <div className="col-span-3">
            <input 
                type="number"
                value={scoreVal}
                onChange={(e) => updateScore(comp.id, e.target.value)}
                placeholder="-"
                className={`w-full bg-white dark:bg-black/30 border rounded-lg px-3 py-2 text-right text-base outline-none focus:ring-2 font-mono transition-all ${
                    isExam 
                    ? 'border-bits-blue/30 focus:border-bits-blue dark:focus:border-bits-cyan focus:ring-bits-blue/20 dark:border-bits-cyan/30' 
                    : 'border-slate-200 dark:border-slate-700 focus:border-bits-gold focus:ring-bits-gold/20'
                } ${isExam ? 'text-bits-blue dark:text-bits-cyan font-bold' : 'text-slate-900 dark:text-slate-200'}`}
            />
        </div>
        
        <div className="col-span-2 text-right">
             <span className={`text-sm font-mono font-medium ${parseFloat(contribution) > 0 ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-700'}`}>
                {contribution}
             </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
        {/* Controls Toolbar */}
        <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50 dark:bg-[#0F1623]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                {/* Mode Toggle */}
                <div className="bg-white dark:bg-white/5 p-3 rounded-xl text-bits-blue dark:text-bits-cyan shadow-sm cursor-pointer hover:scale-110 hover:text-bits-gold transition-all border border-slate-200 dark:border-slate-700 shrink-0" onClick={() => setBitsMode(!bitsMode)}>
                    {bitsMode ? <Skull size={20} /> : <TrendingUp size={20} />}
                </div>

                <div className="flex flex-col gap-2 w-full">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                         <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight uppercase tracking-wide whitespace-nowrap">Course Projection</h2>
                         {/* Semester Selector Buttons */}
                         <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                             {[1, 2, 3, 4, 5, 6].map(sem => (
                                 <button
                                     key={sem}
                                     onClick={() => { 
                                         if (selectedSem !== sem) {
                                            setSelectedSem(sem); 
                                            setSelectedCourseId(''); 
                                         }
                                     }}
                                     className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold transition-all ${
                                         selectedSem === sem
                                         ? 'bg-white dark:bg-bits-blue text-bits-blue dark:text-white shadow-sm'
                                         : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                     }`}
                                 >
                                     {sem}
                                 </button>
                             ))}
                         </div>
                    </div>

                    {/* Improved Course Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Targeting:</span>
                      <div className="relative group/course-select w-full md:w-auto max-w-xs">
                        <select 
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                            className="w-full appearance-none bg-transparent text-sm font-bold text-bits-blue dark:text-bits-cyan outline-none cursor-pointer pr-6 hover:text-bits-gold transition-colors truncate"
                            disabled={availableCourses.length === 0}
                        >
                            {availableCourses.length === 0 ? (
                                <option disabled>No calculators for this semester yet</option>
                            ) : (
                                availableCourses.map(c => (
                                    <option key={c.id} value={c.id} className="text-slate-900 bg-white dark:bg-[#161B22] dark:text-white">
                                        {c.code} – {c.title}
                                    </option>
                                ))
                            )}
                        </select>
                        <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-bits-blue dark:text-bits-cyan pointer-events-none" />
                      </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
                <button 
                  onClick={takeSnapshot}
                  className="p-2.5 text-slate-500 hover:text-bits-blue dark:hover:text-bits-cyan hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  title="Take Snapshot"
                >
                    <Bookmark size={18} />
                </button>
                <button 
                  onClick={() => setShowSnapshots(!showSnapshots)}
                  className={`p-2.5 text-slate-500 hover:text-bits-blue dark:hover:text-bits-cyan hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 ${showSnapshots ? 'text-bits-blue bg-blue-50 dark:text-bits-cyan dark:bg-bits-blue/20' : ''}`}
                  title="History"
                >
                    <History size={18} />
                </button>
                <button 
                  onClick={clearAll}
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-slate-500 hover:text-bits-red dark:text-slate-400 dark:hover:text-red-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  <RefreshCcw size={14} />
                  Reset
                </button>
            </div>
        </div>

        {/* Snapshots Panel */}
        <AnimatePresence>
            {showSnapshots && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-slate-100 dark:bg-black/40 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                    <div className="p-5 flex gap-4 overflow-x-auto scrollbar-hide">
                        {snapshots.length === 0 ? (
                            <p className="text-sm text-slate-400 italic">No snapshots saved yet.</p>
                        ) : (
                            snapshots.map(snap => (
                                <button
                                    key={snap.id}
                                    onClick={() => loadSnapshot(snap)}
                                    className="flex-shrink-0 bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-xl text-left hover:border-bits-cyan dark:hover:border-bits-gold/50 transition-all group shadow-sm hover:shadow-md"
                                >
                                    <div className="text-[10px] text-slate-400 font-mono mb-1">
                                        {new Date(snap.timestamp).toLocaleTimeString()}
                                    </div>
                                    <div className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-bits-blue dark:group-hover:text-bits-cyan">
                                        {snap.totalPercentage.toFixed(1)}%
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="flex flex-col xl:flex-row">
            {/* Input Section */}
            <div className="flex-1 p-8 space-y-2">
                <div className="grid grid-cols-12 gap-4 px-4 mb-3 text-xs uppercase tracking-wider text-slate-400 font-bold select-none">
                    <div className="col-span-5">Component</div>
                    <div className="col-span-2 text-center">Weight</div>
                    <div className="col-span-3 text-right">Your %</div>
                    <div className="col-span-2 text-right">Points</div>
                </div>
                <div className="space-y-1">
                    {FIXED_COMPONENTS.map(renderRow)}
                </div>
            </div>

            {/* Analysis Section */}
            <div className="xl:w-[360px] bg-slate-50 dark:bg-slate-900 border-t xl:border-t-0 xl:border-l border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-8">
                
                {/* Main Score */}
                <div className="bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg text-center relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-bits-blue/10 dark:bg-bits-cyan/20 rounded-full blur-3xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                     <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tighter block mb-2">
                        {totals.totalPercentage.toFixed(1)}%
                    </span>
                    <span className="text-xs font-bold text-bits-blue dark:text-bits-cyan uppercase tracking-widest block">
                        Current Projection
                    </span>
                    <div className="mt-6 flex justify-between text-sm border-t border-slate-100 dark:border-white/5 pt-4">
                        <span className="text-slate-500 font-medium">Internal (50%)</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{totals.internalTotal.toFixed(2)}</span>
                    </div>
                </div>

                <div className="px-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                        Note: BITS uses relative grading. This is a prediction to reduce anxiety. Official grades depend on batch performance.
                    </p>
                </div>

                {/* Scenarios */}
                <div className="space-y-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block ml-1">Exam Outcomes</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[50, 75, 95].map(percent => (
                            <div key={percent} className="bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-center shadow-sm">
                                <div className="text-[10px] text-slate-400 mb-1 font-bold uppercase">If Exam {percent}%</div>
                                <div className={`text-base font-bold ${percent === 95 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                                    {getProjection(percent).toFixed(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cutoff Visualizer */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Target Visualizer</span>
                        <input 
                            type="number" 
                            value={targetCutoff} 
                            onChange={(e) => setTargetCutoff(Number(e.target.value))}
                            className="w-12 text-right bg-transparent text-sm font-mono font-bold text-bits-blue dark:text-bits-cyan border-b-2 border-slate-200 dark:border-slate-700 outline-none focus:border-bits-gold transition-colors"
                        />
                    </div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${totals.totalPercentage}%` }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-bits-blue to-bits-cyan rounded-full z-10"
                         />
                         <div 
                            className="absolute top-0 w-0.5 h-full bg-bits-red z-20 shadow-[0_0_8px_rgba(168,31,38,0.8)]" 
                            style={{ left: `${targetCutoff}%` }} 
                         />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 uppercase tracking-wider">
                        <span>0%</span>
                        <span className="text-bits-blue dark:text-bits-cyan">{totals.totalPercentage.toFixed(1)}%</span>
                        <span>100%</span>
                    </div>
                </div>

                <button 
                    onClick={handleSave}
                    disabled={!selectedCourseId}
                    className="mt-auto w-full py-4 bg-bits-blue dark:bg-white text-white dark:text-bits-blue font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl shadow-bits-blue/20 dark:shadow-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
                >
                    <Save size={18} />
                    Save to Curriculum
                </button>
            </div>
            
            {/* Third Pane (Child Content - WhatIf) */}
            {children && (
                 <div className="xl:w-[360px]">
                    {children}
                 </div>
            )}
        </div>
    </div>
  );
};

export default GradePredictor;