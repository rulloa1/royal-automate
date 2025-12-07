import { Check } from "lucide-react";
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
    <section id="pricing" className="py-24 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <span className="text-sm font-medium text-accent">Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Investment in Your{" "}
            <span className="gradient-text-gold">Growth</span>
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Foundation Package */}
          <div
            className={`glass-card p-8 flex flex-col ${
              isVisible ? "animate-slide-in-left animation-delay-200" : "opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">Foundation Package</h3>
            <p className="text-muted-foreground mb-6">Your digital presence, perfected</p>
            
            <div className="mb-8">
              <span className="text-5xl font-bold">$2,500</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {foundationFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              packageType="foundation"
              className="w-full glass-card-hover py-4 font-semibold text-foreground text-center"
            >
              Get Started
            </CheckoutButton>
          </div>

          {/* Growth Engine Package */}
          <div
            className={`glass-card p-8 featured-border flex flex-col relative ${
              isVisible ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-accent to-copper-light text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                Best Value
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2">Growth Engine</h3>
            <p className="text-muted-foreground mb-6">Complete automation & lead generation</p>
            
            <div className="mb-2">
              <span className="text-5xl font-bold">$997</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              + $2,500 setup fee <span className="text-primary">(includes Foundation Package)</span>
            </p>

            <ul className="space-y-4 mb-8 flex-grow">
              {growthFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              packageType="growth"
              className="w-full gradient-button py-4 text-center"
            >
              Start Your Transition
            </CheckoutButton>
          </div>
        </div>

        {/* Guarantee */}
        <p className={`text-center text-muted-foreground mt-12 ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          30-day satisfaction guarantee. Cancel anytime with 30 days notice.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
