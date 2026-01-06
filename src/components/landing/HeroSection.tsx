import { ArrowRight, PlayCircle, Phone } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-4xl mx-auto text-center space-y-8">
                {/* Status Badge */}
                <div className="fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-[11px] font-medium tracking-wide uppercase">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                    </span>
                    Accepting New Clients for Q4
                </div>

                {/* Headline */}
                <h1 className="fade-in-up delay-100 text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
                    I Build AI Systems That <br className="hidden md:block" />
                    <span className="text-neutral-500">Call, Chat, and Convert.</span>
                </h1>

                {/* Subheadline */}
                <p className="fade-in-up delay-200 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
                    Stop losing leads to slow response times. I architect custom voice agents and n8n workflows that replace manual follow-ups instantly.
                </p>

                {/* CTAs */}
                <div className="fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <a href="https://cal.com/rory-ulloa" className="shiny-cta group">
                        <span className="flex items-center gap-2">
                            Book Free Strategy Call
                            <ArrowRight className="group-hover:translate-x-0.5 transition-transform w-4 h-4" />
                        </span>
                    </a>

                    <a href="#use-cases" className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
                        <PlayCircle className="w-4 h-4" />
                        View Live Demos
                    </a>
                </div>

                {/* Metrics */}
                <div className="fade-in-up delay-300 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 mt-16 max-w-3xl mx-auto">
                    <div>
                        <p className="text-2xl font-semibold text-white tracking-tight">100k+</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1 font-medium">AI Calls Processed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-white tracking-tight">24/7</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1 font-medium">Active Availability</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-white tracking-tight">30%</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1 font-medium">Avg. Conv. Lift</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-white tracking-tight">40+</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1 font-medium">Deployments</p>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="py-12 mt-20 border-y border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-semibold tracking-widest text-neutral-600 uppercase mb-8">Powering Automation Infrastructure With</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Note: In a real project, we might want to use specific SVGs or the simple-icons package. 
                            For now, I'll valid Lucide icons or text where possible or placeholders as per react-icons or lucide limitations */}
                        <div className="flex items-center gap-2 text-sm font-medium text-white">n8n</div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white">OpenAI</div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white">Twilio</div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white"><Phone className="w-5 h-5" /> Vapi</div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white">Airtable</div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white">Google</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
