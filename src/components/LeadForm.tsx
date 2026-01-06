import { useState } from "react";
import { Send, ArrowUpRight, Check, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface WebhookResponse {
  output?: string;
  text?: string;
  [key: string]: any;
}

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      // Call n8n webhook
      // Note: We use the production n8n URL provided by the user.
      const response = await fetch(
        "https://ulloarory.app.n8n.cloud/webhook/analyze-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: WebhookResponse = await response.json();

      // The n8n agent usually returns the text in 'output' or 'text' property
      // depending on the node type (Agent vs LLM Chain).
      // Based on standard LangChain Agent nodes, it's often in 'output'.
      const reportText = data.output || data.text || JSON.stringify(data, null, 2);

      setResult(reportText);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to analyze lead. Make sure n8n is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="glass-card p-8 lg:p-10 animate-fade-up">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold">Analysis Ready</h3>
              <p className="text-muted-foreground text-sm">Target: {url}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none bg-secondary/30 p-6 rounded-lg border border-border overflow-y-auto max-h-[600px]">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                setResult(null);
                setUrl("");
              }}
              className="px-6 py-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              Analyze Another
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                toast.success("Report copied to clipboard!");
              }}
              className="gradient-button px-6 py-2 flex items-center gap-2"
            >
              Copy Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 lg:p-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="font-condensed font-medium tracking-wider uppercase">AI Agent</span>
        </div>
        <h3 className="text-2xl font-display font-bold mb-2">Lead Opportunity Finder</h3>
        <p className="text-muted-foreground">
          Enter a company website URL. Our AI will scrape it, find decision makers, identify pain points, and generate a sales strategy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-condensed tracking-wider uppercase mb-2 text-muted-foreground">
            Target Website URL <span className="text-accent">*</span>
          </label>
          <input
            type="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-foreground"
            placeholder="https://example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-button py-4 flex items-center justify-center gap-3 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Website...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Generate Report</span>
              <ArrowUpRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </button>

        <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 flex gap-3 text-orange-200/80 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Make sure your local n8n Docker container is running on port 5679.</p>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
