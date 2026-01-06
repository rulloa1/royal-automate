import { Cpu, ArrowRight, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LandingHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 group">
                    <div className="p-1 rounded bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <Cpu className="text-neutral-300 w-4 h-4" />
                    </div>
                    <span className="font-medium tracking-tight text-sm text-neutral-200">RORY ULLOA</span>
                </a>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500">
                    <a href="#services" onClick={(e) => scrollToSection('services', e)} className="hover:text-white transition-colors">Services</a>
                    <a href="#process" onClick={(e) => scrollToSection('process', e)} className="hover:text-white transition-colors">Methodology</a>
                    <a href="#use-cases" onClick={(e) => scrollToSection('use-cases', e)} className="hover:text-white transition-colors">Use Cases</a>
                    <a href="#about" onClick={(e) => scrollToSection('about', e)} className="hover:text-white transition-colors">About</a>
                </nav>

                <div className="flex items-center gap-4">
                    <a href="#contact" onClick={(e) => scrollToSection('contact', e)} className="hidden md:flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors">
                        Book Strategy Call <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-neutral-400 p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="absolute top-14 left-0 w-full bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
                    <a href="#services" onClick={(e) => scrollToSection('services', e)} className="text-neutral-400 hover:text-white text-sm">Services</a>
                    <a href="#process" onClick={(e) => scrollToSection('process', e)} className="text-neutral-400 hover:text-white text-sm">Methodology</a>
                    <a href="#use-cases" onClick={(e) => scrollToSection('use-cases', e)} className="text-neutral-400 hover:text-white text-sm">Use Cases</a>
                    <a href="#contact" onClick={(e) => scrollToSection('contact', e)} className="text-blue-400 text-sm font-medium">Book Strategy Call</a>
                </div>
            )}
        </header>
    );
};

export default LandingHeader;
