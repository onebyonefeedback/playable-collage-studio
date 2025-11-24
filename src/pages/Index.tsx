import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { WorkflowSection } from '@/components/WorkflowSection';
import { ContactSection } from '@/components/ContactSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <BenefitsSection />
        <PortfolioSection />
        <WorkflowSection />
        <ContactSection />
      </div>
    </LanguageProvider>
  );
};

export default Index;