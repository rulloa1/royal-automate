import { Workflow, Cpu, Zap, ChevronRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ServicesSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const services = [
    {
      icon: Workflow,
      title: "Content System Architecture",
      description: "We design the end-to-end AI architecture that converts raw content into structured, repeatable, and scalable media workflows.",
      features: [
        "Source ingestion & processing",
        "Multi-format output generation",
        "Brand consistency at scale",
      ],
    },
    {
      icon: Cpu,
      title: "AI Repurposing Engine",
      description: "A modular AI system that creates short-form videos, carousels, posts, and captions automatically.",
      features: [
        "Audio waveform analysis",
        "Automated shorts generation",
        "Cross-platform optimization",
      ],
    },
    {
      icon: Zap,
      title: "Distribution & Publishing",
      description: "Automated scheduling and multi-platform publishing that ensures your content reaches the right audience at peak times.",
      features: [
        "Auto-publish queue",
        "Peak time optimization",
        "12M+ viewer reach",
      ],
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that boost your online presence and maximize ROI across all channels.",
      features: [
        "SEO & SEM",
        "Social Media Management",
        "Content Marketing",
        "PPC Advertising",
      ],
      gradient: "from-gold-dark to-primary",
    },
  ];

  return (
    <section id="services" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Our Expertise</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
            We engineer AI-driven systems that automate execution, reduce dependency on people, and scale operations with precision.
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`glass-card-hover p-8 group ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 2) * 200}` : "opacity-0"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                <service.icon className="w-6 h-6 text-foreground" />
              </div>
              
              <h3 className="text-xl font-medium mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm">
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
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