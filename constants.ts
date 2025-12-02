import { Course, SemesterData, GradeType } from './types';

export const GRADE_POINTS: Record<string, number> = {
  [GradeType.A]: 10,
  [GradeType.AMinus]: 9,
  [GradeType.B]: 8,
  [GradeType.BMinus]: 7,
  [GradeType.C]: 6,
  [GradeType.CMinus]: 5,
  [GradeType.D]: 4,
  [GradeType.E]: 2,
  [GradeType.NC]: 0,
  [GradeType.S]: 0,
  [GradeType.U]: 0,
  [GradeType.Excellent]: 0,
  [GradeType.Good]: 0,
  [GradeType.Fair]: 0,
  [GradeType.Poor]: 0,
};

export const SEMESTERS: SemesterData[] = [
  {
    id: 1,
    name: 'Semester 1',
    courses: [
      { id: 'BCS_ZC313', code: 'BCS ZC313', title: 'Introduction to Programming', units: 4, isElective: false, semester: 1 },
      { id: 'BCS_ZC219', code: 'BCS ZC219', title: 'Discrete Mathematics', units: 3, isElective: false, semester: 1 },
      { id: 'BCS_ZC230', code: 'BCS ZC230', title: 'Linear Algebra and Optimization', units: 3, isElective: false, semester: 1 },
      { id: 'BCS_ZC228', code: 'BCS ZC228', title: 'Introduction to Computing Systems', units: 3, isElective: false, semester: 1 },
      { id: 'BCS_ZC111', code: 'BCS ZC111', title: 'Basic Electronics', units: 2, isElective: false, semester: 1 },
      { id: 'BCS_ZC239', code: 'BCS ZC239', title: 'Writing Practice', units: 3, isElective: false, semester: 1 },
    ]
  },
  {
    id: 2,
    name: 'Semester 2',
    courses: [
      { id: 'BCS_ZC311', code: 'BCS ZC311', title: 'Data Structures and Algorithms', units: 4, isElective: false, semester: 2 },
      { id: 'BCS_ZC316', code: 'BCS ZC316', title: 'Object Oriented Programming', units: 4, isElective: false, semester: 2 },
      { id: 'BCS_ZC215', code: 'BCS ZC215', title: 'Command Line Interfaces and Scripting', units: 3, isElective: false, semester: 2 },
      { id: 'BCS_ZC233', code: 'BCS ZC233', title: 'Probability and Statistics', units: 3, isElective: false, semester: 2 },
      { id: 'BCS_ZC112', code: 'BCS ZC112', title: 'Introduction to Logic', units: 2, isElective: false, semester: 2 },
      { id: 'FOUND_1', code: 'FOUND 1', title: 'Foundation Option 1', units: 3, isElective: false, semester: 2 },
    ]
  },
  {
    id: 3,
    name: 'Semester 3',
    courses: [
      { id: 'BCS_ZC212', code: 'BCS ZC212', title: 'Algorithm Design', units: 3, isElective: false, semester: 3 },
      { id: 'BCS_ZC317', code: 'BCS ZC317', title: 'Relational Databases', units: 4, isElective: false, semester: 3 },
      { id: 'BCS_ZC238', code: 'BCS ZC238', title: 'Web Programming', units: 3, isElective: false, semester: 3 },
      { id: 'BCS_ZC236', code: 'BCS ZC236', title: 'Software Design Principles', units: 4, isElective: false, semester: 3 },
      { id: 'BCS_ZC216', code: 'BCS ZC216', title: 'Computer Systems and Performance', units: 3, isElective: false, semester: 3 },
      { id: 'FOUND_2', code: 'FOUND 2', title: 'Foundation Option 2', units: 2, isElective: false, semester: 3 },
    ]
  },
  {
    id: 4,
    name: 'Semester 4',
    courses: [
      { id: 'BCS_ZC232', code: 'BCS ZC232', title: 'Operating Systems', units: 3, isElective: false, semester: 4 },
      { id: 'BCS_ZC214', code: 'BCS ZC214', title: 'Building Database Applications', units: 3, isElective: false, semester: 4 },
      { id: 'BCS_ZC234', code: 'BCS ZC234', title: 'Programming Mobile Devices', units: 3, isElective: false, semester: 4 },
      { id: 'BCS_ZC220', code: 'BCS ZC220', title: 'Environmental Studies', units: 3, isElective: false, semester: 4 },
      { id: 'BCS_ZC222', code: 'BCS ZC222', title: 'Formal Languages and Applications', units: 3, isElective: false, semester: 4 },
      { id: 'DE_1', code: 'DE 1', title: 'Discipline Elective #1', units: 3, isElective: true, semester: 4 },
    ]
  },
  {
    id: 5,
    name: 'Semester 5',
    courses: [
      { id: 'BCS_ZC211', code: 'BCS ZC211', title: 'Software Development Practices', units: 3, isElective: false, semester: 5 },
      { id: 'BCS_ZC231', code: 'BCS ZC231', title: 'Network Programming and Client-Server Programming', units: 3, isElective: false, semester: 5 },
      { id: 'DE_2', code: 'DE 2', title: 'Discipline Elective #2', units: 3, isElective: true, semester: 5 },
      { id: 'DE_3', code: 'DE 3', title: 'Discipline Elective #3', units: 3, isElective: true, semester: 5 },
      { id: 'BCS_ZC241T', code: 'BCS ZC241T', title: 'Study Project', units: 5, isElective: false, semester: 5 },
    ]
  },
  {
    id: 6,
    name: 'Semester 6',
    courses: [
      { id: 'FOUND_3', code: 'FOUND 3', title: 'Foundation Option 3', units: 3, isElective: false, semester: 6 },
      { id: 'DE_4', code: 'DE 4', title: 'Discipline Elective #4', units: 3, isElective: true, semester: 6 },
      { id: 'BCS_ZC428T', code: 'BCS ZC428T', title: 'Project', units: 10, isElective: false, semester: 6 },
    ]
  }
];

// Helper to get courses by semester ID efficiently
export const COURSE_BY_SEM: Record<number, Course[]> = SEMESTERS.reduce((acc, sem) => {
  acc[sem.id] = sem.courses;
  return acc;
}, {} as Record<number, Course[]>);

export const FOUNDATION_OPTIONS = [
  {
    slot: "Foundation Option 1",
    semester: 2,
    units: 3,
    courses: [
      { code: "BCS ZC223", title: "General Biology" },
      { code: "BSC ZC240", title: "General Physics" }
    ]
  },
  {
    slot: "Foundation Option 2",
    semester: 3,
    units: 2,
    courses: [
      { code: "BCS ZC113", title: "Online Social Media" },
      { code: "BCS ZC114", title: "Video Games - Technology & Social Impacts" }
    ]
  },
  {
    slot: "Foundation Option 3",
    semester: 6,
    units: 3,
    courses: [
      { code: "BCS ZC229", title: "Introduction to Economics" },
      { code: "BCS ZC235", title: "Science, Technology and Modernity" }
    ]
  }
];

export const DISCIPLINE_ELECTIVES = [
  { code: "BCS ZC224", title: "Graphs and Networks", units: 3 },
  { code: "BCS ZC213", title: "Automata and Computability", units: 3 },
  { code: "BCS ZC221", title: "Experimental Algorithmics", units: 3 },
  { code: "BCS ZC227", title: "Introduction to Bioinformatics", units: 3 },
  { code: "BCS ZC217", title: "Data Visualization", units: 3 },
  { code: "BCS ZC312", title: "Introduction to Data Analytics", units: 4, note: "Prereq for AIML" },
  { code: "BCS ZC315", title: "Multicore and GPGPU Programming", units: 4 },
  { code: "BCS ZC237", title: "TCP/IP and Internet", units: 3, note: "Prereq for Cloud" },
  { code: "BCS ZC226", title: "Information Security", units: 3 },
  { code: "BCS ZC225", title: "Human Computer Interaction", units: 3 },
  { code: "BCS ZC218", title: "Designing Multimodal Interfaces", units: 3 },
  { code: "BCS ZC314", title: "Modern Databases", units: 4 }
];

export const SPECIALIZATIONS = [
  {
    name: 'Full-Stack Development',
    description: 'Design and develop end-to-end web and mobile applications.',
    prerequisite: 'None',
    courses: [
      { code: "BHCS ZC413", title: "Backend and API Development", units: 4 },
      { code: "BHCS ZC419", title: "Frontend Development", units: 3 },
      { code: "BHCS ZC415", title: "Cross-platform Applications", units: 3 },
      { code: "BHCS ZC432", title: "Software Deployment", units: 4 },
      { code: "BHCS ZC427T", title: "Mini Project (FS Domain)", units: 5 }
    ]
  },
  {
    name: 'Cloud Computing',
    description: 'Infrastructure, platforms, DevOps, and cloud-native apps.',
    prerequisite: 'BCS ZC237 - TCP/IP & Internet',
    courses: [
      { code: "BHCS ZC414", title: "Cloud Computing Fundamentals", units: 3 },
      { code: "BHCS ZC422", title: "Intro to Networking for Cloud", units: 3 },
      { code: "BHCS ZC420", title: "Intro to DevOps for Cloud", units: 4 },
      { code: "BHCS ZC430", title: "Scalable Services in Cloud", units: 4 },
      { code: "BHCS ZC427T", title: "Mini Project (Cloud Domain)", units: 5 }
    ]
  },
  {
    name: 'AIML',
    description: 'Machine learning, deep learning, and data-driven decision making.',
    prerequisite: 'BCS ZC312 - Intro to Data Analytics',
    courses: [
      { code: "BHCS ZC421", title: "Intro to Machine Learning", units: 4 },
      { code: "BHCS ZC412", title: "Artificial Intelligence", units: 3 },
      { code: "BHCS ZC417", title: "Deep Learning & Applications", units: 4 },
      { code: "BHCS ZC434", title: "Topics in Data Mining", units: 4 },
      { code: "BHCS ZC427T", title: "Mini Project (AIML Domain)", units: 5 }
    ]
  }
];

export const GRADE_OPTIONS = Object.values(GradeType);