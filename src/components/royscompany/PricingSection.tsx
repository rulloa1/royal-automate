import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tiers = [
    {
      name: "PROTOCOL ALPHA",
      price: "$199",
      period: "/MO",
      description:
        "Ongoing maintenance and support for existing automation flows.",
      features: [
        "System Monitoring",
        "Error Resolution",
        "Monthly Optimization",
        "Email Support",
      ],
      cta: "INITIALIZE",
      popular: false,
    },
    {
      name: "SYSTEM BETA",
      price: "CUSTOM",
      period: "",
      description:
        "Tailored automation builds for specific business units and workflows.",
      features: [
        "Custom Architecture",
        "Make.com & n8n Build",
        "CRM Integration",
        "Priority Support",
      ],
      cta: "INQUIRE",
      popular: true,
    },
    {
      name: "SINGULARITY",
      price: "$35K+",
      period: "",
      description:
        "Full-scale enterprise digital transformation and AI ecosystem implementation.",
      features: [
        "Enterprise Ecosystem",
        "Custom AI Models",
        "Full Staff Training",
        "24/7 Dedicated Ops",
      ],
      cta: "CONTACT SALES",
      popular: false,
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-4">
            // ACCESS_LEVELS
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            <span className="text-foreground">SYSTEM </span>
            <span className="text-primary">ACCESS</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            // SELECT YOUR INTEGRATION LEVEL
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`relative p-6 border ${
                tier.popular
                  ? "border-primary bg-primary/5"
                  : "border-muted/50 bg-card/50"
              } backdrop-blur-sm`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-mono">
                  MOST DEPLOYED
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="font-display text-xl text-foreground mb-4">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display text-primary">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground font-mono text-sm">
                    {tier.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3 font-mono text-sm transition-all ${
                  tier.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(249,85,0,0.3)]"
                    : "border border-muted-foreground/30 text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground font-mono text-xs mt-8"
        >
          // All tiers include comprehensive documentation and onboarding
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
