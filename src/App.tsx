import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { VisualEffects } from "@/components/ui/VisualEffects";
import { Watermark } from "@/components/Watermark";
import { AdminLayout } from "@/components/admin/AdminLayout";

// Lazy load pages
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Leads = lazy(() => import("./pages/Leads"));
const ChatbotDevelopment = lazy(() => import("./pages/services/ChatbotDevelopment"));
const Automations = lazy(() => import("./pages/services/Automations"));
const WebDesign = lazy(() => import("./pages/services/WebDesign"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Activation = lazy(() => import("./pages/Activation"));
const PropertyPage = lazy(() => import("./pages/PropertyPage"));
const IndustryTemplate = lazy(() => import("./pages/IndustryTemplate"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const LeadsManagement = lazy(() => import("./pages/admin/LeadsManagement"));
const Conversations = lazy(() => import("./pages/admin/Conversations"));
const Settings = lazy(() => import("./pages/admin/Settings"));

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
        <AuthProvider>
          <VisualEffects />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/services/chatbot-development" element={<ChatbotDevelopment />} />
                <Route path="/services/automations" element={<Automations />} />
                <Route path="/services/web-design" element={<WebDesign />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/template" element={<IndustryTemplate />} />
                <Route path="/activation" element={<Activation />} />
                <Route path="/property/:slug" element={<PropertyPage />} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/leads"
                  element={
                    <AdminLayout>
                      <LeadsManagement />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/conversations"
                  element={
                    <AdminLayout>
                      <Conversations />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <AdminLayout>
                      <Settings />
                    </AdminLayout>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Watermark />
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
