 import { motion } from "framer-motion";
 import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
 import { Zap, Brain, Code2, Rocket, ArrowUpRight } from "lucide-react";
 
 const services = [
   {
     icon: Brain,
     title: "Strategy & AI",
     description: "AI-powered automation strategies tailored to your business workflow.",
     metric: "98%",
     metricLabel: "Efficiency gain"
   },
   {
     icon: Zap,
     title: "Automation",
     description: "End-to-end workflow automation using cutting-edge AI agents.",
     metric: "24/7",
     metricLabel: "Operation"
   },
   {
     icon: Code2,
     title: "Development",
     description: "Scalable architecture, API integration, and performance optimization.",
     metric: "40%",
     metricLabel: "Cost reduction"
   },
   {
     icon: Rocket,
     title: "Production",
     description: "Website generation, lead systems, and voice AI deployment.",
     metric: "10x",
     metricLabel: "Faster launch"
   },
 ];
 
 const ExpertiseSection = () => {
   const { ref, isVisible } = useIntersectionObserver(0.1);
 
   return (
     <section id="services" className="py-32 px-6 relative">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
       
       <div 
         ref={ref as React.RefObject<HTMLDivElement>}
         className="max-w-7xl mx-auto"
       >
         {/* Section header */}
         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
           <div>
             <motion.span
               initial={{ opacity: 0 }}
               animate={isVisible ? { opacity: 1 } : {}}
               transition={{ duration: 0.5 }}
               className="text-xs font-mono text-primary uppercase tracking-widest"
             >
               Our Expertise
             </motion.span>
             <motion.h2
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-4xl md:text-5xl font-display font-bold text-foreground mt-4 max-w-2xl"
             >
               We don't just build websites; we build ecosystems.
             </motion.h2>
           </div>
           
           <motion.a
             href="#contact"
             initial={{ opacity: 0 }}
             animate={isVisible ? { opacity: 1 } : {}}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
           >
             View all services
             <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
           </motion.a>
         </div>
 
         {/* Services grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {services.map((service, index) => (
             <motion.div
               key={service.title}
               initial={{ opacity: 0, y: 30 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5, delay: 0.1 * index }}
               className="group relative p-6 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 hover:border-primary/30"
             >
               {/* Icon */}
               <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                 <service.icon className="w-6 h-6 text-primary" />
               </div>
 
               {/* Content */}
               <h3 className="text-lg font-semibold text-foreground mb-2">
                 {service.title}
               </h3>
               <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                 {service.description}
               </p>
 
               {/* Metric */}
               <div className="pt-4 border-t border-border">
                 <span className="text-2xl font-display font-bold text-foreground">
                   {service.metric}
                 </span>
                 <span className="text-xs text-muted-foreground ml-2">
                   {service.metricLabel}
                 </span>
               </div>
 
               {/* Hover arrow */}
               <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ExpertiseSection;