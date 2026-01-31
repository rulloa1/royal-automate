import { Check, X, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$297",
    period: "/mo",
    setup: "$1,500 setup fee",
    tagline: "Basic setup to get started",
    featured: false,
    includes: [
      { text: "Lisa answers calls 24/7 (worth $597 alone)", included: true },
      { text: "200 minutes included ($1.50/min after)", included: true },
      { text: "Calendar booking", included: true },
      { text: "Email call summaries", included: true },
      { text: "Basic setup", included: true },
    ],
    excludes: [
      { text: "Jack costs $199/mo extra", included: false },
      { text: "NO text-back (email only)", included: false },
      { text: "NO knowledge base training", included: false },
      { text: "You handle some setup", included: false },
    ],
  },
  {
    name: "Professional",
    price: "$497",
    period: "/mo",
    setup: "$1,500 setup fee",
    tagline: "The no-brainer choice",
    featured: true,
    badge: "Most Popular",
    highlight: "Only $200 more, get $500+ in extra value",
    includes: [
      { text: "Everything in Starter", included: true },
      { text: "500 minutes (2.5x more!)", included: true },
      { text: "Jack FREE ($199 value)", included: true },
      { text: "Text-back (instant SMS)", included: true },
      { text: "SMS appointment reminders", included: true },
      { text: "Knowledge base training", included: true },
      { text: "Free demo after call", included: true },
      { text: "Fully managed setup", included: true },
      { text: "Priority support", included: true },
    ],
    excludes: [],
  },
  {
    name: "Premium",
    price: "$1997",
    period: "/mo",
    setup: "$1,500 setup fee",
    tagline: "For serious operations",
    featured: false,
    includes: [
      { text: "Everything in Professional", included: true },
      { text: "UNLIMITED MINUTES (no overage charges)", included: true },
      { text: "Multiple locations/phone numbers", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom CRM integrations", included: true },
      { text: "Advanced analytics dashboard", included: true },
      { text: "VIP support", included: true },
      { text: "Priority feature requests", included: true },
    ],
    excludes: [],
  },
];

const LeadFixPricing = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 reveal">
            Pricing Plans
          </h2>
          <p className="text-neutral-400 reveal delay-1">
            Choose the plan that fits your business. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`reveal ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''} relative flex flex-col h-full p-8 rounded-2xl border transition-all duration-300 ${
                plan.featured
                  ? "bg-gradient-to-b from-[#F95500]/10 to-transparent border-[#F95500]/30"
                  : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-[#F95500] text-white text-xs font-medium rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-neutral-400">{plan.period}</span>
                </div>
                <p className="text-neutral-500 text-sm mt-2">{plan.setup}</p>
                <p className="text-neutral-400 text-sm mt-1">{plan.tagline}</p>
              </div>

              {/* Highlight */}
              {plan.highlight && (
                <div className="mb-6 p-3 rounded-lg bg-[#F95500]/10 border border-[#F95500]/20">
                  <p className="text-[#F95500] text-sm font-medium">{plan.highlight}</p>
                </div>
              )}

              {/* Features */}
              <div className="flex-grow space-y-3 mb-8">
                {plan.includes.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#F95500] flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300 text-sm">{feature.text}</span>
                  </div>
                ))}
                {plan.excludes.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-500 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group ${
                  plan.featured
                    ? "bg-[#F95500] text-white hover:bg-[#FF6B1A]"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                Get Started
                {plan.featured && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadFixPricing;
