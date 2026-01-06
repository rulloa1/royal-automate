import LeadForm from "@/components/LeadForm";

const LandingContactSection = () => {
    return (
        <section id="contact" className="py-32 px-6 text-center relative overflow-hidden">
            {/* Radial Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10"></div>

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
                        Ready to automate the busy work?
                    </h2>
                    <p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto">
                        Use the AI Agent below to generate a strategy for your business instantly, or skip straight to booking a call.
                    </p>
                </div>

                <div className="max-w-xl mx-auto text-left">
                    <LeadForm />
                </div>

                <div className="flex flex-col items-center pt-6 border-t border-white/5 mt-12">
                    <p className="text-neutral-500 mb-6 font-medium">Prefer to talk to a human?</p>
                    {/* Verified Cal.com link */}
                    <a
                        href="https://cal.com/catalyst-creators-studio-kadfk6/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shiny-cta inline-block no-underline"
                    >
                        <span className="px-8 flex items-center gap-2">
                            Book Strategy Call
                        </span>
                    </a>
                    <p className="text-[10px] text-neutral-600 mt-4 uppercase tracking-widest">15-Minute Discovery Chat</p>
                </div>
            </div>
        </section>
    );
};

export default LandingContactSection;
