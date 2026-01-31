import { useState } from "react";
import { Menu, X } from "lucide-react";

const LeadFixHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 px-6 py-4 bg-[#050505]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <button
          className="md:hidden text-neutral-400 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          <span className="sr-only">Menu</span>
        </button>

        <a href="/" className="text-xl font-semibold tracking-tight font-display">
          Lead Fix AI
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection("how-it-works", e)}
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#meet-lisa"
            onClick={(e) => scrollToSection("meet-lisa", e)}
            className="hover:text-white transition-colors"
          >
            Meet Lisa
          </a>
          <a
            href="#pricing"
            onClick={(e) => scrollToSection("pricing", e)}
            className="hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection("faq", e)}
            className="hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        <a
          href="#contact"
          onClick={(e) => scrollToSection("contact", e)}
          className="text-sm font-medium px-5 py-2.5 bg-[#F95500] text-white rounded-full hover:bg-[#FF6B1A] transition-colors"
        >
          BOOK A DISCOVERY CALL
        </a>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
          <a href="#how-it-works" onClick={(e) => scrollToSection("how-it-works", e)} className="text-neutral-400 hover:text-white text-sm">How It Works</a>
          <a href="#meet-lisa" onClick={(e) => scrollToSection("meet-lisa", e)} className="text-neutral-400 hover:text-white text-sm">Meet Lisa</a>
          <a href="#pricing" onClick={(e) => scrollToSection("pricing", e)} className="text-neutral-400 hover:text-white text-sm">Pricing</a>
          <a href="#contact" onClick={(e) => scrollToSection("contact", e)} className="text-[#F95500] text-sm font-medium">Book Discovery Call</a>
        </div>
      )}
    </nav>
  );
};

export default LeadFixHeader;
