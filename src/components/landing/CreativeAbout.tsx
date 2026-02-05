 import { motion } from "framer-motion";
 import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
 
 const stats = [
   { value: "5+", label: "Years Experience" },
   { value: "47+", label: "Projects Completed" },
   { value: "98%", label: "Client Satisfaction" },
   { value: "24/7", label: "AI Operations" },
 ];
 
 const CreativeAbout = () => {
   const { ref, isVisible } = useIntersectionObserver(0.1);
 
   return (
     <section id="about" className="py-32 px-6 relative overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />
       
       <div 
         ref={ref as React.RefObject<HTMLDivElement>}
         className="max-w-7xl mx-auto relative z-10"
       >
         <div className="grid lg:grid-cols-2 gap-16 items-center">
           {/* Left: Content */}
           <div>
             <motion.span
               initial={{ opacity: 0 }}
               animate={isVisible ? { opacity: 1 } : {}}
               transition={{ duration: 0.5 }}
               className="text-xs font-mono text-primary uppercase tracking-widest"
             >
               About
             </motion.span>
             
             <motion.h2
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-4xl md:text-5xl font-display font-bold text-foreground mt-4 mb-8"
             >
               Turning complexity into simplicity
             </motion.h2>
             
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="space-y-6 text-muted-foreground leading-relaxed"
             >
               <p>
                 I'm Rory Ulloa, a creative technologist focused on building intelligent 
                 automation systems that transform how businesses operate.
               </p>
               <p>
                 My approach blends strategic thinking with cutting-edge AI implementation. 
                 From voice agents to lead generation systems, I create solutions that work 
                 around the clock—eliminating busywork and filling pipelines.
               </p>
               <p>
                 Every project is an opportunity to push boundaries and deliver something 
                 that doesn't just meet expectations—it redefines them.
               </p>
             </motion.div>
 
             {/* Stats */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border"
             >
               {stats.map((stat) => (
                 <div key={stat.label}>
                   <span className="text-3xl font-display font-bold text-foreground">
                     {stat.value}
                   </span>
                   <span className="block text-xs text-muted-foreground mt-1">
                     {stat.label}
                   </span>
                 </div>
               ))}
             </motion.div>
           </div>
 
           {/* Right: Visual */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={isVisible ? { opacity: 1, scale: 1 } : {}}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative"
           >
             <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-muted border border-border">
               <img
                 src="/rory-ulloa.jpg"
                 alt="Rory Ulloa"
                 className="w-full h-full object-cover mix-blend-luminosity opacity-80 hover:opacity-100 hover:mix-blend-normal transition-all duration-500"
               />
             </div>
             
             {/* Floating badge */}
             <div className="absolute -bottom-6 -left-6 px-6 py-4 rounded-2xl bg-card border border-border shadow-xl">
               <span className="text-xs text-muted-foreground block">Specializing in</span>
               <span className="font-display font-bold text-foreground">AI Automation</span>
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
 
 export default CreativeAbout;