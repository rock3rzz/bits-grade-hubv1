import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Layers,
  Code,
  Globe,
  AlertCircle,
  MapPin,
  Check,
  Sparkles,
  Info,
  Unlock,
  Cpu,
  Database,
  Layout,
  Shield,
  ArrowRight,
  Calculator,
  ChevronRight,
  User,
  ListChecks
} from 'lucide-react';
import { SEMESTERS, FOUNDATION_OPTIONS, DISCIPLINE_ELECTIVES, SPECIALIZATIONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const PRESETS: Record<string, { label: string, color: string, courses: string[] }> = {
  web: {
    label: "Web & App Build",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    courses: ["BCS ZC225", "BCS ZC314", "BCS ZC218", "BCS ZC238"] 
  },
  data: {
    label: "Data & ML Build",
    color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    courses: ["BCS ZC312", "BCS ZC217", "BCS ZC224", "BCS ZC227"]
  },
  systems: {
    label: "Systems & Cloud Build",
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    courses: ["BCS ZC237", "BCS ZC315", "BCS ZC226", "BCS ZC213"]
  }
};

const ELECTIVE_CLUSTERS = [
  {
    id: 'data',
    name: 'Data & AI',
    icon: Database,
    desc: 'Foundations for Machine Learning',
    courses: ['BCS ZC312', 'BCS ZC217', 'BCS ZC221', 'BCS ZC227']
  },
  {
    id: 'web',
    name: 'Web & UI',
    icon: Layout,
    desc: 'Frontend, DBs & User Exp.',
    courses: ['BCS ZC314', 'BCS ZC225', 'BCS ZC218']
  },
  {
    id: 'systems',
    name: 'Systems & Cloud',
    icon: Cpu,
    desc: 'Network, Hardware & Parallelism',
    courses: ['BCS ZC237', 'BCS ZC315', 'BCS ZC213']
  },
  {
    id: 'security',
    name: 'Security & Theory',
    icon: Shield,
    desc: 'Algorithms & Protection',
    courses: ['BCS ZC226', 'BCS ZC224']
  }
];

const FOUNDATION_THEMES = [
  { slot: "Foundation Option 1", title: "The Science Core", desc: "Choose your scientific base.", semester: 2 },
  { slot: "Foundation Option 2", title: "Digital Society", desc: "Tech's impact on humans.", semester: 3 },
  { slot: "Foundation Option 3", title: "World View", desc: "Economy & modern thought.", semester: 6 },
];

const MILESTONES = [
  {
    id: 0,
    title: "Diploma in Software Dev",
    exitPoint: "Exit after Sem 4",
    units: "72 Units",
    description: "Foundation courses, basic systems, and application programming. Includes 5 unit project.",
    color: "slate",
    audience: "Early career entry or lateral switch.",
    reqs: ["All Foundation Courses", "Basic Coding Core", "Study Project (5u)"],
    bg: "bg-slate-50 dark:bg-slate-950",
    border: "border-slate-200 dark:border-slate-800",
    accent: "text-slate-600 dark:text-slate-400"
  },
  {
    id: 1,
    title: "BSc Computer Science",
    exitPoint: "Exit after Sem 6",
    units: "107 Units",
    description: "Full standard degree. Covers all core CS concepts, 4 electives, and major capstone project.",
    color: "blue",
    audience: "Standard graduates seeking SE roles.",
    reqs: ["All Core Systems", "4 Discipline Electives", "Capstone Project (10u)"],
    bg: "bg-blue-50 dark:bg-bits-blue/10",
    border: "border-bits-blue/30 dark:border-bits-blue/30",
    accent: "text-bits-blue dark:text-bits-cyan"
  },
  {
    id: 2,
    title: "BSc (Honours) CS",
    exitPoint: "Exit after Sem 8",
    units: "144 Units",
    description: "Specialized degree. Deep dive into Tracks (Cloud/AI/FullStack) with advanced project work.",
    color: "gold",
    audience: "Specialists & Master's aspirants.",
    reqs: ["Specialization Track", "Advanced Electives", "Honours Project"],
    bg: "bg-amber-50 dark:bg-bits-gold/5",
    border: "border-bits-gold/40 dark:border-bits-gold/20",
    accent: "text-amber-700 dark:text-bits-gold"
  }
];

const Journey: React.FC = () => {
  const [currentSem, setCurrentSem] = useState<number>(1);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [activeExit, setActiveExit] = useState<number>(1); // Default to BSc

  const scrollToCalculator = () => {
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBadgeInfo = (courseCode: string, title: string, semesterId: number) => {
    if (courseCode.startsWith("FOUND")) return { label: "OPTION", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" };
    if (courseCode.startsWith("DE")) {
        const num = courseCode.replace(/\D/g, '');
        return { label: `ELECTIVE #${num}`, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800" };
    }
    if (title.includes("Project") && !title.includes("Study")) return { label: "PROJECT", color: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800" };
    return { label: "CORE", color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700" };
  };

  return (
    <section id="journey" className="space-y-16 scroll-mt-32 pt-8">
      
      {/* Summary Bar */}
      <div className="bg-slate-900 dark:bg-slate-900 rounded-xl p-4 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-white shadow-lg border border-slate-700 dark:border-slate-800">
        <div className="flex items-center gap-2">
            <Layers size={18} className="text-bits-blue dark:text-bits-cyan" />
            <span className="font-bold tracking-wide text-xs md:text-sm whitespace-nowrap">6 Semesters</span>
        </div>
        <div className="hidden md:block w-1 h-1 rounded-full bg-slate-600"></div>
        <div className="flex items-center gap-2">
            <Award size={18} className="text-bits-gold" />
            <span className="font-bold tracking-wide text-xs md:text-sm whitespace-nowrap">107 Units Total</span>
        </div>
        <div className="hidden md:block w-1 h-1 rounded-full bg-slate-600"></div>
        <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-400" />
            <span className="font-bold tracking-wide text-xs md:text-sm whitespace-nowrap">3 Foundation Options</span>
        </div>
        <div className="hidden md:block w-1 h-1 rounded-full bg-slate-600"></div>
        <div className="flex items-center gap-2">
            <Globe size={18} className="text-cyan-400" />
            <span className="font-bold tracking-wide text-xs md:text-sm whitespace-nowrap">4 Discipline Electives</span>
        </div>
      </div>

      {/* 1. Degree Map Overview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 text-center relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500">
         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-bits-blue via-bits-gold to-bits-red"></div>
         
         <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative z-10">
            <div className="flex flex-col items-center gap-3 group opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-bits-blue flex items-center justify-center text-bits-blue dark:text-bits-cyan transition-transform group-hover:-translate-y-1">
                    <Layers size={28} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Foundation</span>
                    <span className="text-[10px] text-slate-500 font-bold">Sem 1-3</span>
                </div>
            </div>
            
            <ArrowRight className="text-slate-300 dark:text-slate-600 hidden md:block w-5 h-5" />
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 md:hidden block my-2"></div>

            <div className="flex flex-col items-center gap-3 group opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-bits-blue flex items-center justify-center text-bits-blue dark:text-bits-cyan transition-transform group-hover:-translate-y-1">
                    <Code size={28} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Core Systems</span>
                    <span className="text-[10px] text-slate-500 font-bold">Sem 2-5</span>
                </div>
            </div>

            <ArrowRight className="text-slate-300 dark:text-slate-600 hidden md:block w-5 h-5" />
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 md:hidden block my-2"></div>

            <div className="flex flex-col items-center gap-3 group opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-bits-gold flex items-center justify-center text-bits-gold transition-transform group-hover:-translate-y-1">
                    <Globe size={28} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Electives</span>
                    <span className="text-[10px] text-slate-500 font-bold">Sem 4-6</span>
                </div>
            </div>

            <ArrowRight className="text-slate-300 dark:text-slate-600 hidden md:block w-5 h-5" />
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 md:hidden block my-2"></div>

            <div className="flex flex-col items-center gap-3 group opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-bits-red flex items-center justify-center text-bits-red dark:text-red-400 transition-transform group-hover:-translate-y-1">
                    <Award size={28} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Project</span>
                    <span className="text-[10px] text-slate-500 font-bold">Sem 6</span>
                </div>
            </div>
         </div>
      </div>

      {/* 2. Semester Curriculum Breakdown */}
      <div>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-bits-blue dark:bg-white rounded-full"></div>
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Standard Curriculum</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Your 3-year path to graduation.</p>
                </div>
            </div>

            {/* Semester Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto overflow-x-auto">
                <span className="text-xs font-bold text-slate-400 uppercase px-2 whitespace-nowrap">Current Sem:</span>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                        key={num}
                        onClick={() => setCurrentSem(num)}
                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${
                            currentSem === num 
                            ? 'bg-bits-blue text-white shadow-md scale-105' 
                            : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                        }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEMESTERS.map((sem) => {
                const isCurrent = currentSem === sem.id;
                return (
                    <div 
                        key={sem.id} 
                        className={`relative group rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
                            isCurrent 
                            ? 'border-2 border-bits-blue dark:border-bits-cyan shadow-xl ring-4 ring-bits-blue/10 dark:ring-bits-cyan/10 translate-y-[-4px]' 
                            : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                    >
                        {isCurrent && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-bits-blue dark:bg-bits-cyan text-white dark:text-bits-blue text-[10px] font-bold px-3 py-1 rounded-b-lg shadow-sm z-10 flex items-center gap-1 whitespace-nowrap">
                                <MapPin size={10} /> YOU ARE HERE
                            </div>
                        )}

                        <div className={`px-5 py-4 border-b flex justify-between items-center ${
                            isCurrent 
                            ? 'bg-blue-50/50 dark:bg-bits-blue/10 border-blue-100 dark:border-blue-900/30' 
                            : 'bg-slate-50/80 dark:bg-[#0F1623] border-slate-100 dark:border-slate-800'
                        }`}>
                            <span className={`text-base font-bold uppercase tracking-wide ${isCurrent ? 'text-bits-blue dark:text-bits-cyan' : 'text-slate-800 dark:text-slate-200'}`}>
                                {sem.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">
                                {sem.courses.reduce((sum, c) => sum + c.units, 0)} Units
                            </span>
                        </div>

                        <div className="p-5 flex-1 bg-white dark:bg-slate-900">
                            <ul className="space-y-3">
                                {sem.courses.map((course) => {
                                    const { label, color, border } = getBadgeInfo(course.code, course.title, sem.id);
                                    
                                    return (
                                        <li key={course.id} className="flex justify-between items-start text-sm group/item">
                                            <div className="flex-1 pr-2">
                                                <div className="font-bold text-slate-700 dark:text-slate-200 mb-0.5 leading-tight">{course.title}</div>
                                                <div className="text-slate-400 dark:text-slate-500 text-xs font-mono">{course.code}</div>
                                            </div>
                                            <div className="shrink-0 flex flex-col items-end gap-1">
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase tracking-wider whitespace-nowrap ${color} ${border}`}>
                                                    {label}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                                                    {course.units} U
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                );
            })}
         </div>
      </div>

      {/* 3. The New Builder Section */}
      <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
          
          {/* How This Works Bar */}
          <div className="bg-bits-blue dark:bg-bits-blue/20 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-white border-b border-white/10 dark:border-slate-800">
              <div className="flex items-center gap-4">
                 <div className="p-2 bg-white/10 rounded-lg">
                    <Info size={24} className="text-bits-gold" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold">How This Works</h4>
                    <p className="text-sm text-blue-100 dark:text-slate-300">
                        Pick <span className="text-bits-gold font-bold">1 Foundation</span> per slot. Complete <span className="text-cyan-300 font-bold">4 Electives</span> total.
                    </p>
                 </div>
              </div>

              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg border border-white/10 w-full md:w-auto justify-between md:justify-start">
                  <span className="text-xs font-bold uppercase tracking-wide opacity-70">Requirement</span>
                  <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                          {[1, 2, 3, 4].map(n => (
                              <div key={n} className="w-8 h-2 rounded-full bg-cyan-400/30 border border-cyan-400/50"></div>
                          ))}
                      </div>
                      <span className="text-xs font-bold text-cyan-300 ml-1">4 DEs</span>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Foundation Column */}
              <div className="lg:col-span-4 p-6 md:p-8 bg-slate-50/50 dark:bg-[#0F1623] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-700 dark:text-amber-500">
                          <BookOpen size={20} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide">Foundation Options</h4>
                  </div>
                  
                  <div className="space-y-4 relative">
                      {/* Vertical connector line */}
                      <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                      
                      {FOUNDATION_OPTIONS.map((opt, idx) => {
                          const theme = FOUNDATION_THEMES[idx];
                          return (
                              <div key={opt.slot} className="relative group">
                                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all shadow-sm">
                                      <div className="flex justify-between items-start mb-2">
                                          <div>
                                              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">{opt.slot}</span>
                                              <h5 className="font-bold text-slate-900 dark:text-white leading-tight">{theme.title}</h5>
                                          </div>
                                          <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-900/30 whitespace-nowrap">
                                              <Unlock size={10} /> Sem {opt.semester}
                                          </span>
                                      </div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 italic">{theme.desc}</p>
                                      <div className="space-y-1.5">
                                          {opt.courses.map(c => (
                                              <div key={c.code} className="flex items-center gap-2 text-xs p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-default">
                                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                                  <span className="font-semibold text-slate-700 dark:text-slate-300">{c.title}</span>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>

              {/* Electives Column */}
              <div className="lg:col-span-8 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-700 dark:text-cyan-400">
                              <Globe size={20} />
                          </div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide">Elective Specialties</h4>
                      </div>
                      
                      {/* Presets */}
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(PRESETS).map(([key, data]) => (
                            <button
                                key={key}
                                onClick={() => setActivePreset(activePreset === key ? null : key)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wide font-bold border transition-all flex items-center gap-2 ${
                                    activePreset === key 
                                    ? data.color + " ring-2 ring-offset-1 dark:ring-offset-[#161B22] ring-offset-transparent shadow-sm" 
                                    : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                }`}
                            >
                                <Sparkles size={10} />
                                {data.label}
                            </button>
                        ))}
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ELECTIVE_CLUSTERS.map(cluster => (
                          <div key={cluster.id} className="bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-3">
                                  <cluster.icon size={16} className="text-slate-400" />
                                  <div>
                                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{cluster.name}</h5>
                                      <p className="text-[10px] text-slate-400">{cluster.desc}</p>
                                  </div>
                              </div>
                              
                              <div className="space-y-2">
                                  {cluster.courses.map(code => {
                                      // Find full course data
                                      const course = DISCIPLINE_ELECTIVES.find(c => c.code === code);
                                      if (!course) return null;
                                      
                                      const isHighlighted = activePreset ? PRESETS[activePreset].courses.includes(code) : false;
                                      const isDimmed = activePreset ? !isHighlighted : false;

                                      return (
                                          <div 
                                            key={code} 
                                            className={`relative group p-2.5 rounded-lg border transition-all duration-300 ${
                                                isHighlighted 
                                                ? "bg-white dark:bg-cyan-900/20 border-cyan-400/50 shadow-md scale-[1.02] z-10" 
                                                : isDimmed
                                                  ? "opacity-50 border-transparent bg-transparent grayscale"
                                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-700"
                                            }`}
                                          >
                                              <div className="flex justify-between items-start">
                                                  <div className="flex-1 pr-4">
                                                      <span className={`text-[10px] font-mono font-bold block mb-0.5 ${isHighlighted ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-500'}`}>{course.code}</span>
                                                      <span className={`text-xs font-bold leading-tight block ${isHighlighted ? 'text-cyan-900 dark:text-cyan-100' : 'text-slate-700 dark:text-slate-300'}`}>{course.title}</span>
                                                  </div>
                                                  <span className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded">
                                                      {course.units}U
                                                  </span>
                                              </div>
                                              
                                              {/* Tooltip on Hover */}
                                              <div className="absolute inset-0 bg-slate-900/95 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center pointer-events-none z-20 backdrop-blur-sm">
                                                  <p className="text-[10px] font-medium leading-relaxed">
                                                      {course.note ? (
                                                          <span className="text-amber-400 font-bold block mb-1 flex items-center justify-center gap-1">
                                                              <AlertCircle size={10} /> {course.note}
                                                          </span>
                                                      ) : "Elective Course"}
                                                      Click to add to your plan.
                                                  </p>
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          
          {/* Bottom Timeline */}
          <div className="bg-slate-100 dark:bg-black/30 p-4 border-t border-slate-200 dark:border-slate-800 flex flex-nowrap md:flex-wrap overflow-x-auto justify-start md:justify-center items-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-wider scrollbar-hide">
              <span className="flex-shrink-0 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div> Sem 1: Basics
              </span>
              <ArrowRight size={12} className="opacity-30 flex-shrink-0" />
              <span className="flex-shrink-0 flex items-center gap-2 text-amber-600 dark:text-amber-500">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div> Sem 2: Found 1
              </span>
              <ArrowRight size={12} className="opacity-30 flex-shrink-0" />
              <span className="flex-shrink-0 flex items-center gap-2 text-amber-600 dark:text-amber-500">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div> Sem 3: Found 2
              </span>
              <ArrowRight size={12} className="opacity-30 flex-shrink-0" />
              <span className="flex-shrink-0 flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div> Sem 4: DE 1
              </span>
              <ArrowRight size={12} className="opacity-30 flex-shrink-0" />
              <span className="flex-shrink-0 flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div> Sem 5: DE 2 & 3
              </span>
              <ArrowRight size={12} className="opacity-30 flex-shrink-0" />
              <span className="flex-shrink-0 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-cyan-400"></div> Sem 6: Found 3 & DE 4
              </span>
          </div>
      </div>

      {/* 4. Honours Tracks */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-10 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-bits-gold/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10 relative z-10">
            <div className="p-3 bg-bits-gold rounded-lg text-slate-900 shadow-lg shadow-bits-gold/20">
                <Award size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">Honours Specializations</h3>
                <p className="text-base text-slate-400 font-medium">Semester 7 & 8 Extension (Optional)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {SPECIALIZATIONS.map((spec) => (
                  <div key={spec.name} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-bits-gold/30 transition-all flex flex-col h-full group">
                      <div className="mb-6">
                          <h4 className="text-lg font-bold text-bits-gold mb-2 group-hover:text-white transition-colors">{spec.name}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed min-h-[3rem]">{spec.description}</p>
                      </div>

                      <div className="space-y-4 mb-8 flex-1">
                          {spec.courses.map((c) => (
                              <div key={c.code} className="flex gap-3 text-sm">
                                  <div className="w-1.5 h-1.5 bg-bits-cyan rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_currentColor]"></div>
                                  <div className="flex-1">
                                      <span className="text-slate-200 font-semibold block">{c.title}</span>
                                      <span className="text-xs text-slate-500 font-mono font-medium">{c.code} • {c.units} U</span>
                                  </div>
                              </div>
                          ))}
                      </div>

                      <div className="mt-auto pt-5 border-t border-slate-700">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                              <AlertCircle size={12} />
                              Required Prerequisite
                          </div>
                          <div className="text-xs text-white font-mono font-bold bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-700">
                              {spec.prerequisite}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* 5. Interactive Exit Timeline */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-12 shadow-sm relative overflow-hidden">
         {/* Background accent */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

         <div className="flex flex-col items-center mb-12 text-center relative z-10">
             <h4 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-2">Degree Exit Milestones</h4>
             <motion.p 
                key={activeExit}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-black/30 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800"
             >
                You are viewing: <span className="font-bold text-slate-800 dark:text-white">{MILESTONES[activeExit].title}</span>
             </motion.p>
         </div>
         
         {/* Interactive Track */}
         <div className="relative max-w-4xl mx-auto mb-16">
             {/* Static Background Line */}
             <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 rounded-full"></div>
             
             {/* Active Progress Line */}
             <motion.div 
                className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-slate-400 to-bits-blue -translate-y-1/2 rounded-full origin-left"
                initial={{ width: '50%' }}
                animate={{ width: `${activeExit * 50}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
             />

             {/* Nodes */}
             <div className="flex justify-between relative z-10">
                {MILESTONES.map((milestone) => {
                    const isActive = activeExit === milestone.id;
                    const isPassed = activeExit >= milestone.id;
                    return (
                        <button 
                            key={milestone.id}
                            onClick={() => setActiveExit(milestone.id)}
                            className="group relative focus:outline-none"
                        >
                            {/* Label */}
                            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                isActive ? 'text-bits-blue dark:text-white scale-110' : 'text-slate-400 dark:text-slate-600'
                            }`}>
                                {milestone.id === 0 ? "Year 2" : milestone.id === 1 ? "Year 3" : "Year 4"}
                            </div>

                            {/* Circle */}
                            <div className={`w-6 h-6 rounded-full border-[3px] transition-all duration-300 relative ${
                                isActive 
                                ? 'bg-white border-bits-blue scale-150 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] dark:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' 
                                : isPassed 
                                    ? 'bg-bits-blue border-bits-blue'
                                    : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                            }`}>
                                {isActive && <div className="absolute inset-0 bg-bits-blue rounded-full animate-ping opacity-20"></div>}
                            </div>
                        </button>
                    );
                })}
             </div>
         </div>

         {/* Cards Display */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-6xl mx-auto">
             {MILESTONES.map((milestone) => {
                 const isActive = activeExit === milestone.id;
                 
                 return (
                     <motion.div
                        layout
                        key={milestone.id}
                        onClick={() => setActiveExit(milestone.id)}
                        initial={{ opacity: 0.8, scale: 0.95 }}
                        animate={{ 
                            opacity: isActive ? 1 : 0.6, 
                            scale: isActive ? 1 : 0.95,
                            y: isActive ? -10 : 0
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className={`relative rounded-2xl border p-6 flex flex-col cursor-pointer transition-colors duration-300 ${
                            isActive 
                            ? `${milestone.bg} ${milestone.border} shadow-xl ring-1 ring-black/5 dark:ring-white/5` 
                            : 'bg-white dark:bg-[#0D1117] border-slate-100 dark:border-slate-800 grayscale-[0.5] hover:grayscale-0'
                        }`}
                     >
                         <div className="flex justify-between items-start mb-4">
                             <div>
                                 <h5 className={`font-bold text-lg leading-tight mb-1 ${milestone.accent}`}>{milestone.title}</h5>
                                 <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wide">
                                     {milestone.exitPoint} • {milestone.units}
                                 </div>
                             </div>
                             {isActive && (
                                 <div className={`p-1.5 rounded-full ${milestone.id === 2 ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-bits-blue'} dark:bg-white/10`}>
                                     <Check size={14} />
                                 </div>
                             )}
                         </div>

                         <p className={`text-sm leading-relaxed font-medium mb-4 ${isActive ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-500'}`}>
                             {milestone.description}
                         </p>

                         {/* Expandable Details */}
                         <AnimatePresence>
                             {isActive && (
                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                 >
                                     <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-4">
                                         <div>
                                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                                                 <User size={10} /> Best For
                                             </span>
                                             <p className="text-xs text-slate-600 dark:text-slate-300 font-medium bg-white/50 dark:bg-black/20 p-2 rounded-lg border border-black/5 dark:border-white/5">
                                                 {milestone.audience}
                                             </p>
                                         </div>
                                         
                                         <div>
                                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                                                 <ListChecks size={10} /> Requirements
                                             </span>
                                             <ul className="space-y-1.5">
                                                 {milestone.reqs.map((req, i) => (
                                                     <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                                         <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                                         {req}
                                                     </li>
                                                 ))}
                                             </ul>
                                         </div>

                                         <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                scrollToCalculator();
                                            }}
                                            className="w-full mt-2 py-3 rounded-xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm"
                                         >
                                             <Calculator size={14} />
                                             Simulate Path
                                         </button>
                                     </div>
                                 </motion.div>
                             )}
                         </AnimatePresence>

                         {!isActive && (
                             <div className="mt-auto pt-4 flex justify-center opacity-50">
                                 <ChevronRight size={16} className="text-slate-400 rotate-90 md:rotate-0" />
                             </div>
                         )}
                     </motion.div>
                 );
             })}
         </div>
      </div>

    </section>
  );
};

export default Journey;