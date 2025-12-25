import { useState } from "react";
import { Send, ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    city: "",
    state: "TX",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://ulloarory.app.n8n.cloud/webhook/new-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Lead submitted successfully!");
        setFormData({
          business_name: "",
          city: "",
          state: "TX",
          phone: "",
          email: "",
          notes: "",
        });
      } else {
        toast.error("Failed to submit lead. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-8 lg:p-10">
        <div className="h-full flex flex-col items-center justify-center text-center py-16">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-8">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-3xl font-display font-bold mb-4">Lead Submitted!</h3>
          <p className="text-muted-foreground text-lg">
            We'll follow up with you shortly.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-8 text-primary hover:underline"
          >
            Submit another lead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 lg:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
            Business Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            required
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
            placeholder="Business Name"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
              City <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
              placeholder="City"
            />
          </div>

          <div>
            <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
              placeholder="State"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
              placeholder="Phone"
            />
          </div>

          <div>
            <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
              placeholder="Email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none text-foreground"
            placeholder="Additional notes..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-button py-4 flex items-center justify-center gap-3 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span>{isSubmitting ? "Submitting..." : "Submit Lead"}</span>
          <ArrowUpRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
