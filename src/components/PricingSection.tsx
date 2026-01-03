import { Check, ArrowRight } from "lucide-react";
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
    <section id="pricing" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Pricing</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Investment in Your Growth
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Simple, transparent pricing with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Foundation Package */}
          <div
            className={`glass-card p-8 flex flex-col ${
              isVisible ? "animate-slide-in-left animation-delay-200" : "opacity-0"
            }`}
          >
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Foundation Package</h3>
              <p className="text-sm text-muted-foreground">Your digital presence, perfected</p>
            </div>
            
            <div className="mb-8">
              <span className="text-4xl md:text-5xl font-medium">$2,500</span>
              <span className="text-muted-foreground ml-2 text-sm">one-time</span>
            </div>

            <ul className="space-y-3 mb-10 flex-grow">
              {foundationFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              packageType="foundation"
              className="w-full gradient-button-secondary py-4 text-center text-sm"
            >
              Get Started
            </CheckoutButton>
          </div>

          {/* Growth Engine Package */}
          <div
            className={`glass-card p-8 flex flex-col relative border-foreground/20 ${
              isVisible ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-6">
              <span className="bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                Best Value
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Growth Engine</h3>
              <p className="text-sm text-muted-foreground">Complete automation & lead generation</p>
            </div>
            
            <div className="mb-2">
              <span className="text-4xl md:text-5xl font-medium">$997</span>
              <span className="text-muted-foreground ml-2 text-sm">/month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-8">
              + $2,500 setup fee (includes Foundation Package)
            </p>

            <ul className="space-y-3 mb-10 flex-grow">
              {growthFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton
              packageType="growth"
              className="w-full gradient-button py-4 text-center text-sm group inline-flex items-center justify-center gap-2"
            >
              <span>Start Your Transformation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </CheckoutButton>
          </div>
        </div>

        {/* Guarantee */}
        <p className={`text-center text-muted-foreground text-sm mt-12 ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          30-day satisfaction guarantee. Cancel anytime with 30 days notice.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;