 import { motion } from "framer-motion";
 import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
 import { ArrowUpRight, Mail, MapPin } from "lucide-react";
 import LeadForm from "@/components/LeadForm";
 
 const CreativeContact = () => {
   const { ref, isVisible } = useIntersectionObserver(0.1);
 
   return (
     <section id="contact" className="py-32 px-6 relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 bg-gradient-to-t from-muted/50 via-background to-background pointer-events-none" />
       
       <div 
         ref={ref as React.RefObject<HTMLDivElement>}
         className="max-w-7xl mx-auto relative z-10"
       >
         <div className="grid lg:grid-cols-2 gap-16">
           {/* Left: CTA */}
           <div>
             <motion.span
               initial={{ opacity: 0 }}
               animate={isVisible ? { opacity: 1 } : {}}
               transition={{ duration: 0.5 }}
               className="text-xs font-mono text-primary uppercase tracking-widest"
             >
               Get in Touch
             </motion.span>
             
             <motion.h2
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-4xl md:text-6xl font-display font-bold text-foreground mt-4 mb-8"
             >
               Let's build something extraordinary
             </motion.h2>
             
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-lg text-muted-foreground mb-12 max-w-md"
             >
               Ready to automate the busy work? Tell me about your project and 
               let's create systems that work for you.
             </motion.p>
 
             {/* Contact info */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="space-y-4"
             >
               <a 
                 href="mailto:contact@royscompany.com"
                 className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
               >
                 <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                   <Mail className="w-4 h-4" />
                 </div>
                 <span>contact@royscompany.com</span>
                 <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
               
               <div className="flex items-center gap-3 text-muted-foreground">
                 <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                   <MapPin className="w-4 h-4" />
                 </div>
                 <span>Miami, FL · Working Globally</span>
               </div>
             </motion.div>
           </div>
 
           {/* Right: Form */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={isVisible ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="bg-card border border-border rounded-3xl p-8"
           >
             <LeadForm />
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
 
 export default CreativeContact;