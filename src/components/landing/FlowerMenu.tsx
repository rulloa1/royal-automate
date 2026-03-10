import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Star, Sparkles } from "lucide-react";

interface Strain {
    name: string;
    type: "Indica" | "Sativa" | "Hybrid";
    price: string;
    thc?: string;
    effects: string[];
    helpsWidth?: string;
    featured?: boolean;
}

const strains: Strain[] = [
    {
        name: "King Louis OG",
        type: "Indica",
        price: "$3.00/g",
        effects: ["Sleepy", "Relaxed", "Hungry"],
        helpsWidth: "Anxiety",
        featured: true,
    },
    {
        name: "Hard Candy",
        type: "Indica",
        price: "$5.00/g",
        effects: ["Energetic", "Euphoric"],
    },
    {
        name: "Blue Nerds",
        type: "Hybrid",
        price: "$5.00/g",
        thc: "50/50",
        effects: ["Focused", "Relaxed", "Euphoric"],
        helpsWidth: "Pain",
    },
    {
        name: "Obama Runtz",
        type: "Hybrid",
        price: "$5.00/g",
        thc: "<29%",
        effects: ["Relaxed", "Happy"],
    },
    {
        name: "Gelato 41",
        type: "Hybrid",
        price: "$5.00/g",
        effects: ["Creative", "Uplifted", "Relaxed"],
        helpsWidth: "Stress",
    },
    {
        name: "Purple Punch",
        type: "Indica",
        price: "$5.00/g",
        effects: ["Sleepy", "Relaxed"],
        helpsWidth: "Insomnia",
    },
];

const typeColors: Record<string, string> = {
    Indica: "142 50% 45%",
    Sativa: "45 70% 50%",
    Hybrid: "280 50% 55%",
};

const FlowerMenu = () => {
    const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver(0.3);
    const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver(0.1);

    return (
        <section id="flower" className="py-24 px-6 max-w-7xl mx-auto">
            <div
                ref={titleRef as React.RefObject<HTMLDivElement>}
                className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Flower Menu</h2>
                <p className="text-muted-foreground text-sm">
                    Fresh, lab-tested cannabis flower. All prices per gram.
                </p>
            </div>

            <div
                ref={gridRef as React.RefObject<HTMLDivElement>}
                className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-150 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {strains.map((strain) => {
                    const color = typeColors[strain.type];
                    return (
                        <div
                            key={strain.name}
                            className={`glass-card p-6 relative ${strain.featured ? 'ring-1' : ''}`}
                            style={strain.featured ? { borderColor: `hsla(${color}, 0.3)` } : {}}
                        >
                            {strain.featured && (
                                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1"
                                    style={{
                                        background: `hsl(${color})`,
                                        color: 'white',
                                    }}
                                >
                                    <Star className="w-3 h-3" /> Budget Pick
                                </div>
                            )}
                            <div className="flex items-start justify-between mb-4 mt-1">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">{strain.name}</h3>
                                    <span
                                        className="text-[11px] font-semibold uppercase tracking-wider"
                                        style={{ color: `hsl(${color})` }}
                                    >
                                        {strain.type} {strain.thc && `(${strain.thc})`}
                                    </span>
                                </div>
                                <span className="text-xl font-bold gold-accent">{strain.price}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {strain.effects.map((e) => (
                                    <span
                                        key={e}
                                        className="px-2 py-0.5 rounded text-[10px] font-medium border"
                                        style={{
                                            borderColor: `hsla(${color}, 0.2)`,
                                            background: `hsla(${color}, 0.05)`,
                                            color: `hsl(${color})`,
                                        }}
                                    >
                                        {e}
                                    </span>
                                ))}
                            </div>

                            {strain.helpsWidth && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Sparkles className="w-3 h-3" style={{ color: `hsl(${color})` }} />
                                    <span>Helps with: <strong className="text-foreground">{strain.helpsWidth}</strong></span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FlowerMenu;
