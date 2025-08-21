import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to Arabic
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'ar';
  });

  const isRTL = language === 'ar';

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Store language preference
    localStorage.setItem('language', language);
    
    // Update body classes for font handling
    if (language === 'ar') {
      document.body.classList.add('font-cairo');
      document.body.classList.remove('font-inter');
    } else {
      document.body.classList.add('font-inter');
      document.body.classList.remove('font-cairo');
    }
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguageState(current => current === 'ar' ? 'en' : 'ar');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      isRTL,
      toggleLanguage,
      setLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}