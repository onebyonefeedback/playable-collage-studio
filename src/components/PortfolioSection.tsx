import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PortfolioItem {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string | null;
  playable_url: string | null;
  display_order: number;
}

export const PortfolioSection = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (itemId: string) => {
    const video = videoRefs.current[itemId];
    if (video) {
      video.currentTime = 0;
      video.play().catch(err => console.log('Video play failed:', err));
    }
  };

  const handleMouseLeave = (itemId: string) => {
    const video = videoRefs.current[itemId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  if (loading) {
    return (
      <section id="portfolio" className="min-h-screen py-24 bg-muted relative overflow-hidden noise-overlay">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl font-mono">{t('loading') || 'Loading...'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="min-h-screen py-24 bg-muted relative overflow-hidden noise-overlay">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl lg:text-7xl font-bold mb-4 rotate-chaos-1 inline-block">
            {t('portfolio_title')}
          </h2>
          <p className="text-xl font-mono rotate-chaos-3 inline-block bg-accent/20 px-6 py-2 collage-shadow">
            {t('portfolio_subtitle')}
          </p>
        </div>

        {portfolioItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl font-mono text-muted-foreground">
              {t('no_portfolio_items') || 'No portfolio items yet. Add some in the admin panel!'}
            </p>
          </div>
        ) : (
          /* Asymmetric collage grid - VERTICAL FORMAT */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className={`relative group cursor-pointer ${
                  index % 3 === 0 ? 'rotate-chaos-1' : index % 3 === 1 ? 'rotate-chaos-2' : 'rotate-chaos-3'
                } ${index % 2 === 0 ? 'lg:translate-y-8' : ''} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(item.id)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                <div className="relative overflow-hidden collage-shadow bg-background hover:scale-105 transition-all duration-500 tape-effect">
                  {/* Vertical aspect ratio container */}
                  <div className="relative aspect-[9/16] overflow-hidden">
                    {item.video_url ? (
                      <>
                        <video
                          ref={(el) => (videoRefs.current[item.id] = el)}
                          src={item.video_url}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                          <Play className="w-16 h-16 text-accent animate-pulse" />
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-16 h-16 text-accent" />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="p-4 bg-background">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>

                  {/* Torn paper corner */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-muted" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Playable Ad Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              {portfolioItems.find(item => item.id === selectedProject)?.title}
            </DialogTitle>
            <DialogDescription className="font-mono">
              Interactive Playable Ad Preview
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full bg-muted flex items-center justify-center">
            {portfolioItems.find(item => item.id === selectedProject)?.playable_url ? (
              <iframe
                src={portfolioItems.find(item => item.id === selectedProject)?.playable_url || ''}
                className="w-full h-full border-0"
                title="Playable Ad"
              />
            ) : (
              <p className="font-mono text-muted-foreground">
                No playable ad available for this project
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
