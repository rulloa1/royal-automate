import { Linkedin, Twitter, Mail } from "lucide-react";
import logo from "@/assets/royal-logo.png";

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    { icon: Mail, href: "mailto:contact@royalsolutions.me", label: "Email" },
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
                  aria-label={link.label}
                  className="w-12 h-12 glass-card-hover flex items-center justify-center rounded-lg hover:text-primary"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-muted-foreground text-sm">
              <span className="font-condensed tracking-wider uppercase text-xs block mb-1">Email</span>
              contact@royalsolutions.me
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} <span className="text-primary">AI Solutions</span>. All rights reserved.
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
