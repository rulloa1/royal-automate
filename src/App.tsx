import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { VisualEffects } from "@/components/ui/VisualEffects";
import { Watermark } from "@/components/Watermark";


// Lazy load pages that use Supabase to prevent initialization errors
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Leads = lazy(() => import("./pages/Leads"));
const ChatbotDevelopment = lazy(() => import("./pages/services/ChatbotDevelopment"));
const Automations = lazy(() => import("./pages/services/Automations"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Activation = lazy(() => import("./pages/Activation"));
const PropertyPage = lazy(() => import("./pages/PropertyPage"));
const IndustryTemplate = lazy(() => import("./pages/IndustryTemplate"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <VisualEffects />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/services/chatbot-development" element={<ChatbotDevelopment />} />
              <Route path="/services/automations" element={<Automations />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/template" element={<IndustryTemplate />} />
              <Route path="/activation" element={<Activation />} />
              <Route path="/property/:slug" element={<PropertyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Watermark />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
