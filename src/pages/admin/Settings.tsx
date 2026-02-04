import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Settings | Admin | ROYSCOMPANY</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div>
        <div className="mb-8">
          <p className="text-primary font-mono text-sm mb-1">// SETTINGS</p>
          <h1 className="font-display text-3xl tracking-tight text-foreground">
            SYSTEM <span className="text-primary">SETTINGS</span>
          </h1>
        </div>

        <div className="border border-muted/50 bg-card/50 p-6">
          <p className="text-xs font-mono text-primary mb-4">// PROFILE</p>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-mono">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-display text-lg text-foreground">
                {user?.user_metadata?.full_name || "Admin User"}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {user?.email}
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs font-mono">
                ADMIN
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
