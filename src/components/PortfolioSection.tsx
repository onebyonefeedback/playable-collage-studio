import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Play } from 'lucide-react';

export const PortfolioSection = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Mock portfolio items - replace with real data
  const portfolioItems = [
    {
      id: 1,
      title: 'Match-3 Puzzle Game',
      thumbnail: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop',
      videoPreview: 'path/to/preview1.mp4',
      playableUrl: 'path/to/playable1.html',
    },
    {
      id: 2,
      title: 'Racing Game Ad',
      thumbnail: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=400&h=300&fit=crop',
      videoPreview: 'path/to/preview2.mp4',
      playableUrl: 'path/to/playable2.html',
    },
    {
      id: 3,
      title: 'Strategy Battle',
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
      videoPreview: 'path/to/preview3.mp4',
      playableUrl: 'path/to/playable3.html',
    },
    {
      id: 4,
      title: 'Casual Cooking',
      thumbnail: 'https://images.unsplash.com/photo-1556438758-8d49568ce18e?w=400&h=300&fit=crop',
      videoPreview: 'path/to/preview4.mp4',
      playableUrl: 'path/to/playable4.html',
    },
    {
      id: 5,
      title: 'Adventure Quest',
      thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
      videoPreview: 'path/to/preview5.mp4',
      playableUrl: 'path/to/playable5.html',
    },
    {
      id: 6,
      title: 'Shooter Action',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      videoPreview: 'path/to/preview6.mp4',
      playableUrl: 'path/to/playable6.html',
    },
  ];

  return (
    <section id="portfolio" className="min-h-screen py-24 bg-muted relative overflow-hidden noise-overlay">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-7xl font-bold mb-4 rotate-chaos-1 inline-block">
            {t('portfolio_title')}
          </h2>
          <p className="text-xl font-mono rotate-chaos-3 inline-block bg-accent/20 px-6 py-2 collage-shadow">
            {t('portfolio_subtitle')}
          </p>
        </div>

        {/* Asymmetric collage grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative group cursor-pointer ${
                index % 3 === 0 ? 'rotate-chaos-1' : index % 3 === 1 ? 'rotate-chaos-2' : 'rotate-chaos-3'
              } ${index % 2 === 0 ? 'lg:translate-y-8' : ''}`}
              onClick={() => setSelectedProject(item.id)}
            >
              <div className="relative overflow-hidden collage-shadow bg-background hover:scale-105 transition-transform duration-300 tape-effect">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-16 h-16 text-accent" />
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
            <p className="font-mono text-muted-foreground">
              Playable ad will be embedded here
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
