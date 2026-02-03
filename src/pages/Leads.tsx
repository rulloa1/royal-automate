import { Helmet } from "react-helmet-async";
import LeadForm from "@/components/LeadForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { RelevanceAIChat } from "@/components/RelevanceAIChat";

const Leads = () => {
  return (
    <>
      <Helmet>
        <title>Lead Capture | RoysCompany</title>
        <meta name="description" content="Internal lead capture form for RoysCompany team." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 mb-6">
              <span className="text-sm font-condensed font-medium tracking-wider uppercase text-primary">
                Internal Tool
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Lead <span className="gradient-text">Capture</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Quickly add new leads to the pipeline.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-xl mx-auto">
            <LeadForm />
          </div>
        </div>

        {/* AI Chat Widget - Admin only */}
        <RelevanceAIChat />
      </div>
    </>
  );
};

export default Leads;
