 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
 import { ArrowUpRight } from "lucide-react";
 
 const projects = [
   {
     id: 1,
     title: "AI Lead System",
     category: "Automation",
     description: "Automated lead qualification and outreach system",
     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
     year: "2024"
   },
   {
     id: 2,
     title: "Voice Agent",
     category: "AI",
     description: "24/7 conversational AI for customer support",
     image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop",
     year: "2024"
   },
   {
     id: 3,
     title: "Website Generator",
     category: "Development",
     description: "Automated website creation from templates",
     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
     year: "2024"
   },
   {
     id: 4,
     title: "CRM Integration",
     category: "Systems",
     description: "Seamless data flow between platforms",
     image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
     year: "2023"
   },
 ];
 
 const categories = ["All", "Automation", "AI", "Development", "Systems"];
 
 const WorkShowcase = () => {
   const [activeCategory, setActiveCategory] = useState("All");
   const { ref, isVisible } = useIntersectionObserver(0.1);
 
   const filteredProjects = activeCategory === "All" 
     ? projects 
     : projects.filter(p => p.category === activeCategory);
 
   return (
     <section id="work" className="py-32 px-6 bg-muted/30">
       <div 
         ref={ref as React.RefObject<HTMLDivElement>}
         className="max-w-7xl mx-auto"
       >
         {/* Section header */}
         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
           <div>
             <motion.span
               initial={{ opacity: 0 }}
               animate={isVisible ? { opacity: 1 } : {}}
               transition={{ duration: 0.5 }}
               className="text-xs font-mono text-primary uppercase tracking-widest"
             >
               Selected Work
             </motion.span>
             <motion.h2
               initial={{ opacity: 0, y: 20 }}
               animate={isVisible ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="text-4xl md:text-5xl font-display font-bold text-foreground mt-4"
             >
               Archive
             </motion.h2>
           </div>
 
           {/* Category filter */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={isVisible ? { opacity: 1 } : {}}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="flex flex-wrap gap-2"
           >
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                   activeCategory === cat
                     ? "bg-foreground text-background"
                     : "bg-transparent border border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                 }`}
               >
                 {cat}
               </button>
             ))}
           </motion.div>
         </div>
 
         {/* Projects grid */}
         <AnimatePresence mode="wait">
           <motion.div
             key={activeCategory}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.3 }}
             className="grid md:grid-cols-2 gap-6"
           >
             {filteredProjects.map((project, index) => (
               <motion.div
                 key={project.id}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.1 * index }}
                 className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
               >
                 {/* Image */}
                 <img
                   src={project.image}
                   alt={project.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
 
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
 
                 {/* Content */}
                 <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <div className="flex items-center gap-3 mb-3">
                     <span className="text-xs font-mono text-primary">{project.category}</span>
                     <span className="text-xs text-muted-foreground">{project.year}</span>
                   </div>
                   <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                     {project.title}
                   </h3>
                   <p className="text-sm text-muted-foreground max-w-md">
                     {project.description}
                   </p>
                 </div>
 
                 {/* Hover arrow */}
                 <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                   <ArrowUpRight className="w-5 h-5 text-foreground" />
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </AnimatePresence>
       </div>
     </section>
   );
 };
 
 export default WorkShowcase;