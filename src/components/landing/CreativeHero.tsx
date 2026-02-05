 import { motion } from "framer-motion";
 import { ArrowRight, MapPin, Globe } from "lucide-react";
 
 const CreativeHero = () => {
   return (
     <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
       
       {/* Subtle grid pattern */}
       <div 
         className="absolute inset-0 opacity-[0.02]"
         style={{
           backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
           backgroundSize: '60px 60px'
         }}
       />
 
       <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
         {/* Top status bar */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="flex flex-wrap items-center justify-between gap-4 mb-16"
         >
           <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
             <div className="flex items-center gap-2">
               <MapPin className="w-3 h-3" />
               <span>Based in Miami</span>
             </div>
             <div className="flex items-center gap-2">
               <Globe className="w-3 h-3" />
               <span>Working Globally</span>
             </div>
           </div>
           
           <div className="hidden md:flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
             <span className="text-xs text-muted-foreground font-mono">Available for projects</span>
           </div>
         </motion.div>
 
         {/* Main headline - split typography */}
         <div className="space-y-4">
           <motion.h1
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="font-display font-bold text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-tighter"
           >
             <span className="block text-foreground">AUTOMATION</span>
           </motion.h1>
           
           <motion.h1
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="font-display font-bold text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-tighter"
           >
             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent">
               ALCHEMY
             </span>
           </motion.h1>
         </div>
 
         {/* Subheadline and CTA */}
         <div className="mt-12 grid md:grid-cols-2 gap-12 items-end">
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
           >
             We are a creative automation studio. We blend strategy, AI, and 
             technology to build systems that defy convention.
           </motion.p>
           
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="flex flex-wrap gap-4 md:justify-end"
           >
             <a 
               href="#work" 
               className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full transition-all hover:gap-4"
             >
               View Work
               <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
             </a>
             <a 
               href="#contact" 
               className="flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-full transition-colors hover:bg-muted"
             >
               Get in touch
             </a>
           </motion.div>
         </div>
 
         {/* Floating metrics */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="absolute bottom-12 left-6 hidden lg:flex flex-col gap-1"
         >
           <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Projects Delivered</span>
           <span className="text-4xl font-display font-bold text-foreground">47+</span>
         </motion.div>
 
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.9 }}
           className="absolute bottom-12 right-6 hidden lg:flex flex-col gap-1 text-right"
         >
           <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Hours Saved Monthly</span>
           <span className="text-4xl font-display font-bold text-foreground">2,400+</span>
         </motion.div>
       </div>
 
       {/* Scroll indicator */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 1 }}
         className="absolute bottom-8 left-1/2 -translate-x-1/2"
       >
         <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
           <motion.div
             animate={{ y: [0, 8, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="w-1 h-2 bg-muted-foreground/50 rounded-full"
           />
         </div>
       </motion.div>
     </section>
   );
 };
 
 export default CreativeHero;