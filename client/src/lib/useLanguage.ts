import { useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

export interface LanguageState {
  language: Language;
  isRTL: boolean;
}

/**
 * Custom hook for language and RTL detection
 * Detects the current language from document direction and other indicators
 */
export function useLanguage(): LanguageState {
  const [language, setLanguage] = useState<Language>('ar');
  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    // Multiple detection methods for language/direction
    const detectLanguage = (): Language => {
      // Method 1: Check document/body direction
      const docDirection = document.documentElement.dir || document.body.dir;
      if (docDirection === 'ltr') return 'en';
      if (docDirection === 'rtl') return 'ar';

      // Method 2: Check document language
      const docLang = document.documentElement.lang || document.body.lang;
      if (docLang.startsWith('ar')) return 'ar';
      if (docLang.startsWith('en')) return 'en';

      // Method 3: Check for Arabic content in the page (fallback)
      const hasArabicContent = document.body.textContent?.match(/[\u0600-\u06FF]/);
      if (hasArabicContent) return 'ar';

      // Default to Arabic for this project
      return 'ar';
    };

    const detectedLanguage = detectLanguage();
    const detectedIsRTL = detectedLanguage === 'ar';

    setLanguage(detectedLanguage);
    setIsRTL(detectedIsRTL);

    // Set document direction if not already set
    if (!document.documentElement.dir) {
      document.documentElement.dir = detectedIsRTL ? 'rtl' : 'ltr';
    }
  }, []);

  return { language, isRTL };
}

/**
 * Utility function to get text direction class names
 */
export function getDirectionClasses(isRTL: boolean) {
  return {
    textAlign: isRTL ? 'text-right' : 'text-left',
    marginStart: isRTL ? 'mr-auto' : 'ml-auto',
    marginEnd: isRTL ? 'ml-auto' : 'mr-auto',
    paddingStart: isRTL ? 'pr-4' : 'pl-4',
    paddingEnd: isRTL ? 'pl-4' : 'pr-4',
    spaceX: isRTL ? 'space-x-reverse' : 'space-x-2',
    flexDirection: isRTL ? 'flex-row-reverse' : 'flex-row',
  };
}