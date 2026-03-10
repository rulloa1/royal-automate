import { Instagram } from "lucide-react";

const LandingFooter = () => {
    return (
        <footer className="border-t border-border py-12" style={{ background: 'hsl(120 10% 3%)' }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Flava Depot. All rights reserved. 21+ only.
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href="https://instagram.com/flava_depot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-xs"
                    >
                        <Instagram className="w-4 h-4" /> @FLAVA_DEPOT
                    </a>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
