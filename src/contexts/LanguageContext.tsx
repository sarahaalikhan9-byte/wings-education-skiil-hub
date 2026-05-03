import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

interface LanguageGroups {
  indian: Language[];
  international: Language[];
}

interface LanguageContextType {
  currentLanguage: string;
  currentLanguageInfo: Language | undefined;
  changeLanguage: (lang: string, speakConfirmation?: boolean) => void;
  t: (key: string) => string;
  getAll: () => Record<string, string>;
  isRTL: boolean;
  languageGroups: LanguageGroups;
  allLanguages: Language[];
  supportedLanguageCodes: string[];
  speechLangCode: string;
  speakInLanguage: (text: string, lang?: string) => void;
}

const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'wings_language';

export const languageGroups: LanguageGroups = {
  indian: [
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'en-IN', name: 'English India', flag: '🇮🇳', nativeName: 'English' },
    { code: 'bn', name: 'Bengali', flag: '🇮🇳', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'ur', name: 'Urdu', flag: '🇮🇳', nativeName: 'اردو' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', flag: '🇮🇳', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', flag: '🇮🇳', nativeName: 'অসমীয়া' },
    { code: 'ma', name: 'Maithili', flag: '🇮🇳', nativeName: 'मैथिली' },
    { code: 'sa', name: 'Sanskrit', flag: '🇮🇳', nativeName: 'संस्कृत' }
  ],

  international: [
    { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Portুগুês' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
    { code: 'fa', name: 'Persian', flag: '🇮🇷', nativeName: 'فارسی' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' }
  ]
};

export const allLanguages = [
  ...languageGroups.indian,
  ...languageGroups.international
];

const supportedLanguageCodes = allLanguages.map((lang) => lang.code);

const rtlLanguages = ['ar', 'ur', 'fa'];

const speechLangCodes: Record<string, string> = {
  en: 'en-US',
  'en-IN': 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  ur: 'ur-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  or: 'or-IN',
  as: 'as-IN',
  ma: 'hi-IN',
  sa: 'hi-IN',

  ar: 'ar-SA',
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ru: 'ru-RU',
  pt: 'pt-PT',
  it: 'it-IT',
  ko: 'ko-KR',
  tr: 'tr-TR',
  fa: 'fa-IR',
  id: 'id-ID',
  nl: 'nl-NL'
};

const translations: Record<string, Record<string, string>> = {
  en: {
    home: 'HOME',
    aiHub: 'AI HUB',
    studyHub: 'STUDY HUB',
    skillLab: 'SKILL LAB',
    examHub: 'EXAM HUB',
    educationHub: 'EDUCATION HUB',
    competitive: 'COMPETITIVE',
    login: 'LOGIN',

    welcome: 'Welcome',
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    startLesson: 'Start Lesson',
    exploreResources: 'Explore Resources',

    voiceCommands: 'Voice Commands',
    listening: 'LISTENING',
    voiceActivated: 'Voice commands activated',
    voiceDeactivated: 'Voice commands deactivated',
    commandNotRecognized: 'Command not recognized',

    ZIARAWelcome:
      'Hello! I am ZIARA, your AI teacher. How can I help you today?',
    ZIARAListening: 'I am listening...',
    ZIARAProcessing: 'Processing your request...',

    computerMastery: 'Computer Mastery',
    codingLab: 'Coding Lab',
    aiSpecialist: 'AI-Tool Specialist',
    earnBadge: 'Earn Your Golden Badge!',
    startQuiz: 'Start AI Quiz',

    selectBoard: 'Select Your Board',
    nationalBoards: 'National Boards',
    internationalBoards: 'International Boards',

    success: 'Success!',
    error: 'Error',
    tryAgain: 'Please try again'
  },

  hi: {
    home: 'होम',
    aiHub: 'एआई हब',
    studyHub: 'अध्ययन हब',
    skillLab: 'कौशल लैब',
    examHub: 'परीक्षा हब',
    educationHub: 'शिक्षा हब',
    competitive: 'प्रतियोगी',
    login: 'लॉगिन',

    welcome: 'स्वागत है',
    loading: 'लोड हो रहा है...',
    submit: 'सबमिट करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    close: 'बंद करें',
    back: 'वापस',
    next: 'आगे',
    startLesson: 'पाठ शुरू करें',
    exploreResources: 'संसाधन देखें',

    voiceCommands: 'वॉयस कमांड',
    listening: 'सुन रहा हूं',
    voiceActivated: 'वॉयस कमांड सक्रिय',
    voiceDeactivated: 'वॉयस कमांड बंद',
    commandNotRecognized: 'कमांड समझ नहीं आया',

    ZIARAWelcome:
      'नमस्ते! मैं ZIARA हूं, आपकी एआई शिक्षक। मैं आपकी कैसे मदद कर सकती हूं?',
    ZIARAListening: 'मैं सुन रही हूं...',
    ZIARAProcessing: 'आपका अनुरोध प्रोसेस कर रही हूं...',

    computerMastery: 'कंप्यूटर महारत',
    codingLab: 'कोडिंग लैब',
    aiSpecialist: 'एआई विशेषज्ञ',
    earnBadge: 'गोल्डन बैज पाएं!',
    startQuiz: 'क्विज शुरू करें',

    selectBoard: 'अपना बोर्ड चुनें',
    nationalBoards: 'राष्ट्रीय बोर्ड',
    internationalBoards: 'अंतर्राष्ट्रीय बोर्ड',

    success: 'सफलता!',
    error: 'त्रुटि',
    tryAgain: 'कृपया पुनः प्रयास करें'
  },

  ar: {
    home: 'الرئيسية',
    aiHub: 'مركز الذكاء الاصطناعي',
    studyHub: 'مركز الدراسة',
    skillLab: 'مختبر المهارات',
    examHub: 'مركز الامتحان',
    educationHub: 'مركز التعليم',
    competitive: 'تنافسي',
    login: 'تسجيل الدخول',

    welcome: 'مرحباً',
    loading: 'جاري التحميل...',
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    startLesson: 'بدء الدرس',
    exploreResources: 'استكشاف الموارد',

    voiceCommands: 'أوامر صوتية',
    listening: 'الاستماع',
    voiceActivated: 'تم تفعيل الأوامر الصوتية',
    voiceDeactivated: 'تم إيقاف الأوامر الصوتية',
    commandNotRecognized: 'الأمر غير معروف',

    ZIARAWelcome:
      'مرحباً! أنا ZIARA، معلمتك الذكية. كيف يمكنني مساعدتك اليوم؟',
    ZIARAListening: 'أنا أستمع...',
    ZIARAProcessing: 'جاري معالجة طلبك...',

    computerMastery: 'إتقان الكمبيوتر',
    codingLab: 'مختبر البرمجة',
    aiSpecialist: 'أخصائي الذكاء الاصطناعي',
    earnBadge: 'احصل على الشارة الذهبية!',
    startQuiz: 'ابدأ الاختبار',

    selectBoard: 'اختر مجلسك',
    nationalBoards: 'المجالس الوطنية',
    internationalBoards: 'المجالس الدولية',

    success: 'نجاح!',
    error: 'خطأ',
    tryAgain: 'يرجى المحاولة مرة أخرى'
  },

  as: {
    home: 'মূল পৃষ্ঠা',
    aiHub: 'এআই হাব',
    studyHub: 'অধ্যয়ন হাব',
    skillLab: 'দক্ষতা পৰীক্ষাগাৰ',
    examHub: 'পৰীক্ষা হাব',
    educationHub: 'শিক্ষা হাব',
    competitive: 'প্ৰতিযোগিতামূলক',
    login: 'লগইন',

    welcome: 'স্বাগতম',
    loading: 'লোড হৈ আছে...',
    submit: 'দাখিল কৰক',
    cancel: 'বাতিল কৰক',
    save: 'সংৰক্ষণ কৰক',
    close: 'বন্ধ কৰক',
    back: 'পিছলৈ',
    next: 'পৰৱৰ্তী',
    startLesson: 'পাঠ আৰম্ভ কৰক',
    exploreResources: 'সম্পদ অন্বেষণ কৰক',

    voiceCommands: 'কণ্ঠস্বৰ আদেশ',
    listening: 'শুনি আছে',
    voiceActivated: 'কণ্ঠস্বৰ আদেশ সক্ৰিয়',
    voiceDeactivated: 'কণ্ঠস্বৰ আদেশ নিষ্ক্ৰিয়',
    commandNotRecognized: 'আদেশ চিনাক্ত কৰিব পৰা নাই',

    ZIARAWelcome:
      'নমস্কাৰ! মই ZIARA, আপোনাৰ এআই শিক্ষক। আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?',
    ZIARAListening: 'মই শুনি আছোঁ...',
    ZIARAProcessing: 'আপোনাৰ অনুৰোধ প্ৰক্ৰিয়াকৰণ কৰি আছে...',

    computerMastery: 'কম্পিউটাৰ দক্ষতা',
    codingLab: 'কোডিং পৰীক্ষাগাৰ',
    aiSpecialist: 'এআই বিশেষজ্ঞ',
    earnBadge: 'সোণালী বেজ লাভ কৰক!',
    startQuiz: 'কুইজ আৰম্ভ কৰক',

    selectBoard: 'আপোনাৰ বৰ্ড নিৰ্বাচন কৰক',
    nationalBoards: 'ৰাষ্ট্ৰীয় বৰ্ড',
    internationalBoards: 'আন্তৰ্জাতিক বৰ্ড',

    success: 'সফলতা!',
    error: 'ত্ৰুটি',
    tryAgain: 'পুনৰ চেষ্টা কৰক'
  }
};

const confirmationMessages: Record<string, string> = {
  en: 'Language changed to English',
  'en-IN': 'Language changed to Indian English',
  hi: 'भाषा हिंदी में बदल गई',
  ar: 'تم تغيير اللغة إلى العربية',
  as: 'ভাষা অসমীয়ালৈ সলনি কৰা হৈছে'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
  const [isRTL, setIsRTL] = useState(false);

  const speakInLanguage = useCallback((text: string, lang = currentLanguage) => {
    if (!window.speechSynthesis || !text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLangCodes[lang] || speechLangCodes[DEFAULT_LANGUAGE];
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [currentLanguage]);

  const applyHtmlLanguageSettings = useCallback((lang: string) => {
    const rightToLeft = rtlLanguages.includes(lang);

    setIsRTL(rightToLeft);
    document.documentElement.dir = rightToLeft ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  const changeLanguage = useCallback(
    (lang: string, speakConfirmation = true) => {
      if (!supportedLanguageCodes.includes(lang)) {
        console.warn(`Unsupported language: ${lang}`);
        return;
      }

      setCurrentLanguage(lang);
      applyHtmlLanguageSettings(lang);
      localStorage.setItem(STORAGE_KEY, lang);

      // Update global recognition if it exists
      if ((window as any).recognitionRef) {
        try {
          (window as any).recognitionRef.lang =
            speechLangCodes[lang] || speechLangCodes[DEFAULT_LANGUAGE];
        } catch (error) {
          console.log('Voice recognition language update pending');
        }
      }

      if (speakConfirmation) {
        speakInLanguage(
          confirmationMessages[lang] || 'Language changed successfully',
          lang
        );
      }
    },
    [applyHtmlLanguageSettings, speakInLanguage]
  );

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY);

    if (savedLang && supportedLanguageCodes.includes(savedLang)) {
      changeLanguage(savedLang, false);
    } else {
      applyHtmlLanguageSettings(DEFAULT_LANGUAGE);
    }
  }, [changeLanguage, applyHtmlLanguageSettings]);

  const t = useCallback(
    (key: string) => {
      return translations[currentLanguage]?.[key] || translations.en?.[key] || key;
    },
    [currentLanguage]
  );

  const getAll = useCallback(() => {
    return translations[currentLanguage] || translations.en;
  }, [currentLanguage]);

  const currentLanguageInfo =
    allLanguages.find((lang) => lang.code === currentLanguage) ||
    allLanguages.find((lang) => lang.code === DEFAULT_LANGUAGE);

  const value = {
    currentLanguage,
    currentLanguageInfo,
    changeLanguage,
    t,
    getAll,
    isRTL,
    languageGroups,
    allLanguages,
    supportedLanguageCodes,
    speechLangCode:
      speechLangCodes[currentLanguage] || speechLangCodes[DEFAULT_LANGUAGE],
    speakInLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
};

export default LanguageContext;
