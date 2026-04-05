import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cache for translations with expiry (24 hours)
const translationCache = new Map<string, { translation: string; timestamp: number }>();
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem('selectedLanguage');
    // Only allow en or es — anything else (from browser detection) falls back to en
    if (stored === 'es') return 'es';
    return 'en';
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedElements, setTranslatedElements] = useState<WeakMap<Element, string>>(new WeakMap());
  // Ref so the MutationObserver always reads the latest language without stale closures
  const languageRef = useRef(language);

  const changeLanguage = useCallback(async (lang: string) => {
    // Only English and Spanish are supported
    if (lang !== 'en' && lang !== 'es') return;
    if (lang === language) return;

    // Update ref immediately so the MutationObserver won't re-translate
    // DOM changes that happen while React is re-rendering after the switch
    languageRef.current = lang;

    if (lang === 'en') {
      // Restore BEFORE i18next re-renders. At this moment i18next-managed elements
      // still show the old language, so their textContent === data-original-text
      // (both in the same language) — they get skipped. Only genuinely
      // DOM-translated Sanity content (where original was stored in English)
      // gets correctly restored here.
      restoreOriginalContent();
    }

    setIsTranslating(true);
    setLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    await i18n.changeLanguage(lang);
    setIsTranslating(false);
    document.documentElement.lang = lang;
  }, [language, i18n]);

  const restoreOriginalContent = () => {
    const elements = document.querySelectorAll('[data-original-text]');
    elements.forEach(element => {
      const originalText = element.getAttribute('data-original-text');
      if (originalText && element.textContent !== originalText) {
        element.textContent = originalText;
      }
    });
  };

  const translateText = useCallback(async (text: string, targetLang: string): Promise<string> => {
    // Only translate to Spanish — guard against any other language leaking in
    if (targetLang !== 'es') return text;

    // Check cache first
    const cacheKey = `${text}|${targetLang}`;
    const cached = translationCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
      return cached.translation;
    }

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      );
      
      if (!response.ok) throw new Error('MyMemory API failed');
      
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        const translation = data.responseData.translatedText;
        // Cache the result
        translationCache.set(cacheKey, { translation, timestamp: Date.now() });
        return translation;
      }
      
      throw new Error('MyMemory translation failed');
    } catch (error) {
      try {
        const fallbackResponse = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
        );
        
        if (!fallbackResponse.ok) throw new Error('Fallback API failed');
        
        const fallbackData = await fallbackResponse.json();
        if (fallbackData && fallbackData[0] && fallbackData[0][0] && fallbackData[0][0][0]) {
          const translation = fallbackData[0][0][0];
          // Cache the result
          translationCache.set(cacheKey, { translation, timestamp: Date.now() });
          return translation;
        }
      } catch (fallbackError) {
        console.warn('Both translation APIs failed:', error, fallbackError);
      }
      
      return text;
    }
  }, []);

  // Preserve the capitalisation pattern of the original when applying a translation.
  // e.g. "OUR PODCAST" → "NUESTRO PODCAST", "Watch" → "Mirar" (not "mirar")
  const matchCase = (original: string, translated: string): string => {
    if (!translated) return translated;
    // ALL CAPS
    if (/[A-Z]/.test(original) && original === original.toUpperCase()) {
      return translated.toUpperCase();
    }
    // First letter capitalised
    if (original[0] && original[0] !== original[0].toLowerCase()) {
      return translated.charAt(0).toUpperCase() + translated.slice(1);
    }
    return translated;
  };

  const translatePageContent = useCallback(async (targetLang: string) => {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, button, a, li');
    const textsToTranslate: { element: Element; text: string }[] = [];

    elements.forEach(element => {
      if (
        element.closest('.no-translate') ||
        element.classList.contains('no-translate') ||
        element.closest('script') ||
        element.closest('style') ||
        element.closest('code') ||
        element.closest('pre')
      ) {
        return;
      }

      const text = element.textContent?.trim();
      if (
        text &&
        text.length > 1 &&
        text.length < 500 &&
        !/^\d+$/.test(text) &&
        !/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(text) &&
        !/^[^\w\s]+$/.test(text) &&
        element.children.length === 0
      ) {
        if (!element.getAttribute('data-original-text')) {
          element.setAttribute('data-original-text', text);
        }
        textsToTranslate.push({ element, text });
      }
    });

    const batchSize = 10; // Increased batch size for better performance
    for (let i = 0; i < textsToTranslate.length; i += batchSize) {
      const batch = textsToTranslate.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async ({ element, text }) => {
          try {
            const translatedText = await translateText(text, targetLang);
            const finalText = matchCase(text, translatedText);
            if (finalText && finalText !== text) {
              element.textContent = finalText;
              translatedElements.set(element, finalText);
            }
          } catch (error) {
            console.warn('Translation failed for:', text, error);
          }
        })
      );
      await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
    }
  }, [translateText, translatedElements]);

  // Sync initial language with i18next
  useEffect(() => {
    if (i18n.isInitialized) {
      const storedLang = localStorage.getItem('selectedLanguage') === 'es' ? 'es' : 'en';
      if (storedLang !== i18n.language) {
        i18n.changeLanguage(storedLang);
      }
      setLanguage(storedLang);
    }
  }, [i18n.isInitialized, i18n]);

  useEffect(() => {
    if (language !== 'en') {
      const timer = setTimeout(() => {
        translatePageContent(language);
      }, 500);
      return () => clearTimeout(timer);
    }
    // Restoration is handled in changeLanguage BEFORE i18next re-renders,
    // not here — running it after re-renders was overwriting correct English
    // with incorrectly-stored Spanish data-original-text values
  }, [language, translatePageContent]);

  // Handle page navigation persistence
  useEffect(() => {
    const handlePageChange = () => {
      if (languageRef.current !== 'en') {
        setTimeout(() => {
          translatePageContent(languageRef.current);
        }, 1000);
      }
    };

    // Listen for browser navigation events
    window.addEventListener('popstate', handlePageChange);
    
    // Listen for DOM changes to handle React routing
    const observer = new MutationObserver((mutations) => {
      const hasSignificantChanges = mutations.some(mutation => 
        mutation.type === 'childList' && 
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && 
          (node as Element).tagName !== 'SCRIPT'
        )
      );
      
      if (hasSignificantChanges && languageRef.current !== 'en') {
        setTimeout(() => {
          translatePageContent(languageRef.current);
        }, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('popstate', handlePageChange);
      observer.disconnect();
    };
  }, [language, translatePageContent]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};