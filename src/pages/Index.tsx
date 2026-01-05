import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { BlogSection } from "@/components/BlogSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>RoysCompany | Premium Automation & Lead Generation</title>
        <meta
          name="description"
          content="Transform your business with enterprise-grade websites, intelligent lead generation, and powered by RoysCompany automation systems."
        />
        <meta
          name="keywords"
          content="AI automation, lead generation, business automation, website design, CRM integration, chatbot"
        />
        <meta property="og:title" content="RoysCompany | Automate Your Growth" />
        <meta
          property="og:description"
          content="Enterprise-grade automation solutions for modern businesses. AI-powered lead generation, automated workflows, and premium web design."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.royscompany.com/" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://royscompany.com/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <BlogSection />
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
