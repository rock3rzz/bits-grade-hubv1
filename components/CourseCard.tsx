import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ChevronDown, Trash2, Percent, Edit3, Check, Book } from 'lucide-react';
import { UserCourse, GradeType } from '../types';
import { GRADE_OPTIONS } from '../constants';

interface CourseCardProps {
  course: UserCourse;
  onUpdate: (updatedCourse: UserCourse) => void;
  onRemove?: (courseId: string) => void;
  isRemovable?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onUpdate, onRemove, isRemovable }) => {
  const [mode, setMode] = useState<'GRADE' | 'PERCENT'>(course.totalPercentage !== undefined ? 'PERCENT' : 'GRADE');
  const [showSettings, setShowSettings] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [percentage, setPercentage] = useState<number | ''>(course.totalPercentage || '');
  const [editedTitle, setEditedTitle] = useState(course.title);
  const [editedUnits, setEditedUnits] = useState(course.units);

  useEffect(() => {
    if (course.totalPercentage !== undefined) {
      setPercentage(course.totalPercentage);
      setMode('PERCENT');
    }
  }, [course.totalPercentage]);

  useEffect(() => {
    if (mode === 'PERCENT' && percentage !== '' && percentage !== course.totalPercentage) {
        onUpdate({ ...course, totalPercentage: Number(percentage) });
    }
  }, [percentage, mode]);

  const handleGradeChange = (g: GradeType) => {
    onUpdate({ ...course, grade: g, totalPercentage: undefined });
  };

  const saveCourseInfo = () => {
    onUpdate({ ...course, title: editedTitle, units: editedUnits });
    setIsEditingInfo(false);
  };

  const isFail = course.grade === GradeType.E || course.grade === GradeType.NC;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`group relative p-6 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md ${
        isFail 
          ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-bits-cyan/50 dark:hover:border-bits-gold/50'
      }`}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="flex-1 mr-4">
          {isEditingInfo ? (
            <div className="space-y-4">
              <input 
                type="text" 
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-base font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-bits-blue/20 outline-none"
                placeholder="Course Title"
                autoFocus
              />
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  value={editedUnits}
                  onChange={(e) => setEditedUnits(parseInt(e.target.value) || 0)}
                  className="w-24 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-base font-medium text-slate-900 dark:text-white"
                  placeholder="Units"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400">Credits</span>
                <button 
                  onClick={saveCourseInfo}
                  className="ml-auto p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <Check size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                {course.isElective && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-bits-gold shadow-sm shadow-bits-gold/50"></span>
                )}
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-bits-blue dark:group-hover:text-bits-cyan transition-colors">{course.title}</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-300 font-medium flex items-center gap-2 mt-1.5">
                <Book size={14} className="opacity-60 text-bits-blue dark:text-bits-cyan" />
                <span className="font-mono text-xs">{course.code}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>{course.units} Units</span>
                {course.isElective && <span className="ml-1 px-2 py-0.5 rounded text-bits-gold dark:text-bits-gold bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 text-[10px] uppercase font-bold tracking-wider">Elective</span>}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                setShowSettings(!showSettings);
                setIsEditingInfo(false);
              }}
              className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-slate-100 dark:bg-slate-800 text-bits-blue dark:text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
                <Settings size={18} />
            </button>
            {isRemovable && onRemove && (
                <button 
                  onClick={() => onRemove(course.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-bits-red dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
            <motion.div 
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: 'auto', opacity: 1, marginBottom: 20 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                className="overflow-hidden border-b border-slate-100 dark:border-slate-800"
            >
                <div className="pb-5 space-y-4">
                  <div className="flex gap-4 text-sm bg-slate-50 dark:bg-black/20 p-2.5 rounded-xl border dark:border-slate-800">
                      <label className="flex items-center gap-3 cursor-pointer flex-1 justify-center py-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                          <input 
                              type="radio" 
                              checked={mode === 'GRADE'} 
                              onChange={() => setMode('GRADE')}
                              className="accent-bits-blue w-4 h-4"
                          />
                          <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">Letter Grade</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer flex-1 justify-center py-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                          <input 
                              type="radio" 
                              checked={mode === 'PERCENT'} 
                              onChange={() => setMode('PERCENT')}
                              className="accent-bits-blue w-4 h-4"
                          />
                          <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">Percentage</span>
                      </label>
                  </div>
                  
                  <button 
                    onClick={() => { setIsEditingInfo(!isEditingInfo); setShowSettings(false); }}
                    className="flex items-center gap-2 text-sm font-medium text-bits-blue dark:text-bits-cyan hover:underline px-2"
                  >
                    <Edit3 size={14} />
                    Edit Name & Units
                  </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {mode === 'GRADE' ? (
        <div className="relative group/select">
          <select
            value={course.grade || ''}
            onChange={(e) => handleGradeChange(e.target.value as GradeType)}
            className="w-full appearance-none bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-semibold py-3 px-5 rounded-lg focus:border-bits-blue dark:focus:border-bits-cyan focus:ring-1 focus:ring-bits-blue/20 transition-all cursor-pointer shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
          >
            <option value="" disabled>Select Grade</option>
            {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            <ChevronDown size={16} />
          </div>
        </div>
      ) : (
        <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Percent size={16} className="text-slate-400" />
            </div>
            <input 
                type="number"
                placeholder="Total %"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value === '' ? '' : Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-lg pl-11 pr-5 py-3 text-base font-mono font-medium text-slate-900 dark:text-white focus:border-bits-blue dark:focus:border-bits-cyan focus:ring-1 focus:ring-bits-blue/20 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
            />
        </div>
      )}
      
      {course.grade && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white dark:border-[#161B22] ${
                isFail 
                ? 'bg-bits-red text-white' 
                : 'bg-emerald-600 text-white'
            }`}
          >
              <span className="font-bold text-xs">
                  {course.grade}
              </span>
          </motion.div>
      )}
    </motion.div>
  );
};

export default CourseCard;