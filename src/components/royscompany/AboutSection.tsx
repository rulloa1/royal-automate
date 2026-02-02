import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Workflow, MessageSquare, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const vectors = [
    {
      number: "01",
      code: "//WORKFLOW_CONNECTIVITY",
      title: "Workflow Connectivity",
      description:
        "Seamless integration of Make.com and n8n nodes to eliminate manual redundancy across your entire technology infrastructure.",
      icon: Workflow,
    },
    {
      number: "02",
      code: "//CONVERSATIONAL_AI",
      title: "Conversational AI",
      description:
        "Autonomous voice agents handling 24/7 inbound/outbound communications with real-time data capture and function-calling capabilities.",
      icon: MessageSquare,
    },
    {
      number: "03",
      code: "//GROWTH_PIPELINES",
      title: "Growth Pipelines",
      description:
        "Automated acquisition funnels structured for high-volume data processing and lead generation at scale.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm mb-4">
            // IDENTITY_MATRIX
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-6">
            <span className="text-foreground">WHO ARE WE? </span>
            <span className="text-primary">ARCHITECTS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            We are not a traditional agency. We are the architects of the
            automated future. ROYSCOMPANY constructs digital nervous systems for
            businesses that refuse to be slowed down by human latency.
          </p>
        </motion.div>

        {/* Location & Focus */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-16 max-w-4xl"
        >
          Based in Spring, Texas, we deploy three core vectors:{" "}
          <span className="text-primary">Workflow Connectivity</span>{" "}
          (connecting your tech stack),{" "}
          <span className="text-primary">Conversational AI</span> (replacing
          call centers), and{" "}
          <span className="text-primary">Growth Pipelines</span> (automating
          revenue). We partner with forward-thinking entities in healthcare,
          real estate, and construction who understand that in the age of AI,
          speed is the only currency that matters.
        </motion.p>

        {/* Core Vectors Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-primary font-mono text-sm mb-8"
        >
          ### // CORE_VECTORS
        </motion.p>

        {/* Vectors Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {vectors.map((vector, index) => (
            <motion.div
              key={vector.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group relative p-6 border border-muted/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              {/* Number */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-display text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                  {vector.number}
                </span>
              </div>

              {/* Code Tag */}
              <p className="text-xs font-mono text-primary/70 mb-3">
                {vector.code}
              </p>

              {/* Title */}
              <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-3">
                <vector.icon className="w-5 h-5 text-primary" />
                {vector.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {vector.description}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Live Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="p-4 border border-muted/30 bg-card/30">
            <p className="text-xs font-mono text-muted-foreground mb-2">
              Operational Efficiency Gain
            </p>
            <p className="text-3xl font-display text-primary">98.4%</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              LIVE_METRIC // GOOD
            </p>
          </div>
          <div className="p-4 border border-muted/30 bg-card/30">
            <p className="text-xs font-mono text-muted-foreground mb-2">
              System Uptime Guarantee
            </p>
            <p className="text-3xl font-display text-primary">24/7</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              LIVE_METRIC // GOOD
            </p>
          </div>
          <div className="col-span-2 p-4 border border-muted/30 bg-card/30">
            <p className="text-xs font-mono text-muted-foreground mb-2">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {["Make.com", "n8n", "React", "TypeScript", "Vite"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
