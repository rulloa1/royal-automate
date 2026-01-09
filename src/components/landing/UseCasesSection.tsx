import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const UseCasesSection = () => {
    const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver(0.3);
    const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver(0.1);

    return (
        <section id="use-cases" className="py-24 px-6 max-w-7xl mx-auto">
            <h2 
                ref={titleRef as React.RefObject<HTMLHeadingElement>}
                className={`text-3xl md:text-4xl font-medium tracking-tight text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                Deployed Solutions
            </h2>

            <div 
                ref={cardsRef as React.RefObject<HTMLDivElement>}
                className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-150 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {/* Case 1 */}
                <div className="glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-blue-500/20 transition-all">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-semibold tracking-wide text-neutral-300">REAL ESTATE</span>
                        </div>
                        <h3 className="text-xl font-medium mb-3">Speed-to-Lead Caller</h3>
                        <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                            <strong className="text-neutral-200">Problem:</strong> Leads go cold if not called within 5 minutes. Agents are busy or asleep.<br />
                            <strong className="text-neutral-200">Solution:</strong> An AI agent triggers immediately upon form submission, qualifies the buyer against criteria, and syncs to calendar.
                        </p>
                    </div>
                    {/* Mock UI */}
                    <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 font-mono text-xs space-y-3">
                        <div className="flex gap-3">
                            <div className="w-1 h-full bg-blue-500 rounded-full"></div>
                            <div className="text-neutral-500">AI AGENT</div>
                        </div>
                        <p className="text-neutral-300 pl-4">"Hi, I saw you were interested in the downtown property. Are you looking to move in the next 30 days?"</p>
                    </div>
                </div>

                {/* Case 2 */}
                <div className="glass-card p-8 rounded-2xl flex flex-col justify-between hover:border-emerald-500/20 transition-all">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-semibold tracking-wide text-neutral-300">E-COMMERCE</span>
                        </div>
                        <h3 className="text-xl font-medium mb-3">Order Recovery Bot</h3>
                        <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                            <strong className="text-neutral-200">Problem:</strong> High cart abandonment rate and support tickets for order status.<br />
                            <strong className="text-neutral-200">Solution:</strong> A dual WhatsApp/Voice bot that answers "Where is my order?" queries and offers timed discounts for abandoned carts.
                        </p>
                    </div>
                    {/* Mock UI */}
                    <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 font-mono text-xs space-y-3">
                        <div className="flex gap-3">
                            <div className="w-1 h-full bg-emerald-500 rounded-full"></div>
                            <div className="text-neutral-500">AI AGENT</div>
                        </div>
                        <p className="text-neutral-300 pl-4">"Your package #492 is out for delivery today. Would you like to add specific delivery instructions?"</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection;
