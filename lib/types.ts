// Lead Status Types
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type LeadPriority = "high" | "medium" | "low";

// Lead Interface
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo: string;
  assignedToAvatar?: string;
  createdAt: Date;
  lastActivity: Date;
  notes?: string;
}

// Metric Card Interface
export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  trend: "up" | "down" | "neutral";
}

// Kanban Column Interface
export interface KanbanColumn {
  id: string;
  title: string;
  status: LeadStatus;
  leads: Lead[];
}
