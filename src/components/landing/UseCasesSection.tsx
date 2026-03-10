import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useParallax } from "@/hooks/useParallax";
import { MessageCircle, Star } from "lucide-react";

const testimonials = [
    {
        quote: "Best dispensary in town. The flower is always fresh and the staff really knows their stuff.",
        author: "Regular Customer",
        rating: 5,
    },
    {
        quote: "Flava Depot has the best prices for premium quality. I won't go anywhere else.",
        author: "Loyal Customer",
        rating: 5,
    },
];

const UseCasesSection = () => {
    const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver(0.3);
    const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver(0.1);
    const parallaxOffset = useParallax(0.1);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] -z-10"
                style={{ 
                    background: 'hsla(45, 70%, 50%, 0.05)',
                    transform: `translate(-50%, calc(-50% + ${parallaxOffset}px))` 
                }}
            />

            <h2
                ref={titleRef as React.RefObject<HTMLHeadingElement>}
                className={`text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                What Our Customers Say
            </h2>

            <div 
                ref={cardsRef as React.RefObject<HTMLDivElement>}
                className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-150 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {testimonials.map((t, i) => (
                    <div key={i} className="glass-card p-8 rounded-2xl">
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: t.rating }).map((_, j) => (
                                <Star key={j} className="w-4 h-4 fill-current" style={{ color: 'hsl(45, 70%, 50%)' }} />
                            ))}
                        </div>
                        <MessageCircle className="w-8 h-8 text-muted-foreground/30 mb-4" />
                        <p className="text-foreground leading-relaxed mb-6 text-lg italic">"{t.quote}"</p>
                        <p className="text-sm text-muted-foreground font-medium">— {t.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UseCasesSection;
