import { Mic, MessageSquare, Workflow, Check, ArrowUpRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ServicesSection = () => {
    const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver(0.2);
    const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver(0.1);

    return (
        <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
            <div 
                ref={headerRef as React.RefObject<HTMLDivElement>}
                className={`mb-16 md:flex md:items-end md:justify-between transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <div>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Core Automation Services</h2>
                    <p className="text-neutral-400 max-w-xl text-sm leading-relaxed">I don't just "wrap API calls". I architect robust, error-tolerant infrastructure that handles real-world business communication.</p>
                </div>
                <a href="#contact" className="hidden md:inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors mt-4 md:mt-0">
                    Get a quote <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
            </div>

            <div 
                ref={cardsRef as React.RefObject<HTMLDivElement>}
                className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-150 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {/* Service 1 */}
                <div className="glass-card p-8 group">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Mic className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium mb-3 text-white">AI Voice Agents</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        Human-like inbound and outbound calling agents. They qualify leads, book appointments on Cal.com, and handle support 24/7 without fatigue.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs text-neutral-500">
                            <Check className="w-3 h-3 text-blue-500/60" /> Sub-800ms Latency
                        </li>
                        <li className="flex items-center gap-3 text-xs text-neutral-500">
                            <Check className="w-3 h-3 text-blue-500/60" /> Custom Knowledge Base
                        </li>
                    </ul>
                </div>

                {/* Service 2 */}
                <div className="glass-card p-8 group">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium mb-3 text-white">WhatsApp & SMS Bots</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        Direct integration with WhatsApp Business API. Auto-reply to leads instantly, nurture prospects through sequences, and sync all chats to CRM.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs text-neutral-500">
                            <Check className="w-3 h-3 text-emerald-500/60" /> Instant Lead Response
                        </li>
                        <li className="flex items-center gap-3 text-xs text-neutral-500">
                            <Check className="w-3 h-3 text-emerald-500/60" /> Multi-step Flows
                        </li>
                    </ul>
                </div>

                {/* Service 3 */}
                <div className="glass-card p-8 group">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Workflow className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium mb-3 text-white">CRM & n8n Workflows</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        The central nervous system of your business. I build complex n8n workflows that connect forms, spreadsheets, and agents into one seamless loop.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs text-neutral-500">
                            <Check className="w-3 h-3 text-purple-500/60" /> Error-free Data Entry
                        </li>
                        <li className="flex items-center gap-3 text-xs text-neutral-500">
                            <Check className="w-3 h-3 text-purple-500/60" /> Automated Reporting
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
