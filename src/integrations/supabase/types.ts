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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attorney_profiles: {
        Row: {
          accepting_clients: boolean
          bar_number: string | null
          bio: string | null
          created_at: string
          firm_name: string | null
          headshot_url: string | null
          hourly_rate: number | null
          id: string
          is_verified: boolean
          jurisdictions: string[]
          practice_areas: string[]
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          accepting_clients?: boolean
          bar_number?: string | null
          bio?: string | null
          created_at?: string
          firm_name?: string | null
          headshot_url?: string | null
          hourly_rate?: number | null
          id: string
          is_verified?: boolean
          jurisdictions?: string[]
          practice_areas?: string[]
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          accepting_clients?: boolean
          bar_number?: string | null
          bio?: string | null
          created_at?: string
          firm_name?: string | null
          headshot_url?: string | null
          hourly_rate?: number | null
          id?: string
          is_verified?: boolean
          jurisdictions?: string[]
          practice_areas?: string[]
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      case_matches: {
        Row: {
          attorney_id: string
          case_id: string
          created_at: string
          id: string
          note: string | null
          status: Database["public"]["Enums"]["match_status"]
        }
        Insert: {
          attorney_id: string
          case_id: string
          created_at?: string
          id?: string
          note?: string | null
          status?: Database["public"]["Enums"]["match_status"]
        }
        Update: {
          attorney_id?: string
          case_id?: string
          created_at?: string
          id?: string
          note?: string | null
          status?: Database["public"]["Enums"]["match_status"]
        }
        Relationships: [
          {
            foreignKeyName: "case_matches_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          assigned_attorney_id: string | null
          client_id: string
          created_at: string
          description: string
          id: string
          jurisdiction: string | null
          practice_area: string
          status: Database["public"]["Enums"]["case_status"]
          title: string
          updated_at: string
          urgency: Database["public"]["Enums"]["case_urgency"]
        }
        Insert: {
          assigned_attorney_id?: string | null
          client_id: string
          created_at?: string
          description: string
          id?: string
          jurisdiction?: string | null
          practice_area: string
          status?: Database["public"]["Enums"]["case_status"]
          title: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["case_urgency"]
        }
        Update: {
          assigned_attorney_id?: string | null
          client_id?: string
          created_at?: string
          description?: string
          id?: string
          jurisdiction?: string | null
          practice_area?: string
          status?: Database["public"]["Enums"]["case_status"]
          title?: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["case_urgency"]
        }
        Relationships: []
      }
      earnings: {
        Row: {
          amount: number
          attorney_id: string
          case_id: string | null
          currency: string
          description: string | null
          earned_at: string
          id: string
        }
        Insert: {
          amount: number
          attorney_id: string
          case_id?: string | null
          currency?: string
          description?: string | null
          earned_at?: string
          id?: string
        }
        Update: {
          amount?: number
          attorney_id?: string
          case_id?: string | null
          currency?: string
          description?: string | null
          earned_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "earnings_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          case_id: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          body: string
          case_id: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          body?: string
          case_id?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          external_id: string | null
          id: string
          provider: Database["public"]["Enums"]["subscription_provider"]
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          external_id?: string | null
          id?: string
          provider: Database["public"]["Enums"]["subscription_provider"]
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          external_id?: string | null
          id?: string
          provider?: Database["public"]["Enums"]["subscription_provider"]
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "client" | "attorney" | "admin"
      case_status:
        | "submitted"
        | "matched"
        | "in_progress"
        | "closed"
        | "cancelled"
      case_urgency: "low" | "normal" | "high" | "urgent"
      match_status: "proposed" | "accepted" | "declined" | "completed"
      subscription_provider: "paypal" | "paystack"
      subscription_status:
        | "pending"
        | "active"
        | "past_due"
        | "cancelled"
        | "expired"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["client", "attorney", "admin"],
      case_status: [
        "submitted",
        "matched",
        "in_progress",
        "closed",
        "cancelled",
      ],
      case_urgency: ["low", "normal", "high", "urgent"],
      match_status: ["proposed", "accepted", "declined", "completed"],
      subscription_provider: ["paypal", "paystack"],
      subscription_status: [
        "pending",
        "active",
        "past_due",
        "cancelled",
        "expired",
      ],
    },
  },
} as const
