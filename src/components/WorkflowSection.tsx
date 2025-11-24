import { useLanguage } from '@/contexts/LanguageContext';
import duckLogo from '@/assets/duck-logo.png';

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
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl lg:text-7xl font-bold mb-4 rotate-chaos-1 inline-block">
            {t('workflow_title')}
          </h2>
          <p className="text-xl font-mono rotate-chaos-3 inline-block bg-accent/20 px-6 py-2 collage-shadow">
            {t('workflow_subtitle')}
          </p>
        </div>

        {/* Roadmap with duck */}
        <div className="relative max-w-7xl mx-auto">
          {/* Road/Path */}
          <div className="absolute left-0 right-0 top-1/2 h-2 bg-gradient-to-r from-muted via-accent/30 to-muted -translate-y-1/2 -z-10" 
               style={{ 
                 clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
                 filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
               }} 
          />
          
          {/* Steps connected by road */}
          <div className="relative flex justify-between items-center py-12">
            {steps.map((step, index) => (
              <div
                key={step.key}
                className="relative flex flex-col items-center animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  zIndex: 10 
                }}
              >
                {/* Connection dot on road */}
                <div className={`w-6 h-6 rounded-full bg-accent border-4 border-background collage-shadow mb-4 ${
                  index === 0 ? 'animate-pulse' : ''
                }`} />
                
                {/* Step card */}
                <div className={`relative group bg-paper p-6 w-32 collage-shadow tape-effect hover:scale-110 transition-all duration-300 ${
                  index % 2 === 0 ? 'rotate-chaos-1' : 'rotate-chaos-2'
                }`}>
                  <div className="text-3xl mb-2 text-center animate-bounce" 
                       style={{ animationDelay: `${index * 0.2}s`, animationDuration: '2s' }}>
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold font-mono bg-accent text-background px-2 py-1 mb-2 text-center">
                    {index + 1}
                  </div>
                  <p className="font-mono text-[10px] leading-tight text-center">
                    {t(step.key)}
                  </p>
                  
                  {/* Torn corner */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] border-b-muted" />
                </div>
              </div>
            ))}
          </div>

          {/* Duck traveling on the road */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 animate-[slide-in-right_20s_linear_infinite]">
            <img 
              src={duckLogo} 
              alt="Duck" 
              className="w-full h-full object-contain drop-shadow-lg"
              style={{ 
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                animation: 'slide-in-right 20s linear infinite, bounce 1s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* Decorative collage elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rotate-45 -z-20 collage-shadow" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-muted/20 rotate-12 -z-20 tape-effect" />
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-paper/50 -rotate-12 -z-20 collage-shadow" />
      </div>
    </section>
  );
};