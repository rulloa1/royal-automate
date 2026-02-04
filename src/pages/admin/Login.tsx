import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        toast.error("You don't have admin access");
      }
    }
  }, [user, isLoading, isAdmin, navigate]);

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });

    if (error) {
      toast.error("Failed to sign in with Google");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | ROYSCOMPANY</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-primary font-mono text-sm mb-2">// ADMIN_ACCESS</p>
            <h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">
              CONTROL<span className="text-primary">PANEL</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Login Card */}
          <div className="border border-muted/50 bg-card/50 backdrop-blur-sm p-8">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 bg-background border border-muted/50 hover:border-primary/50 transition-colors flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-mono text-sm group-hover:text-primary transition-colors">
                Sign in with Google
              </span>
            </button>

            <p className="text-xs text-muted-foreground text-center mt-6 font-mono">
              Admin access required. Contact system administrator if you need access.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
