import { ArrowRight, PlayCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
            {/* Parallax Background Elements */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10"
                style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.3}px))` }}
            />
            <div 
                className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] -z-10"
                style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)` }}
            />
            <div 
                className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-emerald-500/5 rounded-full blur-[60px] -z-10"
                style={{ transform: `translate(-${scrollY * 0.15}px, -${scrollY * 0.1}px)` }}
            />

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
                    <a href="#contact" onClick={scrollToContact} className="shiny-cta group">
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

            {/* Tech Stack - Infinite Scroll */}
            <div className="py-12 mt-20 border-y border-white/5 bg-black/40 overflow-hidden">
                <div className="max-w-[100vw] mx-auto px-0">
                    <p className="text-[10px] font-semibold tracking-widest text-neutral-600 uppercase mb-8 text-center px-6">Powering Automation Infrastructure With</p>

                    <div className="relative flex overflow-x-hidden group">
                        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8 min-w-full">
                            {/* Original Set */}
                            <span className="text-xl font-medium text-neutral-400">n8n</span>
                            <span className="text-xl font-medium text-neutral-400">OpenAI</span>
                            <span className="text-xl font-medium text-neutral-400">Twilio</span>
                            <span className="flex items-center gap-2 text-xl font-medium text-neutral-400"><Phone className="w-5 h-5" /> Vapi</span>
                            <span className="text-xl font-medium text-neutral-400">Airtable</span>
                            <span className="text-xl font-medium text-neutral-400">Google</span>

                            {/* Duplicate Set for Seamless Loop */}
                            <span className="text-xl font-medium text-neutral-400">n8n</span>
                            <span className="text-xl font-medium text-neutral-400">OpenAI</span>
                            <span className="text-xl font-medium text-neutral-400">Twilio</span>
                            <span className="flex items-center gap-2 text-xl font-medium text-neutral-400"><Phone className="w-5 h-5" /> Vapi</span>
                            <span className="text-xl font-medium text-neutral-400">Airtable</span>
                            <span className="text-xl font-medium text-neutral-400">Google</span>

                            {/* Triplicate Set for Large Screens */}
                            <span className="text-xl font-medium text-neutral-400">n8n</span>
                            <span className="text-xl font-medium text-neutral-400">OpenAI</span>
                            <span className="text-xl font-medium text-neutral-400">Twilio</span>
                            <span className="flex items-center gap-2 text-xl font-medium text-neutral-400"><Phone className="w-5 h-5" /> Vapi</span>
                            <span className="text-xl font-medium text-neutral-400">Airtable</span>
                            <span className="text-xl font-medium text-neutral-400">Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
