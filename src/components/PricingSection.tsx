import { ArrowUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import CheckoutButton from "./CheckoutButton";

const PricingSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const foundationFeatures = [
    "Premium Website Design",
    "Fully Responsive",
    "SEO Setup",
    "SSL Certificate",
    "Contact Forms",
    "Analytics Integration",
    "30 Days Support",
  ];

  const growthFeatures = [
    "Everything in Foundation",
    "AI Lead Generation",
    "Automated Campaigns",
    "CRM Integration",
    "AI Chatbot",
    "Advanced Analytics",
    "Social Media Automation",
    "Priority Support",
    "Monthly Consultation",
  ];

  return (
    <section id="pricing" className="py-28 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 mb-6">
            <span className="text-sm font-condensed font-medium tracking-wider uppercase text-accent">Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Investment in Your{" "}
            <span className="gradient-text-gold">Growth</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing with no hidden fees. Choose the plan that fits your business needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Foundation Package */}
          <div
            className={`glass-card p-8 lg:p-10 flex flex-col ${
              isVisible ? "animate-slide-in-left animation-delay-200" : "opacity-0"
            }`}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold mb-2">Foundation Package</h3>
              <p className="text-muted-foreground">Your digital presence, perfected</p>
            </div>
            
            <div className="mb-8">
              <span className="text-5xl lg:text-6xl font-display font-bold text-foreground">$2,500</span>
              <span className="text-muted-foreground ml-2 font-condensed tracking-wider uppercase text-sm">one-time</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {foundationFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <ArrowUp className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              packageType="foundation"
              className="w-full glass-card-hover py-4 font-semibold text-foreground text-center text-lg"
            >
              Get Started
            </CheckoutButton>
          </div>

          {/* Growth Engine Package */}
          <div
            className={`glass-card p-8 lg:p-10 featured-border flex flex-col relative ${
              isVisible ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-accent text-accent-foreground text-xs font-condensed font-semibold tracking-wider uppercase px-5 py-1.5 rounded-full">
                Best Value
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold mb-2">Growth Engine</h3>
              <p className="text-muted-foreground">Complete automation & lead generation</p>
            </div>
            
            <div className="mb-2">
              <span className="text-5xl lg:text-6xl font-display font-bold text-primary">$997</span>
              <span className="text-muted-foreground ml-2 font-condensed tracking-wider uppercase text-sm">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              + $2,500 setup fee <span className="text-primary font-medium">(includes Foundation Package)</span>
            </p>

            <ul className="space-y-4 mb-10 flex-grow">
              {growthFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <ArrowUp className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              packageType="growth"
              className="w-full gradient-button py-4 text-center text-lg"
            >
              Start Your Transformation
            </CheckoutButton>
          </div>
        </div>

        {/* Guarantee */}
        <p className={`text-center text-muted-foreground mt-16 ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          <span className="text-primary font-medium">30-day satisfaction guarantee.</span> Cancel anytime with 30 days notice.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
