import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Royal AI Solutions | Premium Automation & Lead Generation</title>
        <meta
          name="description"
          content="Transform your business with enterprise-grade websites, intelligent lead generation, and powerful AI automation systems. Built for businesses ready to scale."
        />
        <meta
          name="keywords"
          content="AI automation, lead generation, business automation, website design, CRM integration, chatbot"
        />
        <meta property="og:title" content="Royal AI Solutions | Automate Your Growth" />
        <meta
          property="og:description"
          content="Enterprise-grade automation solutions for modern businesses. AI-powered lead generation, automated workflows, and premium web design."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://royalsolutions.me" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <PricingSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;
