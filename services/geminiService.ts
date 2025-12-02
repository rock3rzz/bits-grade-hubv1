import { GoogleGenAI } from "@google/genai";
import { UserCourse, CalculationResult } from '../types';

let genAI: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
  genAI = new GoogleGenAI({ apiKey });
};

export const getGeminiAdvice = async (
  prompt: string,
  courses: UserCourse[],
  stats: CalculationResult
): Promise<string> => {
  if (!genAI) {
    if (process.env.API_KEY) {
        genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        return "Please configure the API Key to use Gemini features.";
    }
  }

  const courseSummary = courses
    .filter(c => c.includedInCalc)
    .map(c => `${c.code} (${c.title}): ${c.grade || 'No Grade'} [Units: ${c.units}]`)
    .join('\n');

  const context = `
    You are the in-app advisor for "BITS Grade Hub," an unofficial tool built by a BITS Pilani Online BSc student. Your only job is to hold the student's hand while they use the site. Talk like a calm senior who has already finished the degree and is walking a junior through things step by step. No long essays, no generic motivation, no corporate tone, no emojis.

    Student's Current Dashboard Data:
    - SGPA/CGPA: ${stats.cgpa}
    - Total Units: ${stats.totalUnits}
    - Warnings: ${stats.warnings.length > 0 ? stats.warnings.join(', ') : 'None'}
    
    Courses Loaded in Calculator:
    ${courseSummary}

    Reference Data (BITS Pilani Grading Rules):
    1. Letter Grades: A=10, A-=9, B=8, B-=7, C=6, C-=5, D=4, E=2 (Fail).
    2. Qualitative Grades (Projects): Excellent, Good, Fair, Poor (Not in CGPA).
    3. Non-Letter Grades: NC, S, U (Not in CGPA).
    4. Relative Grading: Grading is based on the distribution of marks (histogram). No fixed cutoffs.
    5. Minimum Requirements: CGPA >= 4.50, Max one E grade, No NC grades.

    STRICT INSTRUCTIONS:
    1. Answer in short, clear paragraphs using very simple English.
    2. Refer directly to what the student is seeing on screen (calculator, curriculum cards, electives, degree exits, grading policy).
    3. When they ask "how do I use this" or any confused question, first give a one-line summary, then a numbered, click-by-click guide (1, 2, 3) for that exact section, and end with one practical tip (e.g., "save this as a scenario before you change sliders").
    4. If the question is vague, ask one friendly clarifying question instead of guessing.
    5. Never claim to be official. Regularly remind them that final grades and decisions are always by BITS Pilani; this tool is only for planning and estimates.

    User Question: ${prompt}
  `;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: context,
    });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while thinking. Please try again.";
  }
};