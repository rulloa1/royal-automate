import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Search, UserCheck, ShoppingBag, Heart } from "lucide-react";

const steps = [
    { icon: Search, title: "Browse Our Selection", description: "Explore our curated menu of flower, edibles, concentrates, and accessories." },
    { icon: UserCheck, title: "Talk to a Budtender", description: "Our knowledgeable staff will help you find the perfect product for your needs." },
    { icon: ShoppingBag, title: "Make Your Purchase", description: "All products are lab-tested and verified. We accept cash and card." },
    { icon: Heart, title: "Enjoy Responsibly", description: "Take your premium products home and enjoy. Come back anytime!" },
];

const ProcessSection = () => {
    const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver(0.2);
    const { ref: stepsRef, isVisible: stepsVisible } = useIntersectionObserver(0.1);

    return (
        <section id="process" className="py-24 border-y border-border" style={{ background: 'hsla(120, 8%, 5%, 1)' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
                    <p className="text-muted-foreground max-w-md mx-auto text-sm">Your visit made simple.</p>
                </div>

                <div
                    ref={stepsRef as React.RefObject<HTMLDivElement>}
                    className={`grid md:grid-cols-4 gap-8 transition-all duration-700 delay-200 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {steps.map((step, i) => (
                        <div key={step.title} className="text-center group">
                            <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:scale-110 transition-transform"
                                style={{
                                    background: 'hsla(142, 50%, 45%, 0.1)',
                                    border: '1px solid hsla(142, 50%, 45%, 0.15)',
                                }}
                            >
                                <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Step {i + 1}</div>
                            <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
