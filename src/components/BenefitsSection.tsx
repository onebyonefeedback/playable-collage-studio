import { useLanguage } from '@/contexts/LanguageContext';

export const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    { key: 1, icon: '🎮' },
    { key: 2, icon: '🕹️' },
    { key: 3, icon: '📉' },
    { key: 4, icon: '🚀' },
    { key: 5, icon: '🎯' },
    { key: 6, icon: '⚡' },
  ];

  return (
    <section id="benefits" className="min-h-screen py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl lg:text-7xl font-bold mb-4 rotate-chaos-1 inline-block">
            {t('benefits_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.key}
              className={`relative group bg-paper p-8 collage-shadow tape-effect hover:scale-105 transition-all duration-300 animate-fade-in-up ${
                index % 3 === 0 ? 'rotate-chaos-1' : index % 3 === 1 ? 'rotate-chaos-2' : 'rotate-chaos-3'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Sticker icon */}
              <div className="text-5xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
                {benefit.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold mb-2 font-mono">
                {t(`benefit_${benefit.key}_title`)}
              </h3>
              
              {/* Text */}
              <p className="text-sm text-muted-foreground font-mono">
                {t(`benefit_${benefit.key}_text`)}
              </p>

              {/* Torn corner effect */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-muted" />
              
              {/* Tape decoration */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-accent/50 rotate-3" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-accent/10 rotate-45 -z-10" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-muted/30 -rotate-12 -z-10" />
    </section>
  );
};
