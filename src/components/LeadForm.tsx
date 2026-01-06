import { useState } from "react";
import { Send, Phone, Check, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    url: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call production n8n webhook for Speed-to-Lead Voice Caller
      const response = await fetch(
        "https://ulloarory.app.n8n.cloud/webhook/call-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      toast.success("Request received! Expect a call shortly.");
      setFormData({ name: "", phone: "", url: "" });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8 lg:p-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="font-condensed font-medium tracking-wider uppercase">AI Agent</span>
        </div>
        <h3 className="text-2xl font-display font-bold mb-2">Get an Instant Callback</h3>
        <p className="text-muted-foreground">
          Enter your details below. Our AI Voice Agent will call you within seconds to qualify your needs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
            Website URL (Optional)
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
            placeholder="https://example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-button py-4 flex items-center justify-center gap-3 text-lg group disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Calling you...</span>
            </>
          ) : (
            <>
              <Phone className="w-5 h-5" />
              <span>Request Call</span>
            </>
          )}
        </button>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-3 text-blue-200/80 text-sm mt-4">
          <Check className="w-5 h-5 shrink-0" />
          <p>This form triggers a real call from Vapi.ai immediately.</p>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
