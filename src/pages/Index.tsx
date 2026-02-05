 import { Helmet } from "react-helmet-async";
 import CreativeHeader from "@/components/landing/CreativeHeader";
 import CreativeHero from "@/components/landing/CreativeHero";
 import ExpertiseSection from "@/components/landing/ExpertiseSection";
 import WorkShowcase from "@/components/landing/WorkShowcase";
 import CreativeAbout from "@/components/landing/CreativeAbout";
 import CreativeContact from "@/components/landing/CreativeContact";
 import CreativeFooter from "@/components/landing/CreativeFooter";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ROYSCOMPANY | AI Automation Systems</title>
         <meta name="description" content="Creative automation studio blending strategy, AI, and technology to build systems that defy convention. Based in Miami, working globally." />
         <meta property="og:title" content="Rory Ulloa | AI Automation Systems" />
         <meta property="og:description" content="Creative automation studio blending strategy, AI, and technology to build systems that defy convention." />
         <meta property="og:image" content="/og-image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </Helmet>

       <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
         <CreativeHeader />
         <main>
           <CreativeHero />
           <ExpertiseSection />
           <WorkShowcase />
           <CreativeAbout />
           <CreativeContact />
         </main>
         <CreativeFooter />
       </div>
    </>
  );
};

export default Index;
