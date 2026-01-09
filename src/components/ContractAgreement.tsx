import { useState } from "react";
import { Check, FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ContractAgreementProps {
  clientName: string;
  onSigned: () => void;
}

const ContractAgreement = ({ clientName, onSigned }: ContractAgreementProps) => {
  const [isSigning, setIsSigning] = useState(false);
  const [hasScrollToBottom, setHasScrollToBottom] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom) {
      setHasScrollToBottom(true);
    }
  };

  const handleSign = async () => {
    setIsSigning(true);
    // Simulate API call to generate/sign PDF
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSigned(true);
    setIsSigning(false);
    toast.success("Contract signed successfully");
    onSigned();
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="border border-white/10 rounded-lg bg-black/40 overflow-hidden">
        <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Master Services Agreement</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-2">
            <Download className="w-3 h-3" />
            Download PDF
          </Button>
        </div>
        
        <ScrollArea 
          className="h-[400px] w-full p-6 text-sm text-muted-foreground leading-relaxed" 
          onScroll={handleScroll as any}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground text-center mb-6">MASTER SERVICES AGREEMENT</h3>
            
            <p><strong>Effective Date:</strong> {currentDate}</p>
            <p><strong>Between:</strong> RoysCompany ("Provider") AND {clientName || "[Client Name]"} ("Client")</p>

            <h4 className="font-bold text-foreground mt-4">1. SERVICES</h4>
            <p>Provider agrees to perform the services described in the specific Statement of Work ("SOW") or Order Form. Services may include AI automation development, website design, and lead generation systems.</p>

            <h4 className="font-bold text-foreground mt-4">2. PAYMENT TERMS</h4>
            <p>Client agrees to pay the fees set forth in the applicable Order Form. Unless otherwise stated, all fees are non-refundable. Recurring services are billed in advance on a monthly basis.</p>

            <h4 className="font-bold text-foreground mt-4">3. INTELLECTUAL PROPERTY</h4>
            <p>Upon full payment, Client shall own all rights, title, and interest in the deliverables created specifically for Client. Provider retains all rights to its pre-existing background technology, tools, and frameworks.</p>

            <h4 className="font-bold text-foreground mt-4">4. CONFIDENTIALITY</h4>
            <p>Both parties agree to keep confidential all non-public information disclosed by the other party. This includes business strategies, technical data, and customer lists.</p>

            <h4 className="font-bold text-foreground mt-4">5. WARRANTY & DISCLAIMER</h4>
            <p>Provider warrants that services will be performed in a professional manner. EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.</p>

            <h4 className="font-bold text-foreground mt-4">6. LIMITATION OF LIABILITY</h4>
            <p>IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES. PROVIDER'S TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY CLIENT IN THE 3 MONTHS PRECEDING THE CLAIM.</p>

            <h4 className="font-bold text-foreground mt-4">7. TERM & TERMINATION</h4>
            <p>This Agreement commences on the Effective Date and continues until terminated. Either party may terminate for convenience with 30 days written notice, subject to any minimum terms in the Order Form.</p>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-wider mb-2">Electronic Signature</p>
              <p>By clicking "Accept & Sign", you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement.</p>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSigned ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
            {isSigned && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-muted-foreground">
            I agree to the Terms of Service and Privacy Policy
          </span>
        </div>
        
        <Button 
          onClick={handleSign} 
          disabled={isSigning || isSigned || !clientName}
          className={isSigned ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isSigning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing...
            </>
          ) : isSigned ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Signed
            </>
          ) : (
            "Accept & Sign"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ContractAgreement;
