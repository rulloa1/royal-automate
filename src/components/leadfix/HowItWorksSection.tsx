import { Phone, Filter, Calendar } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "24/7 Answering",
    description: "Never let a call go to voicemail. Our AI answers instantly, day or night, capturing emergency jobs for Plumbers & HVAC.",
  },
  {
    number: "02",
    icon: Filter,
    title: "Smart Qualification",
    description: "Filter out tire-kickers. The AI asks specific questions about roof age, leak locations, or system types before booking.",
  },
  {
    number: "03",
    icon: Calendar,
    title: "Instant Scheduling",
    description: "Integrates with ServiceTitan, Housecall Pro, and GCal to book estimates directly into your team's available slots.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#0A0A0A] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 reveal">
            How it Works
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto reveal delay-1">
            Automated intake, qualification, and scheduling specifically engineered for trade businesses.
          </p>
          <div className="mt-6 reveal delay-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#F95500]" />
              Powered by Lead Fix Engine
            </span>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`reveal ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`}
            >
              <div className="group h-full p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-[#F95500]/30 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#F95500]/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-[#F95500]" />
                  </div>
                  <span className="text-4xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors font-display">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Accent Line */}
                <div className="mt-6 pt-6 border-t border-neutral-800">
                  <div className="w-12 h-1 bg-[#F95500]/20 rounded group-hover:bg-[#F95500]/40 group-hover:w-20 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
