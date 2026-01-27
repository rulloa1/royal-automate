import { Linkedin, Twitter, Send } from "lucide-react";
import logo from "@/assets/royal-logo.png";
import partnerLogo from "@/assets/royscompany-logo.png";
import { scrollToSection } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const handleScroll = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#") && location.pathname !== "/") {
      return; // Allow default navigation
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
  };

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Chatbot Dev", href: "/services/chatbot-development" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Send, href: "https://t.me/royAIsolutionsBot", label: "Telegram" },
  ];

  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="/" className="flex items-center mb-6">
              <img
                src={logo}
                alt="AI Solutions"
                className="h-10 object-contain"
              />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We automate content, workflows, and decision-making so your business scales without adding headcount.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <h4 className="text-sm font-medium mb-4">Navigation</h4>
              <ul className="space-y-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(link.href, e)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4">Connect</h4>
              <div className="flex gap-2">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.label === "Telegram" ? "_blank" : undefined}
                    rel={link.label === "Telegram" ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-foreground/30 hover:bg-secondary transition-all"
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs flex flex-wrap items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} AI Solutions. All rights reserved.</span>
            <span className="text-border">•</span>
            <a
              href="https://www.royscompany.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <span>Affiliate of</span>
              <img src={partnerLogo} alt="RoysCompany" className="h-4 object-contain" />
            </a>
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;