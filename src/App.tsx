import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ChatbotDevelopment from "./pages/services/ChatbotDevelopment";

// ... inside Routes
            <Route path="/" element={<Index />} />
            <Route path="/services/chatbot-development" element={<ChatbotDevelopment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/leads" element={<Leads />} />
{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */ }
<Route path="*" element={<NotFound />} />
          </Routes >
        </BrowserRouter >
      </TooltipProvider >
    </QueryClientProvider >
  </HelmetProvider >
);

export default App;
