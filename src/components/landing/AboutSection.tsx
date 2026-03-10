import { Instagram, Shield, Award } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useParallax } from "@/hooks/useParallax";
import flyer from "@/assets/flava-depot-flyer.jpg";

const AboutSection = () => {
    const { ref: imageRef, isVisible: imageVisible } = useIntersectionObserver(0.2);
    const { ref: textRef, isVisible: textVisible } = useIntersectionObserver(0.2);
    const parallaxOffset = useParallax(0.1);

    return (
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
            <div 
                className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full blur-[100px] -z-10"
                style={{ 
                    background: 'hsla(142, 50%, 30%, 0.1)',
                    transform: `translateY(${parallaxOffset}px)` 
                }}
            />

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div
                    ref={imageRef as React.RefObject<HTMLDivElement>}
                    className={`transition-all duration-700 ${imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                >
                    <div className="glass-card p-3 rounded-2xl">
                        <img
                            src={flyer}
                            alt="Flava Depot Flower Menu"
                            className="rounded-xl w-full object-cover"
                        />
                    </div>
                </div>

                <div
                    ref={textRef as React.RefObject<HTMLDivElement>}
                    className={`space-y-6 transition-all duration-700 delay-200 ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        About <span className="text-gradient">Flava Depot</span>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Flava Depot is your neighborhood premium cannabis dispensary. We're committed to providing the highest quality flower, edibles, concentrates, and accessories at fair prices.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Our knowledgeable budtenders are here to help you find the perfect product, whether you're a seasoned enthusiast or exploring for the first time.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="glass-card p-4 text-center">
                            <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <p className="text-xs font-semibold text-foreground">Lab Tested</p>
                            <p className="text-[10px] text-muted-foreground mt-1">All products verified</p>
                        </div>
                        <div className="glass-card p-4 text-center">
                            <Award className="w-6 h-6 mx-auto mb-2 text-accent" />
                            <p className="text-xs font-semibold text-foreground">Premium Quality</p>
                            <p className="text-[10px] text-muted-foreground mt-1">Hand-selected strains</p>
                        </div>
                    </div>

                    <a
                        href="https://instagram.com/flava_depot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pt-2"
                    >
                        <Instagram className="w-4 h-4" /> Follow @FLAVA_DEPOT
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
