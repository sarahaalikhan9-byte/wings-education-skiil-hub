import { GoogleGenAI } from "@google/genai";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit } from "firebase/firestore";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not configured in environment.");
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const competitiveService = {
  getExamTopics: async () => {
    return {
      "JEE Mains/Adv": {
        "Physics": ["Mechanics", "Thermodynamics", "Optics", "Modern Physics", "Electromagnetism"],
        "Chemistry": ["Organic", "Inorganic", "Physical", "Polymers", "Biomolecules"],
        "Mathematics": ["Calculus", "Algebra", "Coordinate Geometry", "Trigonometry", "Vectors & 3D"]
      },
      "NEET": {
        "Biology": ["Human Physiology", "Genetics", "Ecology", "Plant Physiology", "Biotechnology", "Reproduction"],
        "Physics": ["Mechanics", "Electrostatics", "Magnetism", "Dual Nature of Matter"],
        "Chemistry": ["Medicinal Chemistry", "Equilibrium", "Surface Chemistry"]
      },
      "SAT/GRE/GMAT": {
        "Verbal": ["Sentence Equivalence", "Reading Comprehension", "Critical Reasoning", "Sentence Correction"],
        "Quantitative": ["Data Analysis", "Algebra II", "Geometry", "Problem Solving", "Data Sufficiency"]
      },
      "UPSC": {
        "History": ["Ancient", "Medieval", "Modern", "World History"],
        "Geography": ["Indian", "World", "Economic"],
        "Polity": ["Constitution", "Governance", "International Relations"],
        "Economy": ["Macroeconomics", "Budget", "Banking"]
      },
      "PhD/GATE": {
        "Computer Science": ["Algorithms", "OS", "DBMS", "Networking", "TOC"],
        "Engineering": ["Thermodynamics", "Fluid Mechanics", "Analog Circuits"],
        "Research": ["Methodology", "Ethics", "Statistics"]
      }
    };
  },

  generateQuestions: async (config: {
    examType: string;
    topic: string;
    subtopic: string;
    difficulty: string;
    questionType: string;
    numQuestions: number;
  }) => {
    const ai = getAI();
    const prompt = `Generate ${config.numQuestions} ${config.difficulty} level ${config.questionType} questions for ${config.examType} on the topic of ${config.topic} (${config.subtopic}). 
    Each question must have:
    1. A clear question text.
    2. 4 options (array of strings).
    3. The index of the correct answer (0-3).
    4. A detailed rationale/explanation for why that answer is correct.
    
    Return the response ONLY as a JSON array of objects with keys: "question", "options", "correct_answer", and "rationale".`;

    const result = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    const text = result.text || "";
    
    try {
      // Clean up potential markdown formatting if Gemini adds it
      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI response:", text);
      throw new Error("Neural generation failed. Please retry.");
    }
  },

  saveAttempt: async (attemptData: any) => {
    try {
      const docRef = await addDoc(collection(db, "exam_attempts"), {
        ...attemptData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (e) {
      console.error("Error saving attempt:", e);
      throw e;
    }
  },

  getRecentAttempts: async (userId: string) => {
    const q = query(
      collection(db, "exam_attempts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
