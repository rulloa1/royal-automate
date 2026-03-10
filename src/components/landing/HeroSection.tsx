import { MapPin, Clock, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/flava-depot-logo.png";

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
            {/* Parallax Background Elements */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
                style={{ 
                    background: 'hsla(142, 50%, 30%, 0.15)',
                    transform: `translate(-50%, calc(-50% + ${scrollY * 0.3}px))` 
                }}
            />
            <div 
                className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] -z-10"
                style={{ 
                    background: 'hsla(45, 70%, 50%, 0.08)',
                    transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)` 
                }}
            />

            <div className="max-w-4xl mx-auto text-center space-y-8">
                {/* Logo */}
                <div className="fade-in-up">
                    <img src={logo} alt="Flava Depot" className="h-28 md:h-40 mx-auto object-contain" />
                </div>

                {/* Tagline */}
                <div className="fade-in-up delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium tracking-wide uppercase" style={{ color: 'hsl(142, 50%, 55%)' }}>
                    <span className="status-dot" />
                    Premium Cannabis Dispensary
                </div>

                {/* Headline */}
                <h1 className="fade-in-up delay-100 text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                    Elevate Your <br className="hidden md:block" />
                    <span className="text-gradient">Experience</span>
                </h1>

                {/* Subheadline */}
                <p className="fade-in-up delay-200 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                    Fresh, lab-tested flower, edibles, concentrates, and more. Visit us for the finest selection and knowledgeable staff.
                </p>

                {/* CTAs */}
                <div className="fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <a href="#menu" className="shiny-cta group">
                        <span className="flex items-center gap-2">
                            View Our Menu
                        </span>
                    </a>
                    <a
                        href="https://instagram.com/flava_depot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border border-foreground/10 bg-foreground/5 text-muted-foreground text-sm font-medium hover:bg-foreground/10 hover:text-foreground transition-all flex items-center gap-2"
                    >
                        <Instagram className="w-4 h-4" />
                        @FLAVA_DEPOT
                    </a>
                </div>

                {/* Info Cards */}
                <div className="fade-in-up delay-400 pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    <div className="glass-card p-6 text-center">
                        <Clock className="w-5 h-5 mx-auto mb-3 text-primary" />
                        <p className="text-sm font-semibold text-foreground">Mon – Sat</p>
                        <p className="text-xs text-muted-foreground mt-1">10:00 AM – 8:00 PM</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <Clock className="w-5 h-5 mx-auto mb-3 text-primary" />
                        <p className="text-sm font-semibold text-foreground">Sunday</p>
                        <p className="text-xs text-muted-foreground mt-1">10:00 AM – 5:00 PM</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <MapPin className="w-5 h-5 mx-auto mb-3 text-accent" />
                        <p className="text-sm font-semibold text-foreground">Visit Us</p>
                        <p className="text-xs text-muted-foreground mt-1">Walk-ins Welcome</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
