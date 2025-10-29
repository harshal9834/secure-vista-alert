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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      emergency_contacts: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_primary: boolean | null
          name: string
          phone_number: string
          relationship: string
          tourist_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          phone_number: string
          relationship: string
          tourist_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          phone_number?: string
          relationship?: string
          tourist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_tourist_id_fkey"
            columns: ["tourist_id"]
            isOneToOne: false
            referencedRelation: "tourist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      helplines: {
        Row: {
          available_24_7: boolean | null
          category: string
          created_at: string | null
          id: string
          is_active: boolean | null
          language: string | null
          name: string
          phone_number: string
          region: string | null
        }
        Insert: {
          available_24_7?: boolean | null
          category: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name: string
          phone_number: string
          region?: string | null
        }
        Update: {
          available_24_7?: boolean | null
          category?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name?: string
          phone_number?: string
          region?: string | null
        }
        Relationships: []
      }
      incident_reports: {
        Row: {
          attachments: Json | null
          created_at: string | null
          description: string
          id: string
          incident_type: string
          location_lat: number
          location_lng: number
          location_name: string | null
          severity: string | null
          status: string | null
          tourist_id: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          description: string
          id?: string
          incident_type: string
          location_lat: number
          location_lng: number
          location_name?: string | null
          severity?: string | null
          status?: string | null
          tourist_id: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          description?: string
          id?: string
          incident_type?: string
          location_lat?: number
          location_lng?: number
          location_name?: string | null
          severity?: string | null
          status?: string | null
          tourist_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incident_reports_tourist_id_fkey"
            columns: ["tourist_id"]
            isOneToOne: false
            referencedRelation: "tourist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      location_checkins: {
        Row: {
          created_at: string | null
          id: string
          location_lat: number
          location_lng: number
          location_name: string
          notes: string | null
          tourist_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_lat: number
          location_lng: number
          location_name: string
          notes?: string | null
          tourist_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location_lat?: number
          location_lng?: number
          location_name?: string
          notes?: string | null
          tourist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_checkins_tourist_id_fkey"
            columns: ["tourist_id"]
            isOneToOne: false
            referencedRelation: "tourist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      panic_alerts: {
        Row: {
          alert_type: string | null
          created_at: string | null
          description: string | null
          id: string
          location_lat: number
          location_lng: number
          location_name: string | null
          resolved_at: string | null
          response_time: string | null
          status: string | null
          tourist_id: string
        }
        Insert: {
          alert_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_lat: number
          location_lng: number
          location_name?: string | null
          resolved_at?: string | null
          response_time?: string | null
          status?: string | null
          tourist_id: string
        }
        Update: {
          alert_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location_lat?: number
          location_lng?: number
          location_name?: string | null
          resolved_at?: string | null
          response_time?: string | null
          status?: string | null
          tourist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "panic_alerts_tourist_id_fkey"
            columns: ["tourist_id"]
            isOneToOne: false
            referencedRelation: "tourist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      safe_zones: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          location_lat: number
          location_lng: number
          name: string
          radius_meters: number | null
          zone_type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          location_lat: number
          location_lng: number
          name: string
          radius_meters?: number | null
          zone_type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          location_lat?: number
          location_lng?: number
          name?: string
          radius_meters?: number | null
          zone_type?: string
        }
        Relationships: []
      }
      safety_status: {
        Row: {
          created_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          location_name: string | null
          message: string | null
          status: string
          tourist_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          location_name?: string | null
          message?: string | null
          status: string
          tourist_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          location_name?: string | null
          message?: string | null
          status?: string
          tourist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_status_tourist_id_fkey"
            columns: ["tourist_id"]
            isOneToOne: false
            referencedRelation: "tourist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_tips: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          language: string | null
          priority: number | null
          region: string | null
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          priority?: number | null
          region?: string | null
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          priority?: number | null
          region?: string | null
          title?: string
        }
        Relationships: []
      }
      tourist_profiles: {
        Row: {
          aadhaar_number: string | null
          country: string
          created_at: string | null
          current_location_lat: number | null
          current_location_lng: number | null
          current_location_name: string | null
          destination: string | null
          full_name: string
          id: string
          location_tracking_enabled: boolean | null
          passport_number: string | null
          phone_number: string
          preferred_language: string | null
          safety_score: number | null
          trip_end_date: string | null
          trip_start_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          aadhaar_number?: string | null
          country: string
          created_at?: string | null
          current_location_lat?: number | null
          current_location_lng?: number | null
          current_location_name?: string | null
          destination?: string | null
          full_name: string
          id?: string
          location_tracking_enabled?: boolean | null
          passport_number?: string | null
          phone_number: string
          preferred_language?: string | null
          safety_score?: number | null
          trip_end_date?: string | null
          trip_start_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          aadhaar_number?: string | null
          country?: string
          created_at?: string | null
          current_location_lat?: number | null
          current_location_lng?: number | null
          current_location_name?: string | null
          destination?: string | null
          full_name?: string
          id?: string
          location_tracking_enabled?: boolean | null
          passport_number?: string | null
          phone_number?: string
          preferred_language?: string | null
          safety_score?: number | null
          trip_end_date?: string | null
          trip_start_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
