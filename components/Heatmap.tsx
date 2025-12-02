import React from 'react';
import { UserCourse, GradeType } from '../types';
import { GRADE_POINTS } from '../constants';

interface HeatmapProps {
  courses: UserCourse[];
}

const Heatmap: React.FC<HeatmapProps> = ({ courses }) => {
  const getColor = (grade?: GradeType) => {
    if (!grade) return 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5';
    const points = GRADE_POINTS[grade] || 0;
    if (grade === GradeType.E || grade === GradeType.NC) return 'bg-red-100 dark:bg-bits-red/20 border-red-200 dark:border-bits-red/40 text-bits-red dark:text-red-400';
    // High grades: BITS Gold
    if (points >= 9) return 'bg-amber-100 dark:bg-bits-gold/20 border-amber-200 dark:border-bits-gold/40 text-amber-700 dark:text-bits-gold';
    // Mid grades: BITS Cyan/Blue
    if (points >= 7) return 'bg-blue-100 dark:bg-bits-cyan/20 border-blue-200 dark:border-bits-cyan/40 text-bits-blue dark:text-bits-cyan';
    // Low grades: Slate
    return 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
      {courses.map((course, idx) => (
        <div 
            key={course.id || idx}
            className={`h-12 rounded-lg border flex items-center justify-between px-3 transition-colors ${getColor(course.grade)}`}
        >
            <span className="text-[10px] font-bold truncate opacity-80 max-w-[70%]">
                {course.code.split(' ').pop()}
            </span>
            <span className="text-sm font-bold">
                {course.grade || '-'}
            </span>
        </div>
      ))}
      {courses.length === 0 && (
          <div className="col-span-full h-12 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs text-slate-400">
              No courses loaded
          </div>
      )}
    </div>
  );
};

export default Heatmap;