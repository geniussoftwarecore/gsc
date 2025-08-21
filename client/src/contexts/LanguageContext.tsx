import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

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
    // Get language from cookie, then localStorage, or default to Arabic
    if (typeof document !== 'undefined') {
      const cookieLanguage = Cookies.get('NEXT_LOCALE');
      if (cookieLanguage === 'ar' || cookieLanguage === 'en') {
        return cookieLanguage;
      }
      const stored = localStorage.getItem('language');
      return (stored as Language) || 'ar';
    }
    return 'ar';
  });

  const isRTL = language === 'ar';

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Store language preference in both cookie and localStorage
    if (typeof document !== 'undefined') {
      Cookies.set('NEXT_LOCALE', language, { expires: 365, sameSite: 'lax' });
      localStorage.setItem('language', language);
    }
    
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