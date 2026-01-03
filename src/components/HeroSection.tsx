import { ArrowRight, MessageCircle } from "lucide-react";
import partnerLogo from "@/assets/royscompany-logo.png";
import { scrollToSection } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card/50">
              <span className="status-dot" />
              <span className="text-sm text-muted-foreground">
                AI Systems Engineered
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center mb-8 animate-fade-in-up animation-delay-200 leading-[1.1] text-balance">
            <span className="text-muted-foreground">AI</span>
            <span className="text-foreground">SYSTEM</span>
            <br />
            <span className="text-foreground">ENGINEERED</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto animate-fade-in-up animation-delay-400 leading-relaxed">
            We automate content, workflows, and decision-making so your business scales without adding headcount.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24 animate-fade-in-up animation-delay-600">
            <button
              onClick={() => scrollToSection("#contact")}
              className="gradient-button inline-flex items-center justify-center gap-3 text-base group"
            >
              <span>Start Your Transformation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="https://t.me/RoysCompany"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-button-secondary inline-flex items-center justify-center gap-3 text-base"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with AI</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 animate-fade-in-up animation-delay-800">
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-medium text-foreground">150+</span>
              <p className="text-sm text-muted-foreground mt-2">Videos Generated</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-medium text-foreground">10M+</span>
              <p className="text-sm text-muted-foreground mt-2">Views Generated</p>
            </div>
          </div>

          {/* Partner Badge */}
          <div className="mt-16 flex justify-center animate-fade-in-up animation-delay-1000">
            <a 
              href="https://www.royscompany.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-card/30 hover:bg-card/50 transition-colors"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Partner of</span>
              <img src={partnerLogo} alt="RoysCompany" className="h-6 object-contain" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;