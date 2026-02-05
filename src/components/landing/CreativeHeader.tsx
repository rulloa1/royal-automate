 import { useState, useEffect } from "react";
 import { Menu, X } from "lucide-react";
 import { motion, AnimatePresence } from "framer-motion";
 
 const CreativeHeader = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50);
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 
   const navItems = [
     { label: "Work", href: "#work" },
     { label: "Services", href: "#services" },
     { label: "About", href: "#about" },
     { label: "Contact", href: "#contact" },
   ];
 
   return (
     <header
       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
         isScrolled 
           ? "bg-background/80 backdrop-blur-xl border-b border-border" 
           : "bg-transparent"
       }`}
     >
       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
         {/* Logo */}
         <a href="/" className="flex items-center gap-2 group">
           <span className="font-display font-bold text-lg tracking-tight text-foreground">
             RORY<span className="text-primary">.</span>ULLOA
           </span>
         </a>
 
         {/* Desktop Navigation */}
         <nav className="hidden md:flex items-center gap-8">
           {navItems.map((item) => (
             <a
               key={item.label}
               href={item.href}
               className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
             >
               {item.label}
               <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
             </a>
           ))}
         </nav>
 
         {/* CTA Button */}
         <a
           href="#contact"
           className="hidden md:flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
         >
           Start a Project
         </a>
 
         {/* Mobile Menu Toggle */}
         <button
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="md:hidden p-2 text-foreground"
         >
           {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </button>
       </div>
 
       {/* Mobile Menu */}
       <AnimatePresence>
         {isMobileMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden bg-background border-b border-border overflow-hidden"
           >
             <nav className="flex flex-col p-6 gap-4">
               {navItems.map((item) => (
                 <a
                   key={item.label}
                   href={item.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                 >
                   {item.label}
                 </a>
               ))}
               <a
                 href="#contact"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="mt-4 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-medium rounded-full"
               >
                 Start a Project
               </a>
             </nav>
           </motion.div>
         )}
       </AnimatePresence>
     </header>
   );
 };
 
 export default CreativeHeader;