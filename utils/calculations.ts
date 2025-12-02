import { UserCourse, CalculationResult, GradeType } from '../types';
import { GRADE_POINTS } from '../constants';

export const calculatePercentage = (
  marks: { quiz: number; assignment: number; final: number },
  weights: { quiz: number; assignment: number; final: number }
): number => {
  const quizWeighted = (marks.quiz / 100) * weights.quiz;
  const assignWeighted = (marks.assignment / 100) * weights.assignment;
  const finalWeighted = (marks.final / 100) * weights.final;
  return quizWeighted + assignWeighted + finalWeighted;
};

// Removed getProjectedGrade to avoid assuming absolute cutoffs as per official Relative Grading policy.

export const calculateGPA = (courses: UserCourse[]): CalculationResult => {
  let totalUnits = 0;
  let totalPoints = 0;
  let eCount = 0;
  let ncCount = 0;
  const warnings: string[] = [];

  courses.forEach(course => {
    if (!course.includedInCalc) return;
    
    // Check for NC
    if (course.grade === GradeType.NC) {
      ncCount++;
      return; // NC is not calculated in GPA (0 units, 0 points), but is a failure status
    }

    // Skip non-letter grades (S, U, Excellent, Good, Fair, Poor)
    // The official doc says "Non-Letter grades are not considered for the computation of CGPA."
    if (
      course.grade === GradeType.S || 
      course.grade === GradeType.U ||
      course.grade === GradeType.Excellent ||
      course.grade === GradeType.Good ||
      course.grade === GradeType.Fair ||
      course.grade === GradeType.Poor
    ) {
      return; 
    }

    if (course.grade) {
      const points = GRADE_POINTS[course.grade];
      // Only A-E carry points
      if (points !== undefined) {
        totalPoints += points * course.units;
        totalUnits += course.units;

        if (course.grade === GradeType.E) {
          eCount++;
        }
      }
    }
  });

  const sgpa = totalUnits > 0 ? totalPoints / totalUnits : 0;
  const cgpa = sgpa; 

  if (sgpa < 4.5 && totalUnits > 0) warnings.push("CGPA/SGPA is below 4.50 (Academic Warning)");
  if (eCount > 1) warnings.push(`Secured ${eCount} E grades (Limit is 1)`);
  if (ncCount > 0) warnings.push("NC grade received (Course Not Cleared)");

  return {
    sgpa: parseFloat(sgpa.toFixed(2)),
    cgpa: parseFloat(cgpa.toFixed(2)),
    totalUnits,
    totalPoints,
    warnings
  };
};