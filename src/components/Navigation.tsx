import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-lg font-bold hover:text-accent transition-colors"
          >
            {t('nav_home')}
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-wider"
          >
            {t('nav_benefits')}
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-wider"
          >
            {t('nav_works')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-wider"
          >
            {t('nav_contacts')}
          </button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={language === 'ru' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('ru')}
            className="font-mono text-xs"
          >
            RU
          </Button>
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
            className="font-mono text-xs"
          >
            EN
          </Button>
        </div>
      </div>
    </nav>
  );
};
