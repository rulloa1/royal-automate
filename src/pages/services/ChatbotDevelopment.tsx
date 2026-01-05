import { Helmet } from "react-helmet-async";
import { MessageSquare, Zap, Target, BarChart, Bot, Code } from "lucide-react";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ChatbotDevelopment = () => {
    const { ref, isVisible } = useIntersectionObserver();

    const features = [
        {
            icon: MessageSquare,
            title: "24/7 Customer Support",
            description: "Keep your business open around the clock. Our AI chatbots handle inquiries instantly, ensuring no customer is ever left waiting.",
        },
        {
            icon: Target,
            title: "Smart Lead Qualification",
            description: "Turn visitors into qualified leads. Our bots ask the right questions to identify high-value prospects automatically.",
        },
        {
            icon: Zap,
            title: "Instant Integration",
            description: "Seamlessly connects with your existing CRM, calendar, and support tools. No disruption to your workflow.",
        },
        {
            icon: Bot,
            title: "Custom AI Persona",
            description: "We train the AI to speak in your brand's voice, ensuring a consistent and personalized experience for every user.",
        },
        {
            icon: Code,
            title: "Advanced Logic Flows",
            description: "From simple FAQs to complex booking flows, our custom development handles intricate business logic with ease.",
        },
        {
            icon: BarChart,
            title: "Analytics & Insights",
            description: "Gain deep visibility into customer interactions. Track sentiment, common queries, and conversion rates.",
        },
    ];

    return (
        <>
            <Helmet>
                <title>Chatbot Development | Custom AI Chatbot | RoysCompany</title>
                <meta
                    name="description"
                    content="Expert chatbot development services. We build custom AI chatbots that automate support, qualify leads, and drive revenue 24/7."
                />
                <meta
                    name="keywords"
                    content="chatbot development, custom ai chatbot, ai automation, lead generation bot, customer support ai"
                />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main>
                    {/* Hero Section */}
                    <section className="pt-32 pb-20 relative overflow-hidden">
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in-up">
                                    Next-Gen Automation
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6 animate-fade-in-up animation-delay-200">
                                    Custom AI Chatbot Development
                                </h1>
                                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
                                    Transform your customer experience with intelligent, always-on AI agents designed to engage, qualify, and convert.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
                                    <a href="#contact" className="gradient-button px-8 py-4 text-lg">
                                        Start Your Project
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Background Gradient Element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
                    </section>

                    {/* Features Grid */}
                    <section className="py-24 bg-secondary/30" ref={ref}>
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our AI Chatbots?</h2>
                                <p className="text-muted-foreground">Enterprise-grade technology tailored to your specific business needs.</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {features.map((feature, index) => (
                                    <div
                                        key={feature.title}
                                        className={`${isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : "opacity-0"}`}
                                    >
                                        <InteractiveCard className="h-full">
                                            <div className="h-full flex flex-col">
                                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                                                    <feature.icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                            </div>
                                        </InteractiveCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Process Section - Simplified text for now */}
                    <section className="py-24">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-6">Ready to Automate Your Interactions?</h2>
                                    <p className="text-xl text-muted-foreground mb-8">
                                        Stop losing leads to slow response times. Let's build your custom AI solution today.
                                    </p>
                                    <a href="#contact" className="gradient-button px-8 py-4 inline-block">
                                        Get a Free Consultation
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
};

export default ChatbotDevelopment;
