import { useState } from "react";
import { Clock, Check, Send, ArrowRight } from "lucide-react";
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
      const { error } = await supabase.functions.invoke("lead-qualifier", {
        body: {
          business_name: formData.company,
          email: formData.email,
          phone: "",
          city: "",
          state: "TX",
          notes: `Name: ${formData.name}, Package: ${formData.package || "Not specified"}, Message: ${formData.message || "No message"}`,
          source: "website",
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", package: "", message: "" });
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
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

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left: Contact Info */}
          <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Get In Touch</p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Start Your Transformation
            </h2>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Ready to transform your business with AI automation? Let's discuss how
              we can help you scale and dominate your market.
            </p>

            <div className="glass-card p-5 flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Response Time</p>
                <p className="font-medium">Within 24 hours</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              An affiliate of <a href="https://www.royscompany.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">www.royscompany.com</a>
            </p>
          </div>

          {/* Right: Contact Form */}
          <div
            className={`glass-card p-8 ${isVisible ? "animate-slide-in-right animation-delay-200" : "opacity-0"
              }`}
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-medium mb-3">Message Sent!</h3>
                <p className="text-muted-foreground">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">
                      Full Name <span className="text-foreground">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30 transition-colors text-foreground text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">
                      Email <span className="text-foreground">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30 transition-colors text-foreground text-sm"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30 transition-colors text-foreground text-sm"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">
                      Package Interest
                    </label>
                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30 transition-colors text-foreground text-sm"
                    >
                      <option value="">Select a package</option>
                      <option value="foundation">Foundation Package</option>
                      <option value="growth">Growth Engine</option>
                      <option value="consultation">Free Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-foreground/30 transition-colors resize-none text-foreground text-sm"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-button py-4 flex items-center justify-center gap-3 text-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  {!isSubmitting && (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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