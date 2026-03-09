import { useState } from "react";
import { Send, Phone, Check, Sparkles, Loader2, MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { z } from "zod";

const callSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  phone: z.string().trim().min(1, "Phone number is required").regex(/^\+?[\d\s\-()]{7,20}$/, "Please enter a valid phone number"),
});

const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
  message: z.string().max(2000, "Message must be under 2000 characters").optional(),
});

type FieldErrors = Record<string, string>;

const LeadForm = () => {
  const [activeTab, setActiveTab] = useState<"call" | "message">("call");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    url: ""
  });

  const validateField = (field: string, value: string) => {
    let schema: z.ZodType;
    if (activeTab === "call") {
      const fieldSchemas: Record<string, z.ZodType> = {
        name: callSchema.shape.name,
        phone: callSchema.shape.phone,
      };
      schema = fieldSchemas[field];
    } else {
      const fieldSchemas: Record<string, z.ZodType> = {
        name: messageSchema.shape.name,
        email: messageSchema.shape.email,
        message: messageSchema.shape.message as z.ZodType,
      };
      schema = fieldSchemas[field];
    }
    if (!schema) return "";
    const result = schema.safeParse(value);
    return result.success ? "" : result.error.errors[0].message;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const schema = activeTab === "call" ? callSchema : messageSchema;
    const dataToValidate = activeTab === "call"
      ? { name: formData.name, phone: formData.phone }
      : { name: formData.name, email: formData.email, message: formData.message };

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      const allTouched: Record<string, boolean> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
        allTouched[field] = true;
      });
      setErrors(fieldErrors);
      setTouched(prev => ({ ...prev, ...allTouched }));
      toast.error("Please fix the errors below.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const webhookUrl = activeTab === "call"
        ? "https://ulloarory.app.n8n.cloud/webhook/call-lead"
        : "https://ulloarory.app.n8n.cloud/webhook/message-lead";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          activeTab === "call"
            ? "Request received! Expect a call shortly."
            : "Message sent! We'll get back to you ASAP."
        );
        setFormData({ name: "", phone: "", email: "", message: "", url: "" });
        setTouched({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error("Network connection failed. Please check your internet.");
      } else {
        toast.error("Failed to connect. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ field }: { field: string }) => {
    if (!errors[field] || !touched[field]) return null;
    return (
      <p className="flex items-center gap-1.5 mt-1.5 text-xs text-destructive animate-fade-in">
        <AlertCircle className="w-3 h-3 shrink-0" />
        {errors[field]}
      </p>
    );
  };

  const inputClass = (field: string) =>
    cn(
      "w-full bg-secondary/30 border rounded-lg px-4 py-3 focus:outline-none transition-all text-foreground placeholder:text-neutral-600",
      errors[field] && touched[field]
        ? "border-destructive/50 focus:border-destructive focus:ring-1 focus:ring-destructive/50"
        : "border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
    );

  return (
    <div className="glass-card p-6 md:p-10 w-full max-w-xl mx-auto fade-in-up">
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
          onClick={() => { setActiveTab("call"); setErrors({}); setTouched({}); }}
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
          onClick={() => { setActiveTab("message"); setErrors({}); setTouched({}); }}
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

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={inputClass("name")}
              placeholder="John Doe"
            />
            <ErrorMessage field="name" />
          </div>

          {activeTab === "call" ? (
            <div>
              <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
                Phone Number <span className="text-accent">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                className={inputClass("phone")}
                placeholder="+1 (555) 000-0000"
              />
              <ErrorMessage field="phone" />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputClass("email")}
                  placeholder="john@example.com"
                />
                <ErrorMessage field="email" />
              </div>
              <div>
                <label className="block text-xs font-condensed tracking-wider uppercase mb-1.5 text-muted-foreground">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={cn(inputClass("message"), "min-h-[100px] resize-none")}
                  placeholder="Tell us about your project..."
                />
                <ErrorMessage field="message" />
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
