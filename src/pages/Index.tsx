import { useState } from "react";
import { Helmet } from "react-helmet-async";
import BootSequence from "@/components/royscompany/BootSequence";
import RoysHeader from "@/components/royscompany/RoysHeader";
import RoysHero from "@/components/royscompany/RoysHero";
import AboutSection from "@/components/royscompany/AboutSection";
import SystemsSection from "@/components/royscompany/SystemsSection";
import PricingSection from "@/components/royscompany/PricingSection";
import ContactSection from "@/components/royscompany/ContactSection";
import RoysFooter from "@/components/royscompany/RoysFooter";
import { RelevanceAIChat } from "@/components/RelevanceAIChat";

const Index = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      <Helmet>
        <title>ROYSCOMPANY | AI Automation Systems</title>
        <meta
          name="description"
          content="AI automation systems that eliminate busywork and fill pipelines. Neural infrastructure for businesses that refuse to be slowed down by human latency."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Boot Sequence */}
      <BootSequence onComplete={() => setBootComplete(true)} />

      {/* Main Content */}
      {bootComplete && (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <RoysHeader />
          <main>
            <RoysHero />
            <AboutSection />
            <SystemsSection />
            <PricingSection />
            <ContactSection />
          </main>
          <RoysFooter />
          <RelevanceAIChat />
        </div>
      )}
    </>
  );
};

export default Index;
