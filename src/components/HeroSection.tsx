import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20 noise-overlay"
    >
      {/* Floating collage elements */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rotate-chaos-1 animate-float collage-shadow"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px) rotate(-2deg)`,
        }}
      />
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-muted rotate-chaos-2 animate-float collage-shadow"
        style={{
          animationDelay: '1s',
          transform: `translate(${-parallaxX}px, ${-parallaxY}px) rotate(3deg)`,
        }}
      />
      <div
        className="absolute top-40 right-40 w-24 h-24 bg-accent/30 rotate-chaos-3 animate-float collage-shadow"
        style={{
          animationDelay: '2s',
          transform: `translate(${parallaxX * 1.5}px, ${parallaxY * 1.5}px) rotate(-1deg)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-6 animate-slide-in-left">
            <h1 className="text-6xl lg:text-8xl font-bold leading-none">
              <span className="block rotate-chaos-1 inline-block">{t('hero_title').split(',')[0]},</span>
              <br />
              <span className="block text-accent rotate-chaos-2 inline-block mt-2">
                {t('hero_title').split(',')[1]}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl font-mono rotate-chaos-3 inline-block bg-paper p-4 collage-shadow">
              {t('hero_subtitle')}
            </p>
          </div>

          {/* Duck visual */}
          <div className="relative h-96 animate-slide-in-right">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main duck shape - simplified geometric representation */}
              <div className="relative">
                {/* Duck body */}
                <div className="w-64 h-48 bg-accent rounded-full rotate-chaos-1 collage-shadow tape-effect" />
                
                {/* Duck head */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent rounded-full rotate-chaos-2 collage-shadow" />
                
                {/* Duck beak */}
                <div className="absolute -top-12 left-1/2 translate-x-8 w-16 h-8 bg-accent rotate-chaos-3 collage-shadow" 
                     style={{ clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)' }} />
                
                {/* Duck eye */}
                <div className="absolute -top-10 left-1/2 -translate-x-4 w-4 h-4 bg-foreground rounded-full" />
                
                {/* Collage overlay elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-paper rotate-12 collage-shadow paper-texture" />
                  <div className="absolute bottom-8 left-8 w-24 h-16 bg-muted -rotate-6 collage-shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom torn paper edge effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background"
           style={{ clipPath: 'polygon(0 50%, 2% 45%, 4% 52%, 6% 48%, 8% 53%, 10% 47%, 12% 51%, 14% 46%, 16% 50%, 18% 45%, 20% 49%, 22% 44%, 24% 48%, 26% 43%, 28% 47%, 30% 42%, 32% 46%, 34% 41%, 36% 45%, 38% 40%, 40% 44%, 42% 39%, 44% 43%, 46% 38%, 48% 42%, 50% 37%, 52% 41%, 54% 36%, 56% 40%, 58% 35%, 60% 39%, 62% 34%, 64% 38%, 66% 33%, 68% 37%, 70% 32%, 72% 36%, 74% 31%, 76% 35%, 78% 30%, 80% 34%, 82% 29%, 84% 33%, 86% 28%, 88% 32%, 90% 27%, 92% 31%, 94% 26%, 96% 30%, 98% 25%, 100% 29%, 100% 100%, 0 100%)' }}
      />
    </section>
  );
};
