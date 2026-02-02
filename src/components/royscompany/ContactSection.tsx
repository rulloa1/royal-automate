import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("create-lead", {
        body: {
          contact_name: formData.name,
          email: formData.email,
          pain_points: formData.message,
          source: "royscompany-website",
          interests: ["automation", "ai-systems"],
        },
      });

      if (error) throw error;

      toast.success("Transmission received. We'll initialize contact shortly.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Transmission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const executionSteps = [
    {
      number: "01",
      title: "AUDIT",
      description:
        "System Analysis. Deconstruct workflows to identify bottlenecks and redundancy.",
    },
    {
      number: "02",
      title: "ARCHITECT",
      description:
        "Blueprint Creation. Designing neural map of automation infrastructure.",
    },
    {
      number: "03",
      title: "INTEGRATE",
      description:
        "Deployment. Connecting nodes, API endpoints, AI agents into live environment.",
    },
    {
      number: "04",
      title: "OPTIMIZE",
      description:
        "Continuous Improvement. Monitoring telemetry data to refine efficiency.",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-32 px-6 relative bg-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-4">
            // TRANSMISSION
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            <span className="text-foreground">LET'S BUILD </span>
            <span className="text-primary">SOMETHING</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book a 15-minute discovery call. We'll audit your current workflows
            and show you exactly where automation can save you time and money.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-muted/50 bg-card/50 backdrop-blur-sm p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-2">
                  Identification
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full bg-background/50 border border-muted/50 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-2">
                  Digital Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full bg-background/50 border border-muted/50 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-2">
                  Transmission Data
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-background/50 border border-muted/50 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your automation needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(249,85,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "TRANSMITTING..." : "TRANSMIT"}
              </button>
            </form>
          </motion.div>

          {/* Execution Protocol */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-primary font-mono text-sm mb-6">
              ### Execution Protocol
            </p>

            <div className="space-y-6">
              {executionSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <span className="text-3xl font-display text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                    {step.number}
                  </span>
                  <div>
                    <h4 className="font-display text-lg text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
