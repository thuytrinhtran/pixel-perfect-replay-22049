import type { LucideIcon } from "lucide-react";

export type Role = "employee" | "manager" | "supervisor";

export interface NavItem {
  /** URL segment under /{role}/. Empty string = dashboard. */
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface RoleConfig {
  role: Role;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  nav: NavItem[];
}
