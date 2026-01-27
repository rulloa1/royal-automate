import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Phone, Check, Sparkles, Loader2, MessageSquare, Globe } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

// Base schema for shared fields
const baseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// Schema for "Call" mode
const callSchema = baseSchema.extend({
  type: z.literal("call"),
  phone: z.string().min(10, "Valid phone number required"),
  // Email and message are optional/allowed in call mode but not required
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  message: z.string().optional(),
});

// Schema for "Message" mode
const messageSchema = baseSchema.extend({
  type: z.literal("message"),
  // Phone is optional in message mode
  phone: z.string().optional(),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Discriminated Union
const formSchema = z.discriminatedUnion("type", [callSchema, messageSchema]);

type FormValues = z.infer<typeof formSchema>;

const LeadForm = () => {
  const [activeTab, setActiveTab] = useState<"call" | "message">("call");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "call",
      name: "",
      phone: "",
      email: "",
      message: "",
      url: "",
    },
    mode: "onChange", // Real-time validation
  });

  // Sync activeTab with form value
  const handleTabChange = (tab: "call" | "message") => {
    setActiveTab(tab);
    form.setValue("type", tab);
    form.clearErrors(); // Clear errors when switching modes
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Insert lead via Edge Function (backend-only access)
      const { data: leadData, error: dbError } = await supabase.functions.invoke("create-lead", {
        body: {
          contact_name: values.name,
          phone: values.phone || null,
          email: values.email || null,
          pain_points: values.message || null,
          source: values.type === "call" ? "lead_form_call" : "lead_form_message",
          interests: values.url ? ["website_url:" + values.url] : [],
          priority: "high",
        },
      });

      if (dbError) throw dbError;

      // Send email notification via Resend
      const { error: emailError } = await supabase.functions.invoke("notify-new-lead", {
        body: {
          leadName: values.name,
          email: values.email || "not-provided@placeholder.com",
          phone: values.phone,
          selectedPackage: values.type === "call" ? "Instant Callback Request" : "Message Inquiry",
          projectDetails: values.message,
          source: values.type === "call" ? "Lead Form - Call" : "Lead Form - Message",
        },
      });

      if (emailError) {
        console.warn("Email notification failed:", emailError);
        // Don't throw - lead is saved, just notify user
      }

      toast.success(
        values.type === "call"
          ? "Request received! Expect a call shortly."
          : "Message sent! We'll get back to you ASAP."
      );
      
      form.reset({
        type: activeTab,
        name: "",
        phone: "",
        email: "",
        message: "",
        url: "",
      });

    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            : "Prefer to chat? Leave a detailed message and our team will follow up via email."}
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-secondary/50 rounded-xl border border-white/5 mb-8">
        <button
          type="button"
          onClick={() => handleTabChange("call")}
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
          onClick={() => handleTabChange("message")}
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-condensed tracking-wider uppercase text-muted-foreground">
                  Full Name <span className="text-accent">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-secondary/30 border-white/10 focus:border-primary/50" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {activeTab === "call" ? (
            <>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-condensed tracking-wider uppercase text-muted-foreground">
                      Phone Number <span className="text-accent">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 (555) 000-0000" 
                        type="tel"
                        className="bg-secondary/30 border-white/10 focus:border-primary/50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-condensed tracking-wider uppercase text-muted-foreground">
                      Website URL (Optional)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="https://example.com" 
                          className="pl-9 bg-secondary/30 border-white/10 focus:border-primary/50" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-condensed tracking-wider uppercase text-muted-foreground">
                      Email Address <span className="text-accent">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john@example.com" 
                        type="email"
                        className="bg-secondary/30 border-white/10 focus:border-primary/50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-condensed tracking-wider uppercase text-muted-foreground">
                      Message <span className="text-accent">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your project..." 
                        className="min-h-[100px] bg-secondary/30 border-white/10 focus:border-primary/50 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full gradient-button py-6 text-base font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                {activeTab === "call" ? <Phone className="w-5 h-5 mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                {activeTab === "call" ? "Request Instant Call" : "Send Message"}
              </>
            )}
          </Button>

          {activeTab === "call" && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-3 text-blue-200/80 text-xs">
              <Check className="w-4 h-4 shrink-0 mt-0.5" />
              <p>This triggers a real call from our A.I. immediately. Please have your phone ready.</p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default LeadForm;
