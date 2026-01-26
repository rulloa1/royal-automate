import { Mic, MessageSquare, Workflow, Check, ArrowUpRight, Globe, Palette } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Link } from "react-router-dom";

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
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Core Services</h2>
                    <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">From stunning websites to intelligent automation—everything you need to grow your business.</p>
                </div>
                <a href="#contact" className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 md:mt-0">
                    Get a quote <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
            </div>

            <div 
                ref={cardsRef as React.RefObject<HTMLDivElement>}
                className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-150 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {/* Web Design Service - NEW */}
                <Link to="/services/web-design" className="block h-full">
                    <div className="glass-card p-8 group h-full transition-colors hover:bg-white/5 relative overflow-hidden">
                        <div className="absolute top-3 right-3">
                            <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                Popular
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Palette className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-medium mb-3 text-foreground">Web Design</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            High-converting, mobile-first websites that capture leads and establish your brand authority.
                        </p>
                        <p className="text-lg font-medium text-foreground mb-4">From $1,500</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-amber-500/60" /> Custom Design
                            </li>
                            <li className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-amber-500/60" /> SEO Optimized
                            </li>
                            <li className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-amber-500/60" /> 7-Day Delivery
                            </li>
                        </ul>
                    </div>
                </Link>

                {/* AI Voice Agents */}
                <div className="glass-card p-8 group">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Mic className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium mb-3 text-foreground">AI Voice Agents</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        Human-like inbound and outbound calling agents. They qualify leads, book appointments, and handle support 24/7.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-blue-500/60" /> Sub-800ms Latency
                        </li>
                        <li className="flex items-center gap-3 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-blue-500/60" /> Custom Knowledge Base
                        </li>
                    </ul>
                </div>

                {/* WhatsApp & SMS Bots */}
                <Link to="/services/chatbot-development" className="block h-full">
                    <div className="glass-card p-8 group h-full transition-colors hover:bg-white/5">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-medium mb-3 text-foreground">WhatsApp & SMS Bots</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Direct integration with WhatsApp Business API. Auto-reply to leads instantly and nurture prospects.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-emerald-500/60" /> Instant Lead Response
                            </li>
                            <li className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-emerald-500/60" /> Multi-step Flows
                            </li>
                        </ul>
                    </div>
                </Link>

                {/* CRM & n8n Workflows */}
                <Link to="/services/automations" className="block h-full">
                    <div className="glass-card p-8 group h-full transition-colors hover:bg-white/5">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Workflow className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-medium mb-3 text-foreground">CRM & n8n Workflows</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            The central nervous system of your business. Complex workflows that connect everything seamlessly.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-purple-500/60" /> Error-free Data Entry
                            </li>
                            <li className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-purple-500/60" /> Automated Reporting
                            </li>
                        </ul>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default ServicesSection;
