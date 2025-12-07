import { LayoutGrid, Zap, Check } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ServicesSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const foundationFeatures = [
    "Custom Website Design",
    "Mobile-Responsive",
    "SEO Optimization",
    "SSL Security",
    "CMS Integration",
    "Analytics Integration",
  ];

  const growthFeatures = [
    "AI Lead Generation",
    "Automated Email/SMS",
    "CRM Integration",
    "Smart Chatbot",
    "Appointment Scheduling",
    "Analytics Dashboard",
    "Social Media Automation",
    "24/7 Support",
  ];

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise Solutions for{" "}
            <span className="gradient-text">Modern Businesses</span>
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Foundation Package */}
          <div
            className={`glass-card-hover p-8 ${
              isVisible ? "animate-slide-in-left animation-delay-200" : "opacity-0"
            }`}
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6">
              <LayoutGrid className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Foundation Package</h3>
            <p className="text-muted-foreground mb-6">
              Launch your digital presence with premium, conversion-optimized
              websites designed to impress and convert.
            </p>
            <ul className="space-y-3 mb-6">
              {foundationFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="glass-card p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Perfect for businesses establishing their digital foundation
              </p>
            </div>
          </div>

          {/* Growth Engine Package */}
          <div
            className={`glass-card-hover p-8 featured-border relative ${
              isVisible ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            {/* Most Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                Most Popular
              </span>
            </div>

            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Growth Engine</h3>
            <p className="text-muted-foreground mb-6">
              Intelligent lead generation, automated workflows, and AI-powered
              engagement that works for you 24/7.
            </p>
            <ul className="space-y-3 mb-6">
              {growthFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
              <p className="text-sm text-primary font-medium">
                Perfect for businesses ready to scale and dominate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
