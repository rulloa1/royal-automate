import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  Trash2,
  Edit,
  ChevronDown,
  X,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Lead {
  id: string;
  business_name: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  status: string | null;
  priority: string | null;
  source: string | null;
  pain_points: string | null;
  interests: string[] | null;
  created_at: string | null;
  qualification_score: number | null;
}

export default function LeadsManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [priorityFilter, setPriorityFilter] = useState(
    searchParams.get("priority") || "all"
  );
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, priorityFilter]);

  async function fetchLeads() {
    setIsLoading(true);
    try {
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      if (priorityFilter !== "all") {
        query = query.eq("priority", priorityFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      toast.error("Failed to load leads");
    } finally {
      setIsLoading(false);
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    return (
      lead.business_name?.toLowerCase().includes(query) ||
      lead.contact_name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.phone?.includes(query)
    );
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      setLeads(leads.filter((l) => l.id !== id));
      toast.success("Lead deleted");
    } catch (error) {
      console.error("Failed to delete lead:", error);
      toast.error("Failed to delete lead");
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead({ ...lead });
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingLead) return;
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("leads")
        .update({
          business_name: editingLead.business_name,
          contact_name: editingLead.contact_name,
          email: editingLead.email,
          phone: editingLead.phone,
          status: editingLead.status,
          priority: editingLead.priority,
          pain_points: editingLead.pain_points,
        })
        .eq("id", editingLead.id);

      if (error) throw error;

      setLeads(leads.map((l) => (l.id === editingLead.id ? editingLead : l)));
      setIsEditDialogOpen(false);
      toast.success("Lead updated");
    } catch (error) {
      console.error("Failed to update lead:", error);
      toast.error("Failed to update lead");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    const headers = [
      "Business Name",
      "Contact Name",
      "Email",
      "Phone",
      "Status",
      "Priority",
      "Source",
      "Pain Points",
      "Created At",
    ];
    const rows = filteredLeads.map((lead) => [
      lead.business_name || "",
      lead.contact_name || "",
      lead.email || "",
      lead.phone || "",
      lead.status || "",
      lead.priority || "",
      lead.source || "",
      lead.pain_points?.replace(/,/g, ";") || "",
      lead.created_at ? format(new Date(lead.created_at), "yyyy-MM-dd HH:mm") : "",
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Leads exported");
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400";
      case "qualified":
        return "bg-green-500/20 text-green-400";
      case "lost":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <>
      <Helmet>
        <title>Leads | Admin | ROYSCOMPANY</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-primary font-mono text-sm mb-1">// LEADS</p>
            <h1 className="font-display text-3xl tracking-tight text-foreground">
              LEAD <span className="text-primary">MANAGEMENT</span>
            </h1>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-muted/50 text-sm font-mono focus:outline-none focus:border-primary/50"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setSearchParams((p) => {
                if (v === "all") p.delete("status");
                else p.set("status", v);
                return p;
              });
            }}
          >
            <SelectTrigger className="w-40 font-mono text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={priorityFilter}
            onValueChange={(v) => {
              setPriorityFilter(v);
              setSearchParams((p) => {
                if (v === "all") p.delete("priority");
                else p.set("priority", v);
                return p;
              });
            }}
          >
            <SelectTrigger className="w-40 font-mono text-sm">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border border-muted/50 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-muted/50 bg-muted/20">
                  <th className="text-left p-4 font-mono text-xs text-muted-foreground">
                    BUSINESS
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-muted-foreground">
                    CONTACT
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-muted-foreground">
                    STATUS
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-muted-foreground">
                    PRIORITY
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-muted-foreground">
                    SOURCE
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-muted-foreground">
                    CREATED
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-muted-foreground">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-muted-foreground font-mono text-sm"
                    >
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, index) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-muted/30 hover:bg-muted/10"
                    >
                      <td className="p-4">
                        <p className="text-sm text-foreground">
                          {lead.business_name || "—"}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">
                          {lead.contact_name || "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {lead.email}
                        </p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs font-mono ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {lead.status?.toUpperCase() || "—"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-mono ${getPriorityColor(
                            lead.priority
                          )}`}
                        >
                          {lead.priority?.toUpperCase() || "—"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-muted-foreground font-mono">
                          {lead.source || "—"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-muted-foreground font-mono">
                          {lead.created_at
                            ? format(new Date(lead.created_at), "MMM d, yyyy")
                            : "—"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(lead)}
                            className="p-2 hover:bg-muted/50 rounded text-muted-foreground hover:text-foreground"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        <p className="mt-4 text-xs font-mono text-muted-foreground">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-card border-muted/50">
            <DialogHeader>
              <DialogTitle className="font-display">Edit Lead</DialogTitle>
            </DialogHeader>
            {editingLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-mono">Business Name</Label>
                    <Input
                      value={editingLead.business_name || ""}
                      onChange={(e) =>
                        setEditingLead({
                          ...editingLead,
                          business_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-mono">Contact Name</Label>
                    <Input
                      value={editingLead.contact_name || ""}
                      onChange={(e) =>
                        setEditingLead({
                          ...editingLead,
                          contact_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-mono">Email</Label>
                    <Input
                      type="email"
                      value={editingLead.email || ""}
                      onChange={(e) =>
                        setEditingLead({ ...editingLead, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-mono">Phone</Label>
                    <Input
                      value={editingLead.phone || ""}
                      onChange={(e) =>
                        setEditingLead({ ...editingLead, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-mono">Status</Label>
                    <Select
                      value={editingLead.status || "new"}
                      onValueChange={(v) =>
                        setEditingLead({ ...editingLead, status: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-mono">Priority</Label>
                    <Select
                      value={editingLead.priority || "medium"}
                      onValueChange={(v) =>
                        setEditingLead({ ...editingLead, priority: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-mono">Pain Points</Label>
                  <Textarea
                    value={editingLead.pain_points || ""}
                    onChange={(e) =>
                      setEditingLead({
                        ...editingLead,
                        pain_points: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsEditDialogOpen(false)}
                    className="px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-mono hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
