import { Mic, Phone, Clock, Globe, Zap, Users } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Suspense, lazy } from "react";

const VoiceAgent = lazy(() => import("@/components/VoiceAgent"));

const VoiceBotSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver(0.2);
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver(0.1);

  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a call. Your AI agent handles inquiries around the clock.",
    },
    {
      icon: Zap,
      title: "Sub-800ms Latency",
      description: "Natural conversations with lightning-fast response times.",
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Speak to customers in 29+ languages seamlessly.",
    },
    {
      icon: Users,
      title: "Lead Qualification",
      description: "Automatically qualify leads and book appointments.",
    },
  ];

  return (
    <section id="voice-bot" className="py-24 px-6 max-w-7xl mx-auto">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`text-center mb-16 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
          <Mic className="w-4 h-4" />
          <span>AI Voice Technology</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
          Voice Agents for Your Business
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Human-like AI voice agents that handle inbound calls, qualify leads, book appointments,
          and provide customer support—without the overhead of a call center.
        </p>
      </div>

      <div
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-150 ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Features grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-medium mb-2 text-white">{feature.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Voice agent demo */}
        <div className="glass-card p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium mb-2 text-white">Try Our Voice Agent</h3>
            <p className="text-sm text-neutral-400">
              Experience a live demo of our AI voice technology
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm text-neutral-500">Loading voice agent...</p>
              </div>
            }
          >
            <VoiceAgent />
          </Suspense>

          <p className="text-xs text-neutral-600 text-center mt-8">
            Powered by ElevenLabs Conversational AI
          </p>
        </div>
      </div>

      {/* Use cases */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Inbound Sales",
            description: "Qualify leads instantly and book demos automatically.",
          },
          {
            title: "Customer Support",
            description: "Handle FAQs and troubleshooting 24/7 without wait times.",
          },
          {
            title: "Appointment Booking",
            description: "Integrate with Cal.com to schedule meetings on the fly.",
          },
        ].map((useCase) => (
          <div key={useCase.title} className="glass-card p-6 text-center">
            <h4 className="text-sm font-medium text-white mb-2">{useCase.title}</h4>
            <p className="text-xs text-neutral-500">{useCase.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoiceBotSection;
