import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguageRefresh() {
  const { i18n } = useTranslation();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      setRefreshKey(prev => prev + 1);
    };

    // Listen to both i18n language changes and custom events
    i18n.on('languageChanged', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return refreshKey;
}