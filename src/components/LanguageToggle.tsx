import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, changeLanguage, isTranslating } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      disabled={isTranslating}
      className="text-xs font-medium text-foreground hover:bg-transparent hover:text-primary transition-colors px-2 py-1 h-auto no-translate"
      title={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      {isTranslating ? '...' : (language === 'en' ? 'ES' : 'EN')}
    </Button>
  );
};

export default LanguageToggle; 