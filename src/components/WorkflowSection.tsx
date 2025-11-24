import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export const WorkflowSection = () => {
  const { t } = useLanguage();

  const steps = [
    { key: 'workflow_step_1', icon: '📋' },
    { key: 'workflow_step_2', icon: '🔒' },
    { key: 'workflow_step_3', icon: '📝' },
    { key: 'workflow_step_4', icon: '🎨' },
    { key: 'workflow_step_5', icon: '🖼️' },
    { key: 'workflow_step_6', icon: '🎬' },
    { key: 'workflow_step_7', icon: '✅' },
  ];

  return (
    <section id="workflow" className="min-h-screen py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl lg:text-7xl font-bold mb-4 rotate-chaos-1 inline-block">
            {t('workflow_title')}
          </h2>
          <p className="text-xl font-mono rotate-chaos-3 inline-block bg-accent/20 px-6 py-2 collage-shadow">
            {t('workflow_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.key}
              className={`relative group animate-fade-in-up ${
                index % 3 === 0 ? 'rotate-chaos-1' : index % 3 === 1 ? 'rotate-chaos-2' : 'rotate-chaos-3'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-paper p-6 collage-shadow tape-effect hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-5xl flex-shrink-0 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold font-mono bg-accent text-background px-2 py-1">
                        {index + 1}
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <p className="font-mono text-sm leading-relaxed">
                      {t(step.key)}
                    </p>
                  </div>
                </div>

                {/* Torn paper corner */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-muted" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rotate-45 -z-10" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-muted/20 rotate-12 -z-10" />
      </div>
    </section>
  );
};