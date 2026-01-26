import { Helmet } from "react-helmet-async";
import FluidBackground from "@/components/landing/FluidBackground";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import VoiceBotSection from "@/components/landing/VoiceBotSection";
import ProcessSection from "@/components/landing/ProcessSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import AboutSection from "@/components/landing/AboutSection";
import PricingSection from "@/components/PricingSection";
import LandingContactSection from "@/components/landing/LandingContactSection";
import LandingFooter from "@/components/landing/LandingFooter";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rory Ulloa | RoysCompany.com</title>
        <meta
          name="description"
          content="I architect AI systems that replace manual workflows. Specialized in n8n, Vapi, and LLM automation."
        />
      </Helmet>

      <FluidBackground />
      <LandingHeader />

      <main>
        <HeroSection />
        <UseCasesSection />
        <ServicesSection />
        <VoiceBotSection />
        <ProcessSection />
        <AboutSection />
        <PricingSection />
        <LandingContactSection />
      </main>

      <LandingFooter />
    </>
  );
};

export default Index;
