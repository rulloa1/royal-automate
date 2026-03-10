import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FluidBackground from "@/components/landing/FluidBackground";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import FlowerMenu from "@/components/landing/FlowerMenu";
import ProcessSection from "@/components/landing/ProcessSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import AboutSection from "@/components/landing/AboutSection";
import LandingContactSection from "@/components/landing/LandingContactSection";
import LandingFooter from "@/components/landing/LandingFooter";
import AgeVerification from "@/components/AgeVerification";

const Index = () => {
  const [verified, setVerified] = useState(() => {
    return sessionStorage.getItem("age-verified") === "true";
  });

  const handleVerified = () => {
    sessionStorage.setItem("age-verified", "true");
    setVerified(true);
  };

  return (
    <>
      <Helmet>
        <title>Flava Depot | Premium Cannabis Dispensary</title>
        <meta
          name="description"
          content="Flava Depot — Premium cannabis dispensary. Fresh, lab-tested flower, edibles, concentrates and more. Open Mon-Sat 10AM-8PM, Sun 10AM-5PM."
        />
      </Helmet>

      {!verified && <AgeVerification onVerified={handleVerified} />}

      <FluidBackground />
      <LandingHeader />

      <main>
        <HeroSection />
        <ServicesSection />
        <FlowerMenu />
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
