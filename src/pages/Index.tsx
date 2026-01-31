import { Helmet } from "react-helmet-async";
import LeadFixBackground from "@/components/leadfix/LeadFixBackground";
import LeadFixHeader from "@/components/leadfix/LeadFixHeader";
import LeadFixHero from "@/components/leadfix/LeadFixHero";
import HowItWorksSection from "@/components/leadfix/HowItWorksSection";
import MeetLisaSection from "@/components/leadfix/MeetLisaSection";
import TestimonialSection from "@/components/leadfix/TestimonialSection";
import LeadFixPricing from "@/components/leadfix/LeadFixPricing";
import LeadFixContact from "@/components/leadfix/LeadFixContact";
import LeadFixFooter from "@/components/leadfix/LeadFixFooter";

const Index = () => {
  return (
    <div className="bg-[#050505] text-neutral-100 antialiased min-h-screen">
      <Helmet>
        <title>Lead Fix AI | Voice Agents for Contractors</title>
        <meta
          name="description"
          content="Never miss another $1,200 call again. AI voice agents that answer 24/7, qualify leads, and book jobs for Roofers, HVAC & Plumbers."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <LeadFixBackground />
      <LeadFixHeader />

      <main className="relative z-10">
        <LeadFixHero />
        <HowItWorksSection />
        <MeetLisaSection />
        <TestimonialSection />
        <LeadFixPricing />
        <LeadFixContact />
      </main>

      <LeadFixFooter />
    </div>
  );
};

export default Index;
