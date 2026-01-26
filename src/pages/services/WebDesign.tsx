import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, Palette, Globe, Zap, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import FluidBackground from "@/components/landing/FluidBackground";

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  projectDetails: string;
  selectedPackage: string;
}

const WebDesign = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    projectDetails: "",
    selectedPackage: "",
  });

  const packages = [
    {
      name: "Starter",
      price: "$1,500",
      description: "Perfect for small businesses & startups",
      features: [
        "5-Page Custom Website",
        "Mobile Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
        "Google Analytics",
        "SSL Certificate",
        "7-Day Delivery",
        "30 Days Support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$3,500",
      description: "For growing businesses that need more",
      features: [
        "10-Page Custom Website",
        "Advanced Animations",
        "Full SEO Optimization",
        "Lead Capture Forms",
        "CRM Integration",
        "Blog Setup",
        "Social Media Links",
        "14-Day Delivery",
        "60 Days Support",
        "2 Revision Rounds",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$7,500",
      description: "Complete digital presence solution",
      features: [
        "Unlimited Pages",
        "Custom Animations & Effects",
        "E-commerce Ready",
        "AI Chatbot Integration",
        "Advanced Lead Generation",
        "Multi-language Support",
        "Performance Optimization",
        "Priority 24/7 Support",
        "Unlimited Revisions",
        "Ongoing Maintenance",
      ],
      popular: false,
    },
  ];

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    setFormData({ ...formData, selectedPackage: packageName });
    setShowLeadForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        session_id: `web_design_${Date.now()}`,
        contact_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        business_name: formData.businessName,
        interests: ["web_design", formData.selectedPackage],
        pain_points: formData.projectDetails,
        source: "web_design_page",
        priority: formData.selectedPackage === "Enterprise" ? "high" : "medium",
        qualification_score: formData.selectedPackage === "Enterprise" ? 80 : 60,
      });

      if (error) throw error;

      toast.success("Thank you! We'll be in touch within 24 hours.");
      setShowLeadForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        projectDetails: "",
        selectedPackage: "",
      });
    } catch (error) {
      console.error("Lead submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Web Design Services | Rory Ulloa</title>
        <meta
          name="description"
          content="Professional web design services starting at $1,500. Mobile-first, SEO-optimized websites delivered in 7 days."
        />
      </Helmet>

      <FluidBackground />
      <LandingHeader />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
            <Palette className="w-4 h-4" />
            <span>Web Design Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
            Websites That Convert
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Professional, high-converting websites designed to capture leads and grow your business.
            Mobile-first, SEO-optimized, delivered fast.
          </p>
          <Button
            size="lg"
            onClick={() => handlePackageSelect("Professional")}
            className="gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </section>

        {/* Features */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: "Custom Design", desc: "Unique designs tailored to your brand" },
              { icon: Globe, title: "SEO Optimized", desc: "Built to rank on Google" },
              { icon: Zap, title: "Fast Delivery", desc: "7-14 day turnaround" },
              { icon: Shield, title: "Secure & Reliable", desc: "SSL, hosting, and backups included" },
            ].map((feature) => (
              <div key={feature.title} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Web Design Packages</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Transparent pricing. No hidden fees. Choose the package that fits your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`glass-card p-8 flex flex-col relative ${
                  pkg.popular ? "border-primary/50" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-medium mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-medium">{pkg.price}</span>
                  <span className="text-muted-foreground ml-2 text-sm">one-time</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handlePackageSelect(pkg.name)}
                  variant={pkg.popular ? "default" : "outline"}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery Call", desc: "We discuss your goals and requirements" },
              { step: "02", title: "Design Phase", desc: "We create mockups for your approval" },
              { step: "03", title: "Development", desc: "We build your website with precision" },
              { step: "04", title: "Launch", desc: "Your website goes live and starts converting" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary font-medium">
                  {item.step}
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 max-w-3xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              Ready to Get Your Dream Website?
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a free consultation and let's discuss how we can help your business grow.
            </p>
            <Button size="lg" onClick={() => handlePackageSelect("Professional")}>
              Start Your Project
            </Button>
          </div>
        </section>
      </main>

      {/* Lead Capture Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowLeadForm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-medium mb-2">Get Your {selectedPackage} Website</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Fill out the form and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Your Company"
                />
              </div>
              <div>
                <Label htmlFor="projectDetails">Tell us about your project</Label>
                <Textarea
                  id="projectDetails"
                  rows={3}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="What kind of website do you need? Any specific features?"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request Quote"}
              </Button>
            </form>
          </div>
        </div>
      )}

      <LandingFooter />
    </>
  );
};

export default WebDesign;