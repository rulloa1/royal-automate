import { Helmet } from "react-helmet-async";
import FluidBackground from "@/components/landing/FluidBackground";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ProcessSection from "@/components/landing/ProcessSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import AboutSection from "@/components/landing/AboutSection";
import LandingContactSection from "@/components/landing/LandingContactSection";
import LandingFooter from "@/components/landing/LandingFooter";
import { SalesChatWidget } from "@/components/SalesChatWidget";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rory Ulloa | RoysCompany.com - AI Automation Agency</title>
        <meta
          name="description"
          content="I architect AI systems that replace manual workflows. Specialized in n8n, Vapi, and LLM automation."
        />
        <link rel="canonical" href="https://www.royscompany.com/" />
      </Helmet>

      <SalesChatWidget />
      <FluidBackground />
      <LandingHeader />

      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <UseCasesSection />
        <AboutSection />
        <LandingContactSection />
      </main>

      <LandingFooter />
    </>
  );
};

export default Index;
