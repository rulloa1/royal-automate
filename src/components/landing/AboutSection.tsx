import { Github, Linkedin, Twitter } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useParallax } from "@/hooks/useParallax";

const AboutSection = () => {
    const { ref: imageRef, isVisible: imageVisible } = useIntersectionObserver(0.3);
    const { ref: textRef, isVisible: textVisible } = useIntersectionObserver(0.2);
    const parallaxOffset = useParallax(0.08);

    return (
        <section id="about" className="py-24 border-t border-white/5 relative overflow-hidden">
            {/* Parallax accent */}
            <div 
                className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] -z-10"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
            />
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div 
                        ref={imageRef as React.RefObject<HTMLDivElement>}
                        className={`w-full md:w-1/3 transition-all duration-700 ${imageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    >
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 bg-neutral-900">
                            {/* Placeholder image tailored for dark theme */}
                            <img src="/rory-ulloa.jpg" alt="Rory Ulloa" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    <div 
                        ref={textRef as React.RefObject<HTMLDivElement>}
                        className={`w-full md:w-2/3 space-y-6 transition-all duration-700 delay-150 ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                        <h2 className="text-3xl font-medium tracking-tight">I'm Rory Ulloa.</h2>
                        <h3 className="text-lg text-neutral-400 font-medium">I build systems, not demos.</h3>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            The AI space is noisy. Everyone is selling a course or showing off a flashy demo that breaks in production. I operate differently.
                        </p>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            I am a developer focused on <span className="text-white font-medium">reliability</span> and <span className="text-white font-medium">ROI</span>. My background in software engineering means I build automation infrastructures that scale with your business, handle errors gracefully, and actually deliver the time-savings promised.
                        </p>
                        <div className="pt-4 flex gap-5">
                            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
