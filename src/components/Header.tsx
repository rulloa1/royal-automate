import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import logo from "@/assets/royal-logo.png";
import { scrollToSection } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "/services/chatbot-development", label: "Chatbot Dev" },
    { href: "/services/automations", label: "Automations" },
    { href: "/blog", label: "Blog" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="RoysCompany"
              className="h-10 md:h-12 object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://t.me/royAIsolutionsBot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with AI
            </a>
            <button
              onClick={() => scrollToSection("#contact")}
              className="gradient-button text-sm py-2.5 px-5"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-72 mt-4" : "max-h-0"
            }`}
        >
          <nav className="glass-card p-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm text-left py-2"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://t.me/royAIsolutionsBot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm text-left py-2 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with AI
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="gradient-button text-center text-sm py-3"
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;