import { useLanguage } from '@/contexts/LanguageContext';
import { Gamepad2, TrendingDown, Zap, Target } from 'lucide-react';

export const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Zap,
      title: t('benefit_1_title'),
      text: t('benefit_1_text'),
      rotation: 'rotate-chaos-1',
      color: 'bg-accent',
    },
    {
      icon: Gamepad2,
      title: t('benefit_2_title'),
      text: t('benefit_2_text'),
      rotation: 'rotate-chaos-2',
      color: 'bg-muted',
    },
    {
      icon: TrendingDown,
      title: t('benefit_3_title'),
      text: t('benefit_3_text'),
      rotation: 'rotate-chaos-3',
      color: 'bg-paper',
    },
    {
      icon: Target,
      title: t('benefit_4_title'),
      text: t('benefit_4_text'),
      rotation: 'rotate-chaos-1',
      color: 'bg-accent/30',
    },
  ];

  return (
    <section id="benefits" className="min-h-screen py-24 relative overflow-hidden">
      {/* Background collage elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rotate-45 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-muted blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl lg:text-7xl font-bold mb-16 text-center rotate-chaos-2 inline-block">
          {t('benefits_title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`${benefit.color} ${benefit.rotation} p-8 collage-shadow hover:scale-105 transition-transform duration-300 noise-overlay tape-effect group cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <benefit.icon className="w-12 h-12 mb-4 group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">{benefit.title}</h3>
              <p className="font-mono text-sm lg:text-base opacity-80">{benefit.text}</p>

              {/* Decorative corner tear */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-background rotate-45 transform translate-x-4 -translate-y-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
