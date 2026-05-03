import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import ExamHub from "./pages/ExamHub";
import AITutor from "./pages/AITutor";
import Classes from "./pages/Classes";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ParentDashboard from "./pages/ParentDashboard";
import FinancialHub from "./pages/FinancialHub";
import VideoLessonCreator from "./pages/VideoLessonCreator";
import SecureExam from "./pages/SecureExam";
import MathLesson from "./pages/MathLesson";
import Marks from "./pages/Marks";
import Login from "./pages/Login";
import Library from "./pages/Library";
import LearningHub from "./pages/LearningHub";
import Leaderboard from "./pages/Leaderboard";
import InternationalBoard from "./pages/InternationalBoard";
import InteractiveLesson from "./pages/InteractiveLesson";
import CompetitiveExamHub from "./pages/CompetitiveExamHub";
import CompetitiveExamTest from "./pages/CompetitiveExamTest";
import EducationHub from "./pages/EducationHub";
import EducationBoardSelector from "./pages/EducationBoardSelector";
import MasterSkillHub from "./pages/MasterSkillHub";
import OfficialAdminPortal from "./pages/OfficialAdminPortal";
import PrePrimaryLab from "./pages/PrePrimaryLab";
import About from "./pages/About";
import BoardUniversity from "./pages/BoardUniversity";

// Components / Features
import TextToSpeech from "./components/TextToSpeech";
import VoiceCommandController from "./components/VoiceCommandController";
import LanguageSelector from "./components/LanguageSelector";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";

// Context
import { LanguageProvider } from "./contexts/LanguageContext";

// Styles
import "./index.css";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#05070A] text-white overflow-x-hidden">
          {/* Global Controls */}
          <VoiceCommandController />
          <TopBar />
          <Navbar />

          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Core Hubs */}
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/learning-hub" element={<LearningHub />} />
            <Route path="/master-skill-hub" element={<MasterSkillHub />} />
            <Route path="/education-hub" element={<EducationHub />} />
            <Route path="/exam-hub" element={<ExamHub />} />
            <Route path="/board-university" element={<BoardUniversity />} />
            <Route path="/competitive-exam" element={<CompetitiveExamHub />} />

            {/* Education */}
            <Route path="/classes" element={<Classes />} />
            <Route path="/library" element={<Library />} />
            <Route path="/math-lesson" element={<MathLesson />} />
            <Route path="/interactive-lesson" element={<InteractiveLesson />} />
            <Route path="/international-board" element={<InternationalBoard />} />
            <Route path="/education-board-selector" element={<EducationBoardSelector />} />

            {/* Exams */}
            <Route path="/secure-exam" element={<SecureExam />} />
            <Route path="/competitive-exam-hub" element={<CompetitiveExamHub />} />
            <Route path="/competitive-exam-test" element={<CompetitiveExamTest />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* Finance / Tools */}
            <Route path="/financial-hub" element={<FinancialHub />} />
            <Route path="/video-creator" element={<VideoLessonCreator />} />
            <Route path="/pre-primary" element={<PrePrimaryLab />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />

            {/* Users / Admin */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/admin-portal" element={<OfficialAdminPortal />} />

            {/* Support */}
            <Route path="/contact" element={<Contact />} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;


