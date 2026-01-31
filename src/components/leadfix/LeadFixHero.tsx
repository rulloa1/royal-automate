import { ArrowRight, Play, Phone } from "lucide-react";

const LeadFixHero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F95500]/10 border border-[#F95500]/20 text-[#F95500] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#F95500] animate-pulse" />
              V2.0 Available
            </span>
          </div>

          <div className="reveal delay-1">
            <p className="text-neutral-400 text-sm uppercase tracking-widest mb-2">
              Driven by Science. Built for Contractors.
            </p>
          </div>

          <div className="reveal delay-2 space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
              <span className="text-neutral-400">Never miss another</span>
              <br />
              <span className="text-white">$1,200 call again.</span>
            </h1>
          </div>

          <div className="reveal delay-3 space-y-4">
            <p className="text-lg text-[#F95500] font-medium">
              Stop losing revenue to voicemail.
            </p>
            <p className="text-neutral-400 leading-relaxed max-w-lg">
              85% of callers won't leave one—they call your competitor instead. Our custom AI employees capture every lead, qualify prospects, and book jobs directly onto your calendar. Perfect for Roofers, HVAC & Plumbers.
            </p>
          </div>

          <div className="reveal delay-3 flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-colors group"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-neutral-400 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#F95500]/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-[#F95500] fill-[#F95500]" />
              </div>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Column - Phone Mockup */}
        <div className="reveal hidden lg:flex justify-center items-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-[280px] bg-[#0A0A0A] rounded-[40px] p-2 border border-neutral-800 shadow-2xl">
              {/* Phone Screen */}
              <div className="bg-[#111111] rounded-[32px] overflow-hidden">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-6 py-3 text-white text-xs">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-white rounded-sm">
                      <div className="w-2/3 h-full bg-white rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Call Interface */}
                <div className="px-6 py-8 text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#F95500]/30 to-[#F95500]/10 flex items-center justify-center mb-4 border border-[#F95500]/30">
                    <Phone className="w-8 h-8 text-[#F95500]" />
                  </div>

                  <h3 className="text-white font-semibold text-lg">Lead Fix Agent</h3>
                  <p className="text-neutral-500 text-sm mt-1">Ready to demo</p>

                  {/* Call Action */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-neutral-400 text-sm">
                    <Phone className="w-4 h-4" />
                    Click to experience Live Demo
                  </div>

                  {/* Audio Wave Animation */}
                  <div className="flex items-center justify-center gap-1 mt-6 h-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-1 bg-[#F95500] rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 8}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Call Controls */}
                  <div className="flex justify-center gap-8 mt-8">
                    <button className="flex flex-col items-center gap-1 text-neutral-500">
                      <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-xs">Mute</span>
                      </div>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-neutral-500">
                      <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-xs">Speaker</span>
                      </div>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white rotate-[135deg]" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="flex justify-center py-4">
                  <div className="w-32 h-1 bg-neutral-700 rounded-full" />
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-[#F95500] to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadFixHero;
