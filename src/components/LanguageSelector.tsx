import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
  const {
    currentLanguage,
    changeLanguage,
    languageGroups,
    allLanguages
  } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);

  const currentLang =
    allLanguages.find((lang) => lang.code === currentLanguage) ||
    allLanguages[0];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl glass border border-purple-border/30 hover:border-gold transition-all shadow-lg group"
        title="Change Language"
      >
        <span className="text-lg group-hover:scale-110 transition-transform">{currentLang?.flag || '🌍'}</span>
        <span className="text-text-main text-xs font-black uppercase tracking-widest hidden md:block">
          {currentLang?.code || 'EN'}
        </span>
        <ChevronDown className={`w-3 h-3 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-3 z-50 w-80 max-h-[70vh] overflow-y-auto glass-strong rounded-[32px] p-6 border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-royal font-black text-xs uppercase tracking-[3px]">
                  Select Language
                </h3>
                <Globe className="w-4 h-4 text-gold animate-pulse" />
              </div>

              <div className="space-y-6">
                <LanguageGroup
                  title="Indian Roots"
                  languages={languageGroups.indian}
                  currentLanguage={currentLanguage}
                  onSelect={handleLanguageChange}
                />

                <LanguageGroup
                  title="Global Reach"
                  languages={languageGroups.international}
                  currentLanguage={currentLanguage}
                  onSelect={handleLanguageChange}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const LanguageGroup = ({ title, languages, currentLanguage, onSelect }: any) => (
  <div className="space-y-3">
    <h4 className="text-text-muted text-[10px] font-black uppercase tracking-widest ml-1">{title}</h4>

    <div className="grid grid-cols-1 gap-2">
      {languages.map((lang: any) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${
            currentLanguage === lang.code
              ? 'bg-royal shadow-lg border border-white/20'
              : 'hover:bg-royal/5 border border-purple-border/20'
          }`}
        >
          <span className="text-2xl">{lang.flag}</span>

          <div className="flex-1 text-left">
            <div className={`text-sm font-bold tracking-tight ${currentLanguage === lang.code ? 'text-white' : 'text-text-main'}`}>
              {lang.nativeName}
            </div>
            <div className={`text-[10px] uppercase tracking-tighter ${currentLanguage === lang.code ? 'text-white/60' : 'text-text-muted'}`}>
              {lang.name}
            </div>
          </div>

          {currentLanguage === lang.code && (
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default LanguageSelector;
