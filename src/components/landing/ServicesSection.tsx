import { Leaf, Candy, Droplets, Flame, Check } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const categories = [
    {
        icon: Leaf,
        title: "Premium Flower",
        description: "Hand-selected, lab-tested cannabis flower. Indica, Sativa, and Hybrid strains available by the gram or ounce.",
        color: "142 50% 45%",
        features: ["Lab Tested", "Daily Fresh Drops"],
    },
    {
        icon: Droplets,
        title: "Concentrates",
        description: "Wax, shatter, live resin, and more. High-potency extracts for the experienced consumer.",
        color: "45 70% 50%",
        features: ["High Potency", "Premium Extracts"],
    },
    {
        icon: Candy,
        title: "Edibles",
        description: "Gummies, chocolates, beverages, and baked goods. Precisely dosed for a consistent experience.",
        color: "280 50% 55%",
        features: ["Precise Dosing", "Wide Variety"],
    },
    {
        icon: Flame,
        title: "Pre-Rolls & Vapes",
        description: "Ready-to-enjoy pre-rolls and vape cartridges. Convenient and perfect for on-the-go.",
        color: "15 80% 55%",
        features: ["Ready to Enjoy", "Multiple Strains"],
    },
];

const ServicesSection = () => {
    const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver(0.2);
    const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver(0.1);

    return (
        <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
            <div
                ref={headerRef as React.RefObject<HTMLDivElement>}
                className={`mb-16 text-center transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Menu</h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
                    Curated selection of premium cannabis products. All lab-tested for purity and potency.
                </p>
            </div>

            <div
                ref={cardsRef as React.RefObject<HTMLDivElement>}
                className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-150 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {categories.map((cat) => (
                    <div key={cat.title} className="glass-card p-8 group">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                            style={{
                                background: `hsla(${cat.color}, 0.1)`,
                                border: `1px solid hsla(${cat.color}, 0.15)`,
                                color: `hsl(${cat.color})`,
                            }}
                        >
                            <cat.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground">{cat.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{cat.description}</p>
                        <ul className="space-y-3">
                            {cat.features.map((f) => (
                                <li key={f} className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <Check className="w-3 h-3" style={{ color: `hsl(${cat.color})` }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
