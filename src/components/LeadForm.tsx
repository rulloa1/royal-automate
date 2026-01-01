import { useState } from "react";
import { Send, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LeadQualification {
  score: number;
  priority: "high" | "medium" | "low";
  insights: string;
  recommended_action: string;
  tags: string[];
}

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [qualification, setQualification] = useState<LeadQualification | null>(null);
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

  const generateSessionId = () => {
    return `web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setQualification(null);

    const sessionId = generateSessionId();

    try {
      // Step 1: Qualify the lead with AI
      console.log("Qualifying lead...");
      const { data: qualifyData, error: qualifyError } = await supabase.functions.invoke(
        "lead-qualifier",
        {
          body: { formData, sessionId },
        }
      );

      if (qualifyError) {
        console.error("Lead qualification error:", qualifyError);
        // Continue with webhook even if qualification fails
      } else if (qualifyData?.qualification) {
        console.log("Lead qualified:", qualifyData.qualification);
        setQualification(qualifyData.qualification);
      }

      // Step 2: Submit to n8n webhook with qualification data
      const webhookPayload = {
        ...formData,
        qualification: qualifyData?.qualification || null,
        sessionId,
      };

      const response = await fetch(
        "https://ulloarory.app.n8n.cloud/webhook/new-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        const priority = qualifyData?.qualification?.priority;
        if (priority === "high") {
          toast.success("High priority lead submitted!");
        } else {
          toast.success("Lead submitted successfully!");
        }
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
      console.error("Submit error:", error);
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
          
          {qualification && (
            <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border max-w-md">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI Qualification</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  qualification.priority === 'high' 
                    ? 'bg-green-500/20 text-green-400' 
                    : qualification.priority === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {qualification.priority.toUpperCase()} PRIORITY
                </span>
                <span className="text-sm text-muted-foreground">
                  Score: {qualification.score}/100
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{qualification.insights}</p>
            </div>
          )}
          
          <p className="text-muted-foreground text-lg">
            We'll follow up with you shortly.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setQualification(null);
            }}
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
