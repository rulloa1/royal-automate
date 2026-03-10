import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useParallax } from "@/hooks/useParallax";
import { MapPin, Clock, Phone, Instagram } from "lucide-react";

const LandingContactSection = () => {
    const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver(0.2);
    const parallaxOffset = useParallax(0.15);

    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
            <div 
                className="absolute inset-0 -z-10"
                style={{ 
                    background: 'radial-gradient(circle at center, hsla(142, 50%, 20%, 0.15), transparent 70%)',
                    transform: `translateY(${parallaxOffset}px)` 
                }}
            />

            <div
                ref={contentRef as React.RefObject<HTMLDivElement>}
                className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Visit <span className="text-gradient">Flava Depot</span>
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Stop by and explore our full selection. Our budtenders are ready to help you find exactly what you need.
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-8">
                    <div className="glass-card p-8 text-left space-y-5">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" /> Hours
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Monday – Saturday</span>
                                <span className="text-foreground font-medium">10 AM – 8 PM</span>
                            </div>
                            <div className="divider" />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Sunday</span>
                                <span className="text-foreground font-medium">10 AM – 5 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 text-left space-y-5">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent" /> Connect
                        </h3>
                        <div className="space-y-3 text-sm">
                            <a href="https://instagram.com/flava_depot" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                                <Instagram className="w-4 h-4" /> @FLAVA_DEPOT
                            </a>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="w-4 h-4" /> Walk-ins Welcome
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingContactSection;
