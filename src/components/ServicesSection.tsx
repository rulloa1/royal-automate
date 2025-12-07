import { LayoutGrid, Zap, Brain, ArrowUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ServicesSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const services = [
    {
      icon: LayoutGrid,
      title: "Web Development",
      description: "Premium, conversion-optimized websites designed to establish your digital presence and drive results.",
      features: [
        "Custom Website Design",
        "Mobile-First Responsive",
        "SEO Optimization",
        "Performance Tuning",
      ],
      gradient: "from-primary to-gold-dark",
    },
    {
      icon: Zap,
      title: "AI Automation",
      description: "Intelligent automation systems that handle repetitive tasks, freeing your team to focus on growth.",
      features: [
        "Workflow Automation",
        "Email & SMS Sequences",
        "CRM Integration",
        "Smart Scheduling",
      ],
      gradient: "from-primary to-accent",
      featured: true,
    },
    {
      icon: Brain,
      title: "Lead Generation",
      description: "AI-powered lead capture and nurturing systems that work around the clock to grow your pipeline.",
      features: [
        "Smart Chatbots",
        "Lead Scoring",
        "Multi-Channel Outreach",
        "Analytics Dashboard",
      ],
      gradient: "from-accent to-progress-red-dark",
    },
  ];

  return (
    <section id="services" className="py-28 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 mb-6">
            <span className="text-sm font-condensed font-medium tracking-wider uppercase text-primary">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Enterprise Solutions for{" "}
            <span className="gradient-text">Modern Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered solutions designed to automate, optimize, and scale your business operations.
          </p>
        </div>

        {/* Service Cards - 3 columns */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`glass-card-hover p-8 relative ${service.featured ? "featured-border" : ""} ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 2) * 200}` : "opacity-0"
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-condensed font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}>
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <ArrowUp className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
