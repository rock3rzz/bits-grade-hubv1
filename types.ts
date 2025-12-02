export enum GradeType {
  A = 'A',
  AMinus = 'A-',
  B = 'B',
  BMinus = 'B-',
  C = 'C',
  CMinus = 'C-',
  D = 'D',
  E = 'E',
  NC = 'NC',
  S = 'S', 
  U = 'U',
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor'
}

export interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  isElective: boolean;
  semester?: number;
}

export interface UserCourse extends Course {
  grade?: GradeType;
  totalPercentage?: number;
  marks?: {
    quiz: number;
    assignment: number;
    final: number;
    custom?: number;
  };
  weights?: {
    quiz: number;
    assignment: number;
    final: number;
  };
  includedInCalc: boolean;
}

export interface SemesterData {
  id: number;
  name: string;
  courses: Course[];
}

export interface CalculationResult {
  sgpa: number;
  cgpa: number;
  totalUnits: number;
  totalPoints: number;
  warnings: string[];
}

export type CalculatorMode = 'SINGLE' | 'TERM' | 'SEMESTER' | 'YEARLY' | null;

export interface GradeComponent {
  id: string;
  name: string;
  weight: number;
  score: number; // Percentage 0-100
}

export interface Snapshot {
  id: string;
  timestamp: number;
  name: string;
  totalPercentage: number;
  components: Record<string, string>; // ID -> Score mapping
}

export interface GoalPlannerState {
  targetCGPA: number;
  currentCGPA: number;
  completedUnits: number;
  remainingUnits: number;
}