import { ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import partnerLogo from "@/assets/royscompany-logo.png";

const HeroSection = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      // Dynamically import Vanta to avoid SSR issues
      import("vanta/dist/vanta.net.min").then((VANTA) => {
        const effect = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffc72c, // Royal Gold
          backgroundColor: 0x0a0a0a, // Deep Space Black
          points: 12.0,
          maxDistance: 22.0,
          spacing: 18.0,
        });
        setVantaEffect(effect);
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Vanta.js NET Background */}
      <div ref={vantaRef} className="absolute inset-0 z-0" />

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-[1]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 mb-10 animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-sm font-condensed font-medium tracking-wider uppercase text-muted-foreground">
              Enterprise AI Solutions
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            Automate Your{" "}
            <span className="gradient-text">Growth</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400 leading-relaxed">
            Transform your business with enterprise-grade AI automation, 
            intelligent lead generation, and powerful workflow systems.
          </p>

          {/* CTA Button - Royal Gold rectangle with arrow */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20 animate-fade-in-up animation-delay-600">
            <button
              onClick={() => scrollToSection("#contact")}
              className="gradient-button inline-flex items-center justify-center gap-3 text-lg group"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Your Transformation</span>
              <ArrowUpRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <button
              onClick={() => scrollToSection("#services")}
              className="glass-card-hover px-8 py-4 font-semibold text-foreground inline-flex items-center justify-center gap-2 text-lg"
            >
              <span>Explore Services</span>
            </button>
            <a
              href="https://t.me/royAIsolutionsBot"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-hover px-8 py-4 font-semibold text-foreground inline-flex items-center justify-center gap-2 text-lg border border-primary/20 hover:border-primary/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with AI</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up animation-delay-800">
            <div className="glass-card p-5 flex flex-col items-center gap-2">
              <span className="text-3xl font-display font-bold text-primary">10x</span>
              <span className="text-sm font-condensed tracking-wider uppercase text-muted-foreground">Lead Generation</span>
            </div>
            <div className="glass-card p-5 flex flex-col items-center gap-2">
              <span className="text-3xl font-display font-bold text-primary">24/7</span>
              <span className="text-sm font-condensed tracking-wider uppercase text-muted-foreground">AI Automation</span>
            </div>
            <div className="glass-card p-5 flex flex-col items-center gap-2">
              <span className="text-3xl font-display font-bold text-primary">99.9%</span>
              <span className="text-sm font-condensed tracking-wider uppercase text-muted-foreground">System Uptime</span>
            </div>
          </div>

          {/* Partner Badge */}
          <div className="mt-12 animate-fade-in-up animation-delay-1000">
            <a 
              href="https://royscompany.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 glass-card px-6 py-3 hover:bg-white/5 transition-colors"
            >
              <span className="text-sm text-muted-foreground font-condensed uppercase tracking-wider">Partner of</span>
              <img src={partnerLogo} alt="RoysCompany" className="h-8 object-contain" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
};

export default HeroSection;
