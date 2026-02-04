import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Users, TrendingUp, MessageSquare, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalLeads: number;
  newLeadsToday: number;
  totalConversations: number;
  hotLeads: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeadsToday: 0,
    totalConversations: 0,
    hotLeads: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [leadsResult, todayLeadsResult, conversationsResult, hotLeadsResult] =
          await Promise.all([
            supabase.from("leads").select("id", { count: "exact", head: true }),
            supabase
              .from("leads")
              .select("id", { count: "exact", head: true })
              .gte("created_at", today.toISOString()),
            supabase
              .from("voice_conversations")
              .select("id", { count: "exact", head: true }),
            supabase
              .from("leads")
              .select("id", { count: "exact", head: true })
              .eq("priority", "high"),
          ]);

        setStats({
          totalLeads: leadsResult.count || 0,
          newLeadsToday: todayLeadsResult.count || 0,
          totalConversations: conversationsResult.count || 0,
          hotLeads: hotLeadsResult.count || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "New Today",
      value: stats.newLeadsToday,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Conversations",
      value: stats.totalConversations,
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      title: "Hot Leads",
      value: stats.hotLeads,
      icon: Activity,
      color: "text-red-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin | ROYSCOMPANY</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div>
        {/* Header */}
        <div className="mb-8">
          <p className="text-primary font-mono text-sm mb-1">// DASHBOARD</p>
          <h1 className="font-display text-3xl tracking-tight text-foreground">
            SYSTEM <span className="text-primary">OVERVIEW</span>
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-muted/50 bg-card/50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-[10px] font-mono text-muted-foreground">
                  METRIC
                </span>
              </div>
              <p className="text-3xl font-display text-foreground mb-1">
                {isLoading ? "..." : stat.value.toLocaleString()}
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border border-muted/50 bg-card/50 p-6">
          <p className="text-xs font-mono text-primary mb-4">// QUICK_ACTIONS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a
              href="/admin/leads"
              className="p-4 border border-muted/50 hover:border-primary/50 transition-colors text-center"
            >
              <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-xs font-mono">View Leads</p>
            </a>
            <a
              href="/admin/leads?status=new"
              className="p-4 border border-muted/50 hover:border-primary/50 transition-colors text-center"
            >
              <TrendingUp className="h-5 w-5 mx-auto mb-2 text-green-500" />
              <p className="text-xs font-mono">New Leads</p>
            </a>
            <a
              href="/admin/conversations"
              className="p-4 border border-muted/50 hover:border-primary/50 transition-colors text-center"
            >
              <MessageSquare className="h-5 w-5 mx-auto mb-2 text-blue-500" />
              <p className="text-xs font-mono">Conversations</p>
            </a>
            <a
              href="/admin/leads?priority=high"
              className="p-4 border border-muted/50 hover:border-primary/50 transition-colors text-center"
            >
              <Activity className="h-5 w-5 mx-auto mb-2 text-red-500" />
              <p className="text-xs font-mono">Hot Leads</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
