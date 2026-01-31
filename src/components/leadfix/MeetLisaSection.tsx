import { Calendar, Users, MessageSquare, Globe, CalendarClock, Cog, Phone } from "lucide-react";

const features = [
  { icon: Calendar, title: "Books Appointments", description: "Schedules directly into your calendar" },
  { icon: Users, title: "Lead Generation", description: "Qualifies and nurtures prospects" },
  { icon: MessageSquare, title: "SMS & Email", description: "Automated confirmations and follow-ups" },
  { icon: Globe, title: "Multilingual", description: "Speaks 40+ languages fluently" },
  { icon: CalendarClock, title: "Calendar Integration", description: "Real-time availability checking" },
  { icon: Cog, title: "Programmable", description: "Customized to your business" },
];

const MeetLisaSection = () => {
  return (
    <section id="meet-lisa" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 reveal">
            Meet Lisa
          </h2>
          <p className="text-neutral-400 reveal delay-1">
            Your Intelligent AI Digital Employee
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`reveal ${index > 0 ? `delay-${Math.min(index, 3)}` : ''} group p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-[#F95500]/30 transition-all duration-300`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F95500]/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-[#F95500]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                  <p className="text-neutral-500 text-xs mt-1">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lisa Avatar */}
        <div className="flex flex-col items-center reveal">
          <div className="relative">
            {/* Avatar Circle */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#F95500]/20 to-[#F95500]/5 border-2 border-[#F95500]/30 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                <Phone className="w-10 h-10 text-[#F95500]" />
              </div>
            </div>

            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#F95500]/20 animate-ping" />
          </div>

          <p className="mt-4 text-white font-medium">Talk to Lisa</p>
          <span className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Ready to talk
          </span>
        </div>
      </div>
    </section>
  );
};

export default MeetLisaSection;
