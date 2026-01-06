const LandingFooter = () => {
    return (
        <footer className="border-t border-white/5 py-12 bg-black">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xs text-neutral-600">
                    © 2024 Rory Ulloa. All rights reserved.
                </div>
                <div className="flex gap-8 text-xs font-medium text-neutral-500">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="mailto:hello@royscompany.com" className="hover:text-white transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
