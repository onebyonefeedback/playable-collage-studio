import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { Send, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        description: '',
        contact: '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            toast.error('EmailJS keys are missing (.env)');
            return;
        }

        try {
            setLoading(true);

            // В EmailJS template variables должны совпадать по именам.
            await emailjs.send(
                serviceId,
                templateId,
                {
                    message: formData.description,
                    name: formData.contact,
                },
                { publicKey }
            );

            toast.success(t('contact_success'));
            setFormData({ description: '', contact: '' });
        } catch (err) {
            console.error(err);
            toast.error(t('contact_error') ?? 'Ошибка отправки. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="min-h-screen py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 bg-accent rotate-45" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-muted rotate-12" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/50 -rotate-12" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 lg:h-full animate-slide-in-left">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="w-80 h-96 bg-paper collage-shadow rotate-chaos-1 paper-texture" />
                                <div className="absolute top-8 left-8 w-64 h-80 bg-accent/30 collage-shadow rotate-chaos-2" />
                                <div className="absolute top-16 left-16 w-72 h-72 bg-muted collage-shadow rotate-chaos-3 tape-effect" />

                                <div className="absolute top-4 left-1/2 w-40 h-6 bg-tape/50 -rotate-12" />
                                <div className="absolute bottom-8 right-4 w-32 h-6 bg-tape/50 rotate-6" />

                                <div className="absolute top-1/3 left-1/4 bg-accent px-4 py-2 rotate-chaos-1 font-bold text-2xl">
                                    LETS
                                </div>
                                <div className="absolute top-1/2 right-1/4 bg-foreground text-background px-4 py-2 rotate-chaos-2 font-bold text-2xl">
                                    TALK
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-slide-in-right">
                        <h2 className="text-5xl lg:text-6xl font-bold mb-8 rotate-chaos-1 inline-block">
                            {t('contact_title')}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6 bg-paper p-8 collage-shadow rotate-chaos-3">
                            <div>
                                <Textarea
                                    placeholder={t('contact_description')}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="min-h-32 font-mono bg-background border-2 border-foreground"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <Input
                                    type="text"
                                    placeholder={t('contact_email')}
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    className="font-mono bg-background border-2 border-foreground"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full text-lg font-bold collage-shadow hover:scale-105 transition-transform"
                                size="lg"
                                disabled={loading}
                            >
                                <Send className="mr-2" />
                                {loading ? (t('contact_sending') ?? 'Отправка...') : t('contact_button')}
                            </Button>

                            <div className="text-center pt-4 border-t-2 border-foreground/20">
                                <p className="font-mono text-sm mb-3">{t('contact_telegram')}</p>
                                <div className="space-y-2">
                                    <a
                                        href="https://t.me/evemonaro"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-accent hover:underline font-bold"
                                    >
                                        @evemonaro
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <p className="font-mono text-sm">
                                        <a href="mailto:onebyone.feedback@gmail.com" className="text-accent hover:underline">
                                            onebyone.feedback@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};