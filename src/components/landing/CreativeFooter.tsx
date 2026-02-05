 import { ArrowUpRight } from "lucide-react";
 
 const socials = [
   { label: "LinkedIn", href: "#" },
   { label: "Twitter", href: "#" },
   { label: "Instagram", href: "#" },
 ];
 
 const CreativeFooter = () => {
   const currentYear = new Date().getFullYear();
 
   return (
     <footer className="py-12 px-6 border-t border-border bg-background">
       <div className="max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
           {/* Logo */}
           <div>
             <span className="font-display font-bold text-lg text-foreground">
               RORY<span className="text-primary">.</span>ULLOA
             </span>
             <p className="text-sm text-muted-foreground mt-2">
               AI Automation Systems
             </p>
           </div>
 
           {/* Links */}
           <div className="flex flex-wrap gap-6">
             {socials.map((social) => (
               <a
                 key={social.label}
                 href={social.href}
                 className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
               >
                 {social.label}
                 <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
             ))}
           </div>
         </div>
 
         {/* Bottom bar */}
         <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs text-muted-foreground">
             © {currentYear} Rory Ulloa. All rights reserved.
           </p>
           <div className="flex gap-6 text-xs text-muted-foreground">
             <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
           </div>
         </div>
       </div>
     </footer>
   );
 };
 
 export default CreativeFooter;