import { useState } from "react";
import { Mail, Phone, Clock, Check, Send, ArrowUpRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    package: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookData = {
        business_name: formData.company || "",
        email: formData.email,
        phone: "",
        city: "",
        state: "TX",
        source: "website",
        notes: `Name: ${formData.name}, Package: ${formData.package || "Not specified"}, Message: ${formData.message || "No message"}`,
        status: "new"
      };

      const { error } = await supabase.functions.invoke("submit-contact", {
        body: webhookData,
      });

      if (error) {
        throw new Error(error.message || "Failed to submit form");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", package: "", message: "" });
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@royalsolutions.me",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "346-298-5038",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
    },
  ];

  return (
    <section id="contact" className="py-28 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
            <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 mb-6">
              <span className="text-sm font-condensed font-medium tracking-wider uppercase text-primary">Get In Touch</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Start Your{" "}
              <span className="gradient-text">Transformation</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Ready to transform your business with AI automation? Let's discuss how
              we can help you scale and dominate your market.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="glass-card-hover p-5 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-condensed tracking-wider uppercase text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className={`glass-card p-8 lg:p-10 ${
              isVisible ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-8">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                <p className="text-muted-foreground text-lg">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
                      Package Interest
                    </label>
                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
                    >
                      <option value="">Select a package</option>
                      <option value="foundation">Foundation Package</option>
                      <option value="growth">Growth Engine</option>
                      <option value="consultation">Free Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none text-foreground"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-button py-4 flex items-center justify-center gap-3 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  {!isSubmitting && (
                    <ArrowUpRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
