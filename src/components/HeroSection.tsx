import { Sparkles, Zap, Clock, Shield } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        {/* Gold accent orb */}
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
        {/* Additional ambient orb */}
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow animation-delay-800" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Premium Automation Solutions
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-200">
            Automate Your{" "}
            <span className="gradient-text">Growth</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Transform your business with enterprise-grade websites, intelligent lead
            generation, and powerful automation systems. Built for businesses ready
            to scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-600">
            <button
              onClick={() => scrollToSection("#contact")}
              className="gradient-button inline-flex items-center justify-center gap-2 text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Start Your Transition
            </button>
            <button
              onClick={() => scrollToSection("#services")}
              className="glass-card-hover px-6 py-3 font-semibold text-foreground inline-flex items-center justify-center gap-2 text-lg"
            >
              Explore Services
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up animation-delay-800">
            <div className="glass-card p-4 flex items-center justify-center gap-3">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-semibold">10x Lead Generation</span>
            </div>
            <div className="glass-card p-4 flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-accent" />
              <span className="font-semibold">24/7 Automation</span>
            </div>
            <div className="glass-card p-4 flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold">99% Uptime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
