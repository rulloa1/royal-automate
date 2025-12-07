import { ArrowUpRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Animated glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px] animate-pulse-glow animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] animate-pulse-glow animation-delay-800" />

        {/* Circuitry SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit paths */}
          <path
            d="M0 400 Q 300 350, 600 400 T 1200 400"
            stroke="hsl(45 100% 59% / 0.3)"
            strokeWidth="1"
            fill="none"
            className="animate-circuit-flow"
            strokeDasharray="10 5"
          />
          <path
            d="M0 200 Q 400 250, 800 200 T 1200 200"
            stroke="hsl(340 77% 48% / 0.3)"
            strokeWidth="1"
            fill="none"
            className="animate-circuit-flow animation-delay-200"
            strokeDasharray="10 5"
          />
          <path
            d="M0 600 Q 300 550, 700 600 T 1200 600"
            stroke="hsl(45 100% 59% / 0.2)"
            strokeWidth="1"
            fill="none"
            className="animate-circuit-flow animation-delay-400"
            strokeDasharray="10 5"
          />
          
          {/* Glowing nodes */}
          <circle cx="300" cy="350" r="4" fill="hsl(45 100% 59%)" className="animate-pulse-glow" />
          <circle cx="600" cy="400" r="4" fill="hsl(340 77% 48%)" className="animate-pulse-glow animation-delay-200" />
          <circle cx="900" cy="380" r="4" fill="hsl(45 100% 59%)" className="animate-pulse-glow animation-delay-400" />
          <circle cx="400" cy="250" r="3" fill="hsl(340 77% 48%)" className="animate-pulse-glow animation-delay-600" />
          <circle cx="800" cy="200" r="3" fill="hsl(45 100% 59%)" className="animate-pulse-glow animation-delay-800" />
          <circle cx="200" cy="600" r="4" fill="hsl(45 100% 59%)" className="animate-pulse-glow animation-delay-400" />
          <circle cx="700" cy="580" r="3" fill="hsl(340 77% 48%)" className="animate-pulse-glow animation-delay-600" />
          <circle cx="1000" cy="620" r="4" fill="hsl(45 100% 59%)" className="animate-pulse-glow animation-delay-200" />
        </svg>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(45 100% 59% / 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(45 100% 59% / 0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

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
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
