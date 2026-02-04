import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { RelevanceAIChat } from "@/components/RelevanceAIChat";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-primary font-mono text-sm mb-2">// ACCESS_DENIED</p>
          <h1 className="font-display text-2xl text-foreground mb-4">
            NO ADMIN <span className="text-primary">ACCESS</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Your account doesn't have admin privileges.
          </p>
          <a
            href="/"
            className="text-primary hover:underline font-mono text-sm"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-muted/50 flex items-center px-4 bg-card/30 backdrop-blur-sm">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
        <RelevanceAIChat />
      </div>
    </SidebarProvider>
  );
}
