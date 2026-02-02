import { motion } from "framer-motion";

const RoysHeader = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-display text-xl tracking-wider text-foreground">
            ROYSCOMPANY
          </span>
          <span className="text-muted-foreground font-mono text-xs">
            / EAST HOME
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            // ABOUT
          </button>
          <button
            onClick={() => scrollToSection("systems")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            // SYSTEMS
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            // ACCESS
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-mono hover:bg-primary/90 transition-colors"
          >
            INITIALIZE
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </motion.header>
  );
};

export default RoysHeader;
