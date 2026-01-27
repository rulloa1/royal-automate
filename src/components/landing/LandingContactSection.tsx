import LeadForm from "@/components/LeadForm";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useParallax } from "@/hooks/useParallax";

const LandingContactSection = () => {
    const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver(0.2);
    const parallaxOffset = useParallax(0.15);

    return (
        <section id="contact" className="py-32 px-6 text-center relative overflow-hidden">
            {/* Parallax Radial Gradient Background */}
            <div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
            />
            {/* Floating orbs with parallax */}
            <div 
                className="absolute top-20 left-1/4 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] -z-10"
                style={{ transform: `translateY(${parallaxOffset * 2}px)` }}
            />
            <div 
                className="absolute bottom-20 right-1/4 w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-[60px] -z-10"
                style={{ transform: `translateY(-${parallaxOffset * 1.5}px)` }}
            />

            <div 
                ref={contentRef as React.RefObject<HTMLDivElement>}
                className={`max-w-4xl mx-auto space-y-8 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-12">
                    Ready to automate the busy work?
                </h2>

                {/* Lead Form Component */}
                <LeadForm />

                <p className="text-neutral-500 text-sm font-light mt-12">
                    Prefer email? You can also reach us directly at <a href="mailto:contact@royscompany.com" className="text-blue-400 hover:underline">contact@royscompany.com</a>
                </p>
            </div>
        </section>
    );
};

export default LandingContactSection;
