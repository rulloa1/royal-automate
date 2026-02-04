import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Leads", url: "/admin/leads", icon: Users },
  { title: "Conversations", url: "/admin/conversations", icon: MessageSquare },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar
      className={cn(
        "border-r border-muted/50 bg-card/50 backdrop-blur-sm transition-all duration-300",
        collapsed ? "w-14" : "w-60"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-muted/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs font-bold">
            RC
          </div>
          {!collapsed && (
            <div>
              <p className="font-mono text-xs text-primary">ADMIN</p>
              <p className="font-display text-sm tracking-tight">CONTROL</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] text-muted-foreground">
            {!collapsed && "// NAVIGATION"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                        isActive(item.url)
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-mono text-xs">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-muted/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-mono">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono truncate text-foreground">
                {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          )}
          <button
            onClick={signOut}
            className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
