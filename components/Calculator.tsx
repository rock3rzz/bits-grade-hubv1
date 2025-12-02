import React, { useState, useEffect } from 'react';
import { Download, PieChart, Plus, AlertCircle, LayoutDashboard, BookOpen, Target, RefreshCcw } from 'lucide-react';
import { CalculatorMode, UserCourse } from '../types';
import { SEMESTERS } from '../constants';
import { calculateGPA } from '../utils/calculations';
import CourseCard from './CourseCard';
import GradePredictor from './GradePredictor';
import WhatIfSimulator from './WhatIfSimulator';
import GoalPlanner from './GoalPlanner';
import Journey from './Journey';

interface CalculatorProps {
  mode: CalculatorMode;
  onBack: () => void;
}

type TabType = 'SINGLE' | 'SEMESTER' | 'PLANNING';

const Calculator: React.FC<CalculatorProps> = ({ mode, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('SINGLE');
  const [selectedSemesterId, setSelectedSemesterId] = useState<number>(1);
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [stats, setStats] = useState(calculateGPA([]));

  // Initialize Courses with Persistence
  useEffect(() => {
    const saved = localStorage.getItem('bgh_semester_state');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.courses && data.courses.length > 0) {
                setCourses(data.courses);
                setSelectedSemesterId(data.selectedSemesterId || 1);
                return;
            }
        } catch (e) {
            console.error("Failed to load semester state", e);
        }
    }
    
    // Fallback default
    const semData = SEMESTERS.find(s => s.id === 1);
    if (semData) {
        setCourses(semData.courses.map(c => ({ ...c, includedInCalc: true })));
    }
  }, []);

  // Save State on Change
  useEffect(() => {
    if (courses.length > 0) {
        localStorage.setItem('bgh_semester_state', JSON.stringify({ 
            selectedSemesterId, 
            courses 
        }));
    }
  }, [courses, selectedSemesterId]);

  const loadSemester = (id: number) => {
    setSelectedSemesterId(id);
    const semData = SEMESTERS.find(s => s.id === id);
    if (semData) {
        setCourses(semData.courses.map(c => ({ ...c, includedInCalc: true })));
    }
  };

  const resetSemester = () => {
    const semData = SEMESTERS.find(s => s.id === selectedSemesterId);
    if (semData) {
        setCourses(semData.courses.map(c => ({ ...c, includedInCalc: true })));
    }
    localStorage.removeItem('bgh_semester_state');
  };

  useEffect(() => {
    setStats(calculateGPA(courses));
  }, [courses]);

  const handleUpdateCourse = (updated: UserCourse) => {
    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleRemoveCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const handleAddCourse = () => {
    const newCourse: UserCourse = {
        id: `custom-${Date.now()}`,
        code: 'NEW',
        title: 'New Course',
        units: 3,
        isElective: false,
        includedInCalc: true
    };
    setCourses([...courses, newCourse]);
  };

  const handleSavePrediction = (courseId: string, finalPercentage: number) => {
      // Find which semester this course belongs to based on ID
      const targetSem = SEMESTERS.find(s => s.courses.some(c => c.id === courseId));
      
      // If the target course is in a different semester than active, switch to that semester first
      if (targetSem && targetSem.id !== selectedSemesterId) {
          setSelectedSemesterId(targetSem.id);
          // Load fresh copy of that semester then update the specific course
          const freshCourses = targetSem.courses.map(c => ({ ...c, includedInCalc: true }));
          const updatedCourses = freshCourses.map(c => {
             if (c.id === courseId) return { ...c, totalPercentage: finalPercentage };
             return c;
          });
          setCourses(updatedCourses);
      } else {
          // Same semester, just update
          setCourses(prev => prev.map(c => {
              if (c.id === courseId) {
                  return { ...c, totalPercentage: finalPercentage };
              }
              return c;
          }));
      }
      
      setActiveTab('SEMESTER');
  };

  return (
    <div className="w-full">
      
      {/* Grade Hub Unified Section */}
      <section id="calculators" className="scroll-mt-32 mb-12">
        <div className="bg-white dark:bg-[#0B121E] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden w-full transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-black/40">
            {/* Hub Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0F1623] px-4 md:px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-6 backdrop-blur-md">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-bits-blue dark:text-white flex items-center gap-3 drop-shadow-sm">
                        Grade Hub
                        <span className="text-slate-300 dark:text-slate-600 font-light text-xl">|</span>
                        <span className="text-bits-gold">Calculators</span>
                    </h2>
                </div>
                
                {/* Tabs */}
                <div className="flex flex-wrap justify-center p-1.5 bg-slate-200/50 dark:bg-black/60 rounded-xl border border-slate-200 dark:border-slate-800 w-full lg:w-auto">
                    <button 
                        onClick={() => setActiveTab('SINGLE')}
                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'SINGLE' ? 'bg-white dark:bg-slate-800 text-bits-blue dark:text-bits-cyan shadow-md' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                        <LayoutDashboard size={16} />
                        <span className="hidden sm:inline">Single Course</span>
                        <span className="sm:hidden">Single</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('SEMESTER')}
                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'SEMESTER' ? 'bg-white dark:bg-slate-800 text-bits-blue dark:text-bits-cyan shadow-md' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                        <BookOpen size={16} />
                        <span className="hidden sm:inline">Semester / SGPA</span>
                        <span className="sm:hidden">SGPA</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('PLANNING')}
                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'PLANNING' ? 'bg-white dark:bg-slate-800 text-bits-blue dark:text-bits-cyan shadow-md' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
                    >
                        <Target size={16} />
                        <span className="hidden sm:inline">CGPA Planner</span>
                        <span className="sm:hidden">CGPA</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full bg-white dark:bg-[#0B121E]">
                {activeTab === 'SINGLE' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full">
                        <GradePredictor courses={courses} onSave={handleSavePrediction}>
                             <div className="border-t xl:border-t-0 xl:border-l border-slate-200 dark:border-slate-800 pt-8 xl:pt-0 xl:pl-8 mt-8 xl:mt-0">
                                 <WhatIfSimulator onSimulationChange={() => {}} />
                             </div>
                        </GradePredictor>
                    </div>
                )}

                {activeTab === 'SEMESTER' && (
                    <div className="p-4 md:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-300 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                                {SEMESTERS.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => loadSemester(s.id)}
                                        className={`px-5 py-2.5 rounded-lg whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all border-2 flex-shrink-0 ${
                                            selectedSemesterId === s.id 
                                            ? 'bg-bits-blue text-white border-bits-blue dark:bg-white dark:text-bits-blue dark:border-white shadow-md' 
                                            : 'bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-bits-blue/30 dark:hover:border-bits-blue/30 hover:text-bits-blue'
                                        }`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                            
                            <button 
                                onClick={resetSemester}
                                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-bits-red dark:hover:text-red-400 text-sm font-bold flex items-center gap-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <RefreshCcw size={16} /> Reset Semester
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
                            {/* Course List */}
                            <div className="lg:col-span-8 space-y-5 w-full order-2 lg:order-1">
                                {courses.map(course => (
                                    <CourseCard 
                                        key={course.id} 
                                        course={course} 
                                        onUpdate={handleUpdateCourse}
                                        onRemove={handleRemoveCourse}
                                        isRemovable={course.id.startsWith('custom')}
                                    />
                                ))}
                                <button 
                                    onClick={handleAddCourse}
                                    className="w-full py-5 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:text-bits-blue dark:text-slate-400 dark:hover:text-bits-cyan hover:border-bits-blue/50 dark:hover:border-bits-cyan/50 transition-all flex items-center justify-center gap-2 text-base font-semibold group"
                                >
                                    <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-bits-blue/10 dark:group-hover:bg-bits-cyan/20">
                                        <Plus size={20} />
                                    </div>
                                    Add Custom Course
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="lg:col-span-4 space-y-8 w-full lg:sticky lg:top-24 order-1 lg:order-2">
                                <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-[#0B111A] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-lg">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-bits-blue/10 dark:bg-bits-cyan/5 rounded-full blur-3xl -mr-12 -mt-12"></div>
                                    
                                    <h3 className="text-slate-500 dark:text-slate-300 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <PieChart size={16} className="text-bits-gold" />
                                        Semester SGPA
                                    </h3>
                                    
                                    <div className="flex items-baseline gap-3 mb-8 relative z-10">
                                        <span className={`text-6xl md:text-7xl font-extrabold tracking-tighter drop-shadow-sm ${
                                            stats.cgpa < 4.5 
                                            ? 'text-bits-red' 
                                            : 'text-bits-blue dark:text-white'
                                        }`}>
                                            {stats.cgpa.toFixed(2)}
                                        </span>
                                        <span className="text-slate-400 dark:text-slate-500 text-2xl font-medium">/ 10</span>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 relative z-10">
                                         <div className="flex justify-between items-center text-base">
                                            <span className="text-slate-600 dark:text-slate-300">Total Units</span>
                                            <span className="font-mono font-bold text-bits-blue dark:text-white bg-blue-50 dark:bg-slate-800 px-3 py-1 rounded-md border dark:border-slate-700">{stats.totalUnits}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-base">
                                            <span className="text-slate-600 dark:text-slate-300">Total Points</span>
                                            <span className="font-mono font-medium text-bits-blue dark:text-white">{stats.totalPoints.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Warnings */}
                                {stats.warnings.length > 0 && (
                                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-6 rounded-2xl shadow-sm">
                                        <div className="flex items-center gap-2.5 text-bits-red dark:text-red-400 mb-4">
                                            <AlertCircle size={20} />
                                            <span className="font-bold text-base">Academic Alerts</span>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {stats.warnings.map((w, i) => (
                                                <li key={i} className="text-sm text-red-700 dark:text-red-300 pl-3 border-l-2 border-red-300 dark:border-red-800">
                                                    {w}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'PLANNING' && (
                    <div className="p-4 md:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-300 w-full">
                        <GoalPlanner />
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* The Journey Section */}
      <div className="mt-16">
        <Journey />
      </div>
    </div>
  );
};

export default Calculator;