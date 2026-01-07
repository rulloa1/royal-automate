import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import Leads from "./pages/Leads";
import ChatbotDevelopment from "./pages/services/ChatbotDevelopment";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Activation from "./pages/Activation";
import PropertyPage from "./pages/PropertyPage";
import { VisualEffects } from "@/components/ui/VisualEffects";
import { PreviewWatermark } from "@/components/ui/PreviewWatermark";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <VisualEffects />
        <PreviewWatermark />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/services/chatbot-development" element={<ChatbotDevelopment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/activation" element={<Activation />} />
            <Route path="/property/:slug" element={<PropertyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
