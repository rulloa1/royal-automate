import { Linkedin, Twitter, Send } from "lucide-react";
import logo from "@/assets/royal-logo.png";
import partnerLogo from "@/assets/royscompany-logo.png";
import { scrollToSection } from "@/lib/utils";

const Footer = () => {
  const serviceLinks = [
    { label: "Web Development", href: "#services" },
    { label: "AI Automation", href: "#services" },
    { label: "Lead Generation", href: "#services" },
    { label: "Pricing", href: "#pricing" },
  ];

  const companyLinks = [
    { label: "Contact", href: "#contact" },
    { label: "About Us", href: "#" },
    { label: "Support", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Send, href: "https://t.me/RoysCompany", label: "Telegram" },
  ];

  return (
    <footer className="py-20 border-t border-border/50 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center mb-6">
              <img
                src={logo}
                alt="AI Solutions"
                className="h-14 object-contain"
              />
            </a>
            <p className="text-muted-foreground leading-relaxed">
              Empowering businesses through AI automation, intelligent lead generation, and enterprise-grade solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.label === "Telegram" ? "_blank" : undefined}
                  rel={link.label === "Telegram" ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="w-12 h-12 glass-card-hover flex items-center justify-center rounded-lg hover:text-primary"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm flex flex-col md:flex-row items-center gap-2">
            <span>© {new Date().getFullYear()} <span className="text-primary">AI Solutions</span>. All rights reserved.</span>
            <span className="hidden md:inline text-muted-foreground/30">|</span>
            <a href="https://www.royscompany.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span>RoyalSolutions.me is a proud affiliate of</span>
              <img src={partnerLogo} alt="RoysCompany" className="h-5 object-contain" />
            </a>
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
