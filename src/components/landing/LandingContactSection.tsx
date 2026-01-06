const LandingContactSection = () => {
    return (
        <section id="contact" className="py-32 px-6 text-center relative overflow-hidden">
            {/* Radial Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10"></div>

            <div className="max-w-2xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
                    Ready to automate the busy work?
                </h2>
                <p className="text-neutral-400 text-lg font-light">
                    If manual follow-ups and missed calls are slowing your business down, let's fix it. No commitment required.
                </p>
                <div className="flex flex-col items-center pt-6">
                    <button className="shiny-cta">
                        <span className="px-8">Book Strategy Call</span>
                    </button>
                    <p className="text-[10px] text-neutral-600 mt-6 uppercase tracking-widest">15-Minute Discovery Chat</p>
                </div>
            </div>
        </section>
    );
};

export default LandingContactSection;
