import { useState } from "react";
import { Send, Phone, Check, Sparkles, Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const LeadForm = () => {
  const [activeTab, setActiveTab] = useState<"call" | "message">("call");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    url: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === "call") {
        // Voice Caller Webhook
        const response = await fetch(
          "https://ulloarory.app.n8n.cloud/webhook/call-lead",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) throw new Error("Connection failed");
        toast.success("Request received! Expect a call shortly.");
      } else {
        // Message Webhook logic
        try {
          await fetch("https://ulloarory.app.n8n.cloud/webhook/message-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        } catch (e) {
          // Ignore error if hook doesn't exist yet
        }
        toast.success("Message sent! We'll get back to you ASAP.");
      }

      setFormData({ name: "", phone: "", email: "", message: "", url: "" });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-10 w-full max-w-xl mx-auto animate-fade-up">
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 mb-3 text-primary bg-primary/10 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4" />
          <span className="font-condensed font-medium tracking-wider uppercase text-xs">AI Agent</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
          {activeTab === "call" ? "Get an Instant Callback" : "Send us a Message"}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {activeTab === "call"
            ? "Enter your details below. Our AI Voice Agent will call you within seconds to qualify your needs."
            : "Prefer to chat? detailed message and our team will follow up via email."}
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-secondary/50 rounded-xl border border-white/5 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("call")}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
            activeTab === "call"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          )}
        >
          <Phone className="w-4 h-4" />
          Instant Call
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("message")}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300",
            activeTab === "message"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          )}
        >
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-secondary/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-neutral-600"
              placeholder="John Doe"
            />
          </div>

          {activeTab === "call" ? (
            <div>
              <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
                Phone Number <span className="text-accent">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-secondary/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-neutral-600"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-neutral-600"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-secondary/30 border border-white/10 rounded-lg px-4 py-3 min-h-[100px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-neutral-600 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-button py-4 flex items-center justify-center gap-2 text-base font-medium group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              {activeTab === "call" ? <Phone className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              <span>{activeTab === "call" ? "Request Instant Call" : "Send Message"}</span>
            </>
          )}
        </button>

        {activeTab === "call" && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-3 text-blue-200/80 text-xs">
            <Check className="w-4 h-4 shrink-0 mt-0.5" />
            <p>This triggers a real call from our A.I. immediately. Please have your phone ready.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LeadForm;
