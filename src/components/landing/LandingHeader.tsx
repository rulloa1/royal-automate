import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import logo from "@/assets/flava-depot-logo.png";

const LandingHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    const links = [
        { id: "menu", label: "Menu" },
        { id: "flower", label: "Flower" },
        { id: "about", label: "About" },
        { id: "contact", label: "Contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2">
                    <img src={logo} alt="Flava Depot" className="h-10 md:h-12 object-contain" />
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            onClick={(e) => scrollToSection(l.id, e)}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                            {l.label}
                        </a>
                    ))}
                    <a
                        href="https://instagram.com/flava_depot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Instagram className="w-5 h-5" />
                    </a>
                </nav>

                <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
                    <nav className="flex flex-col p-6 gap-4">
                        {links.map((l) => (
                            <a
                                key={l.id}
                                href={`#${l.id}`}
                                onClick={(e) => scrollToSection(l.id, e)}
                                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default LandingHeader;
