import { useState } from "react";
import { Mail, Phone, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LeadFixContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    industry: "Roofing",
    callVolume: "0 - 50",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("create-lead", {
        body: {
          business_name: formData.company,
          contact_name: formData.name,
          source: "leadfix-landing",
          interests: [formData.industry],
          pain_points: `Call Volume: ${formData.callVolume}`,
        },
      });

      if (error) throw error;

      toast.success("Demo scheduled! We'll be in touch soon.");
      setFormData({ name: "", company: "", industry: "Roofing", callVolume: "0 - 50" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 border border-neutral-800">
            {/* Left Column - Info */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Book a<br />Discovery Call
              </h2>
              <p className="text-neutral-400">
                Ready to automate your front desk? See if your business qualifies for Lead Fix AI deployment.
              </p>

              <div className="space-y-4 pt-4">
                <a
                  href="mailto:growth@leadfix.ai"
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#F95500]" />
                  growth@leadfix.ai
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#F95500]" />
                  (555) 123-4567
                </a>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Users className="w-4 h-4 text-[#F95500]" />
                <span className="text-neutral-400 text-sm">
                  Onboarding 3 new partners this week
                </span>
              </div>
            </div>

            {/* Right Column - Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#F95500]/50 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-sm mb-2">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#F95500]/50 transition-colors"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#F95500]/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="Roofing">Roofing</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Other Contractor">Other Contractor</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Monthly Call Volume</label>
                <select
                  value={formData.callVolume}
                  onChange={(e) => setFormData({ ...formData, callVolume: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#F95500]/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="0 - 50">0 - 50</option>
                  <option value="50 - 200">50 - 200</option>
                  <option value="200+">200+</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#F95500] text-white font-medium rounded-xl hover:bg-[#FF6B1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Scheduling..." : "Schedule Demo"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadFixContact;
