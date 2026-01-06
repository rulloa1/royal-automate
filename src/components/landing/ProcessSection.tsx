const ProcessSection = () => {
    return (
        <section id="process" className="py-24 border-y border-white/5 bg-neutral-900/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left Sticky */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Engineering, <br /> <span className="text-neutral-500">Not Magic.</span></h2>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                                A transparent, logic-first approach to building your system. I don't rely on black boxes; I build auditable, scalable code.
                            </p>
                            <button className="px-5 py-2 rounded-lg bg-neutral-100 text-neutral-900 text-sm font-medium hover:bg-white transition-colors" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                Start the Process
                            </button>
                        </div>
                    </div>

                    {/* Right Steps */}
                    <div className="lg:w-2/3 space-y-12">
                        {/* Step 1 */}
                        <div className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all">1</div>
                                <div className="w-px h-full bg-white/5 my-2 group-hover:bg-blue-500/20 transition-colors"></div>
                            </div>
                            <div className="pb-10">
                                <h3 className="text-lg font-medium text-white mb-2">Audit & Logic Design</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">We map out your manual processes. I design the conversation state machine and database schema before writing a single line of code.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 text-neutral-400 flex items-center justify-center text-xs font-semibold group-hover:border-neutral-600 group-hover:text-white transition-all">2</div>
                                <div className="w-px h-full bg-white/5 my-2"></div>
                            </div>
                            <div className="pb-10">
                                <h3 className="text-lg font-medium text-white mb-2">Build & Integration</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">Connecting Vapi/Twilio with your CRM via n8n. Configuring the LLM system prompts to strictly adhere to your brand voice and sales objectives.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 text-neutral-400 flex items-center justify-center text-xs font-semibold group-hover:border-neutral-600 group-hover:text-white transition-all">3</div>
                                <div className="w-px h-full bg-white/5 my-2"></div>
                            </div>
                            <div className="pb-10">
                                <h3 className="text-lg font-medium text-white mb-2">Testing with Real Data</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">Rigorous adversarial testing. We ensure the AI handles objections, heavy accents, and edge cases gracefully. Latency optimization happens here.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 text-neutral-400 flex items-center justify-center text-xs font-semibold group-hover:border-neutral-600 group-hover:text-white transition-all">4</div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Deployment & Handoff</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">The system goes live. You receive a custom dashboard to monitor calls/leads and documentation so you own your infrastructure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
