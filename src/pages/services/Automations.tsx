import { Helmet } from "react-helmet-async";
import { Workflow, Zap, Target, BarChart, Bot, Database } from "lucide-react";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Automations = () => {
    const { ref, isVisible } = useIntersectionObserver();

    const features = [
        {
            icon: Workflow,
            title: "End-to-End Workflow Automation",
            description: "Connect your entire tech stack. We build seamless integrations between your CRM, email, project management, and communication tools.",
        },
        {
            icon: Target,
            title: "Lead Nurturing Sequences",
            description: "Never let a lead go cold. Automated follow-ups, qualification, and scheduling ensure you engage prospects at the perfect moment.",
        },
        {
            icon: Zap,
            title: "Operational Efficiency",
            description: "Eliminate repetitive manual tasks. From data entry to report generation, we automate the busywork so you can focus on strategy.",
        },
        {
            icon: Database,
            title: "Data Synchronization",
            description: "Keep your data consistent across all platforms. Real-time syncing ensures your team always has the latest information.",
        },
        {
            icon: Bot,
            title: "Intelligent Agents",
            description: "Deploy autonomous agents to handle complex tasks like research, content creation, and customer inquiries without human intervention.",
        },
        {
            icon: BarChart,
            title: "Automated Reporting",
            description: "Get key insights delivered to your inbox. We automate data collection and visualization so you can track KPIs effortlessly.",
        },
    ];

    return (
        <>
            <Helmet>
                <title>Business Process Automation | n8n & Make.com Workflows | RoysCompany</title>
                <meta
                    name="description"
                    content="Expert business process automation services. We build custom n8n and Make.com workflows to streamline operations and scale your business."
                />
                <meta
                    name="keywords"
                    content="business automation, workflow automation, n8n, make.com, process optimization, crm automation"
                />
                <meta property="og:title" content="Business Process Automation | RoysCompany" />
                <meta property="og:description" content="Expert business process automation services. We build custom n8n and Make.com workflows to streamline operations and scale your business." />
                <meta property="og:type" content="service" />
                <meta property="og:url" content="https://www.royscompany.com/services/automations" />
                <meta property="og:image" content="/og-image.png" />
                <link rel="canonical" href="https://www.royscompany.com/services/automations" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main>
                    {/* Hero Section */}
                    <section className="pt-32 pb-20 relative overflow-hidden">
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in-up">
                                    Streamline Your Operations
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6 animate-fade-in-up animation-delay-200">
                                    Business Process Automation
                                </h1>
                                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
                                    Scale your business without scaling your headcount. We engineer intelligent workflows that execute complex tasks with precision.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
                                    <a href="#contact" className="gradient-button px-8 py-4 text-lg">
                                        Automate Your Business
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Automate?</h2>
                                <p className="text-muted-foreground">Recover thousands of hours and eliminate human error with robust automation.</p>
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

                    {/* CTA Section */}
                    <section className="py-24">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-6">Ready to Reclaim Your Time?</h2>
                                    <p className="text-xl text-muted-foreground mb-8">
                                        Stop doing the busywork. Let's build a system that works for you, 24/7.
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

export default Automations;
