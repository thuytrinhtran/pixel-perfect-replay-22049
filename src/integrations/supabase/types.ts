export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      ai_suggestions: {
        Row: {
          created_at: string
          id: string
          input_hash: string | null
          model_name: string | null
          output_json: Json
          prompt_text: string | null
          schedule_version_id: string
          validation_status: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_hash?: string | null
          model_name?: string | null
          output_json?: Json
          prompt_text?: string | null
          schedule_version_id: string
          validation_status?: string
        }
        Update: {
          created_at?: string
          id?: string
          input_hash?: string | null
          model_name?: string | null
          output_json?: Json
          prompt_text?: string | null
          schedule_version_id?: string
          validation_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_suggestions_schedule_version_id_fkey"
            columns: ["schedule_version_id"]
            isOneToOne: false
            referencedRelation: "schedule_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_requests: {
        Row: {
          comment: string | null
          decided_at: string | null
          decision: Database["public"]["Enums"]["decision_status"]
          id: string
          requested_at: string
          reviewer_id: string
          schedule_version_id: string
        }
        Insert: {
          comment?: string | null
          decided_at?: string | null
          decision?: Database["public"]["Enums"]["decision_status"]
          id?: string
          requested_at?: string
          reviewer_id: string
          schedule_version_id: string
        }
        Update: {
          comment?: string | null
          decided_at?: string | null
          decision?: Database["public"]["Enums"]["decision_status"]
          id?: string
          requested_at?: string
          reviewer_id?: string
          schedule_version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_requests_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_requests_schedule_version_id_fkey"
            columns: ["schedule_version_id"]
            isOneToOne: false
            referencedRelation: "schedule_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          after_json: Json | null
          at: string
          before_json: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_json?: Json | null
          at?: string
          before_json?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_json?: Json | null
          at?: string
          before_json?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          active: boolean
          address: string | null
          code: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          address?: string | null
          code: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          address?: string | null
          code?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          code: string
          id: string
          name: string
        }
        Insert: {
          code: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      incidents: {
        Row: {
          assignment_id: string
          id: string
          occurred_at: string
          reason: string
          reported_by: string
          status: Database["public"]["Enums"]["request_status"]
        }
        Insert: {
          assignment_id: string
          id?: string
          occurred_at?: string
          reason: string
          reported_by: string
          status?: Database["public"]["Enums"]["request_status"]
        }
        Update: {
          assignment_id?: string
          id?: string
          occurred_at?: string
          reason?: string
          reported_by?: string
          status?: Database["public"]["Enums"]["request_status"]
        }
        Relationships: [
          {
            foreignKeyName: "incidents_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "schedule_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          dedupe_key: string | null
          id: string
          payload_json: Json
          read_at: string | null
          recipient_id: string
          sent_at: string | null
          status: string
          title: string
          type: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          dedupe_key?: string | null
          id?: string
          payload_json?: Json
          read_at?: string | null
          recipient_id: string
          sent_at?: string | null
          status?: string
          title: string
          type: string
        }
        Update: {
          body?: string | null
          created_at?: string
          dedupe_key?: string | null
          id?: string
          payload_json?: Json
          read_at?: string | null
          recipient_id?: string
          sent_at?: string | null
          status?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean
          branch_id: string | null
          created_at: string
          department_id: string | null
          employee_code: string
          full_name: string
          id: string
          max_hours_week: number | null
          role: Database["public"]["Enums"]["app_role"]
          skill_level: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          branch_id?: string | null
          created_at?: string
          department_id?: string | null
          employee_code: string
          full_name: string
          id: string
          max_hours_week?: number | null
          role: Database["public"]["Enums"]["app_role"]
          skill_level?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          branch_id?: string | null
          created_at?: string
          department_id?: string | null
          employee_code?: string
          full_name?: string
          id?: string
          max_hours_week?: number | null
          role?: Database["public"]["Enums"]["app_role"]
          skill_level?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      registration_periods: {
        Row: {
          branch_id: string
          closes_at: string
          created_at: string
          id: string
          opens_at: string
          status: Database["public"]["Enums"]["period_status"]
          work_week_start: string
        }
        Insert: {
          branch_id: string
          closes_at: string
          created_at?: string
          id?: string
          opens_at: string
          status?: Database["public"]["Enums"]["period_status"]
          work_week_start: string
        }
        Update: {
          branch_id?: string
          closes_at?: string
          created_at?: string
          id?: string
          opens_at?: string
          status?: Database["public"]["Enums"]["period_status"]
          work_week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "registration_periods_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      replacement_offers: {
        Row: {
          created_at: string
          employee_id: string
          expires_at: string | null
          id: string
          incident_id: string | null
          responded_at: string | null
          status: Database["public"]["Enums"]["offer_status"]
          swap_request_id: string | null
        }
        Insert: {
          created_at?: string
          employee_id: string
          expires_at?: string | null
          id?: string
          incident_id?: string | null
          responded_at?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          swap_request_id?: string | null
        }
        Update: {
          created_at?: string
          employee_id?: string
          expires_at?: string | null
          id?: string
          incident_id?: string | null
          responded_at?: string | null
          status?: Database["public"]["Enums"]["offer_status"]
          swap_request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replacement_offers_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replacement_offers_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replacement_offers_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: false
            referencedRelation: "swap_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_forecasts: {
        Row: {
          branch_id: string
          created_at: string
          entered_by: string | null
          forecast_amount: number
          id: string
          note: string | null
          work_date: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          entered_by?: string | null
          forecast_amount: number
          id?: string
          note?: string | null
          work_date: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          entered_by?: string | null
          forecast_amount?: number
          id?: string
          note?: string | null
          work_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_forecasts_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_forecasts_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_assignments: {
        Row: {
          assignment_status: string
          created_at: string
          department_id: string
          employee_id: string
          id: string
          schedule_version_id: string
          shift_template_id: string
          work_date: string
        }
        Insert: {
          assignment_status?: string
          created_at?: string
          department_id: string
          employee_id: string
          id?: string
          schedule_version_id: string
          shift_template_id: string
          work_date: string
        }
        Update: {
          assignment_status?: string
          created_at?: string
          department_id?: string
          employee_id?: string
          id?: string
          schedule_version_id?: string
          shift_template_id?: string
          work_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_assignments_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_assignments_schedule_version_id_fkey"
            columns: ["schedule_version_id"]
            isOneToOne: false
            referencedRelation: "schedule_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_assignments_shift_template_id_fkey"
            columns: ["shift_template_id"]
            isOneToOne: false
            referencedRelation: "shift_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_confirmations: {
        Row: {
          due_at: string
          employee_id: string
          id: string
          responded_at: string | null
          schedule_version_id: string
          status: string
        }
        Insert: {
          due_at: string
          employee_id: string
          id?: string
          responded_at?: string | null
          schedule_version_id: string
          status?: string
        }
        Update: {
          due_at?: string
          employee_id?: string
          id?: string
          responded_at?: string | null
          schedule_version_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_confirmations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_confirmations_schedule_version_id_fkey"
            columns: ["schedule_version_id"]
            isOneToOne: false
            referencedRelation: "schedule_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_versions: {
        Row: {
          approved_at: string | null
          branch_id: string
          created_at: string
          created_by: string | null
          id: string
          period_id: string
          published_at: string | null
          status: Database["public"]["Enums"]["schedule_status"]
          submitted_at: string | null
          version_no: number
        }
        Insert: {
          approved_at?: string | null
          branch_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          period_id: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["schedule_status"]
          submitted_at?: string | null
          version_no: number
        }
        Update: {
          approved_at?: string | null
          branch_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          period_id?: string
          published_at?: string | null
          status?: Database["public"]["Enums"]["schedule_status"]
          submitted_at?: string | null
          version_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "schedule_versions_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_versions_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "registration_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_preferences: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          period_id: string
          shift_template_id: string
          status: string
          submitted_at: string | null
          work_date: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          period_id: string
          shift_template_id: string
          status?: string
          submitted_at?: string | null
          work_date: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          period_id?: string
          shift_template_id?: string
          status?: string
          submitted_at?: string | null
          work_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_preferences_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_preferences_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "registration_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_preferences_shift_template_id_fkey"
            columns: ["shift_template_id"]
            isOneToOne: false
            referencedRelation: "shift_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_templates: {
        Row: {
          active: boolean
          code: string
          end_time: string
          id: string
          name: string
          start_time: string
        }
        Insert: {
          active?: boolean
          code: string
          end_time: string
          id?: string
          name: string
          start_time: string
        }
        Update: {
          active?: boolean
          code?: string
          end_time?: string
          id?: string
          name?: string
          start_time?: string
        }
        Relationships: []
      }
      staffing_requirements: {
        Row: {
          branch_id: string
          department_id: string
          forecast_note: string | null
          id: string
          required_count: number
          set_by: string | null
          shift_template_id: string
          updated_at: string
          work_date: string
        }
        Insert: {
          branch_id: string
          department_id: string
          forecast_note?: string | null
          id?: string
          required_count: number
          set_by?: string | null
          shift_template_id: string
          updated_at?: string
          work_date: string
        }
        Update: {
          branch_id?: string
          department_id?: string
          forecast_note?: string | null
          id?: string
          required_count?: number
          set_by?: string | null
          shift_template_id?: string
          updated_at?: string
          work_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "staffing_requirements_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staffing_requirements_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staffing_requirements_set_by_fkey"
            columns: ["set_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staffing_requirements_shift_template_id_fkey"
            columns: ["shift_template_id"]
            isOneToOne: false
            referencedRelation: "shift_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      supervisor_branches: {
        Row: {
          branch_id: string
          supervisor_id: string
        }
        Insert: {
          branch_id: string
          supervisor_id: string
        }
        Update: {
          branch_id?: string
          supervisor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supervisor_branches_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supervisor_branches_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      swap_requests: {
        Row: {
          assignment_id: string
          created_at: string
          decided_at: string | null
          decided_by: string | null
          id: string
          reason: string
          requested_by: string
          status: Database["public"]["Enums"]["request_status"]
        }
        Insert: {
          assignment_id: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          id?: string
          reason: string
          requested_by: string
          status?: Database["public"]["Enums"]["request_status"]
        }
        Update: {
          assignment_id?: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          id?: string
          reason?: string
          requested_by?: string
          status?: Database["public"]["Enums"]["request_status"]
        }
        Relationships: [
          {
            foreignKeyName: "swap_requests_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "schedule_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_decided_by_fkey"
            columns: ["decided_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_branch: { Args: { target_branch: string }; Returns: boolean }
      current_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      is_manager_for: { Args: { target_branch: string }; Returns: boolean }
      is_supervisor_for: { Args: { target_branch: string }; Returns: boolean }
      my_branch: { Args: never; Returns: string }
    }
    Enums: {
      app_role: "EMPLOYEE" | "MANAGER" | "SUPERVISOR"
      decision_status: "PENDING" | "APPROVED" | "REVISION_REQUESTED"
      offer_status: "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED"
      period_status: "DRAFT" | "OPEN" | "CLOSED"
      request_status:
        | "PENDING"
        | "OFFERING"
        | "CANDIDATE_ACCEPTED"
        | "MANAGER_APPROVED"
        | "REJECTED"
        | "APPLIED"
        | "CANCELLED"
        | "EXPIRED"
      schedule_status:
        | "DRAFT"
        | "SUBMITTED"
        | "REVISION_REQUESTED"
        | "APPROVED"
        | "PUBLISHED"
        | "ARCHIVED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["EMPLOYEE", "MANAGER", "SUPERVISOR"],
      decision_status: ["PENDING", "APPROVED", "REVISION_REQUESTED"],
      offer_status: ["PENDING", "ACCEPTED", "DECLINED", "EXPIRED"],
      period_status: ["DRAFT", "OPEN", "CLOSED"],
      request_status: [
        "PENDING",
        "OFFERING",
        "CANDIDATE_ACCEPTED",
        "MANAGER_APPROVED",
        "REJECTED",
        "APPLIED",
        "CANCELLED",
        "EXPIRED",
      ],
      schedule_status: [
        "DRAFT",
        "SUBMITTED",
        "REVISION_REQUESTED",
        "APPROVED",
        "PUBLISHED",
        "ARCHIVED",
      ],
    },
  },
} as const
