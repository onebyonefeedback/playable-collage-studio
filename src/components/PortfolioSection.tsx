import {useLanguage} from "@/contexts/LanguageContext";
import {useState, useEffect, useRef} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Play} from "lucide-react";

interface PortfolioEntry {
    id: string;
    title: string;
    previewImage: string;
    previewVideo?: string | null;
    html: string | null;
}

export const PortfolioSection = () => {
    const {t} = useLanguage();

    const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([]);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    // Load local JSON
    useEffect(() => {
        fetch("/portfolio.json")
            .then((res) => res.json())
            .then((data) => {
                setPortfolio(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load portfolio.json:", err);
                setLoading(false);
            });
    }, []);

    const handleMouseEnter = (id: string) => {
        const video = videoRefs.current[id];
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {
            });
        }
    };

    const handleMouseLeave = (id: string) => {
        const video = videoRefs.current[id];
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    if (loading) {
        return (
            <section id="portfolio" className="min-h-screen py-24 bg-muted">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xl font-mono">
                        {t("loading") || "Loading..."}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="min-h-screen py-24 bg-muted relative overflow-hidden noise-overlay">
            <div className="container mx-auto px-4">

                {/* TITLE */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-5xl lg:text-7xl font-bold mb-4 rotate-chaos-1 inline-block">
                        {t("portfolio_title")}
                    </h2>
                    <p className="text-xl font-mono rotate-chaos-3 inline-block bg-accent/20 px-6 py-2 collage-shadow">
                        {t("portfolio_subtitle")}
                    </p>
                </div>

                {/* EMPTY STATE */}
                {portfolio.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl font-mono text-muted-foreground">
                            {t("no_portfolio_items") || "No portfolio entries yet."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolio.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative group cursor-pointer ${
                                    index % 3 === 0
                                        ? "rotate-chaos-1"
                                        : index % 3 === 1
                                            ? "rotate-chaos-2"
                                            : "rotate-chaos-3"
                                } ${index % 2 === 0 ? "lg:translate-y-8" : ""} 
                                  animate-fade-in-up`}
                                style={{animationDelay: `${index * 0.1}s`}}
                                onClick={() => setSelectedProject(item.id)}
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={() => handleMouseLeave(item.id)}
                            >
                                <div
                                    className="relative overflow-hidden collage-shadow bg-background hover:scale-105 transition-all duration-500 tape-effect">

                                    <div className="relative aspect-[9/16] overflow-hidden">

                                        {/* VIDEO */}
                                        {item.previewVideo ? (
                                            <video
                                                ref={(el) => (videoRefs.current[item.id] = el)}
                                                src={item.previewVideo}
                                                className="w-full h-full object-cover transition-opacity"
                                                loop
                                                muted
                                                playsInline
                                            />
                                        ) : (
                                            <>
                                                <img
                                                    src={item.previewImage}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Play className="w-16 h-16 text-accent"/>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="p-4 bg-background">
                                        <h3 className="font-bold text-lg">{item.title}</h3>
                                    </div>

                                    <div
                                        className="absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-muted"/>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PLAYABLE MODAL */}
            <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="max-w-5xl h-[90vh] p-0 flex flex-col">
                    <div className="p-4 pb-2">
                        <DialogHeader className="p-0">
                            <DialogTitle className="font-bold text-xl">
                                {portfolio.find((i) => i.id === selectedProject)?.title}
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="flex-1 overflow-hidden rounded-b-lg">
                        <iframe
                            src={portfolio.find((i) => i.id === selectedProject)?.html || ""}
                            className="w-full h-full border-0"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};
