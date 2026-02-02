import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const RoysHero = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,85,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,85,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Version Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-3 mb-8 font-mono text-xs"
        >
          <span className="text-muted-foreground">ver_2.0.25</span>
          <span className="text-muted-foreground">build_quantum</span>
          <span className="text-primary">status_nominal</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6"
        >
          <span className="text-foreground">AI automation systems that </span>
          <span className="text-primary">eliminate busywork</span>
          <span className="text-foreground"> and </span>
          <span className="text-primary">fill pipelines</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-mono"
        >
          Neural infrastructure for businesses that refuse to be slowed down by
          human latency.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(249,85,0,0.3)]"
          >
            INITIALIZE DISCOVERY CALL
          </button>
          <button
            onClick={() =>
              document
                .getElementById("systems")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 border border-muted-foreground/30 text-foreground font-mono text-sm hover:border-primary hover:text-primary transition-colors"
          >
            VIEW SYSTEMS
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono">
          Scroll to Initialize 3D Environment
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RoysHero;
