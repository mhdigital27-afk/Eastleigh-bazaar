export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ad_slots: {
        Row: {
          caption: string | null
          id: number
          image_url: string | null
          is_active: boolean
          target_business_id: string | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          id: number
          image_url?: string | null
          is_active?: boolean
          target_business_id?: string | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          target_business_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_slots_target_business_id_fkey"
            columns: ["target_business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          admin_contact: string | null
          admin_display_name: string | null
          bank_account_name: string | null
          bank_account_number: string | null
          bank_name: string | null
          contact_email: string | null
          id: number
          mpesa_paybill: string | null
          mpesa_till: string | null
          updated_at: string
          whatsapp_number: string | null
          gold_24k_price: string | null
          gold_22k_price: string | null
          usd_avg: string | null
          is_prayer_time: boolean | null
          market_traffic_status: string | null
          market_news_flash: string | null
          liability_clause: string | null
        }
        Insert: {
          admin_contact?: string | null
          admin_display_name?: string | null
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          contact_email?: string | null
          id?: number
          mpesa_paybill?: string | null
          mpesa_till?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          gold_24k_price?: string | null
          gold_22k_price?: string | null
          usd_avg?: string | null
          is_prayer_time?: boolean | null
          market_traffic_status?: string | null
          market_news_flash?: string | null
          liability_clause?: string | null
        }
        Update: {
          admin_contact?: string | null
          admin_display_name?: string | null
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          contact_email?: string | null
          id?: number
          mpesa_paybill?: string | null
          mpesa_till?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          gold_24k_price?: string | null
          gold_22k_price?: string | null
          usd_avg?: string | null
          is_prayer_time?: boolean | null
          market_traffic_status?: string | null
          market_news_flash?: string | null
          liability_clause?: string | null
        }
        Relationships: []
      }
      business_analytics: {
        Row: {
          business_id: string
          created_at: string
          favorites: number | null
          id: string
          profile_views: number | null
          shares: number | null
          updated_at: string
          whatsapp_clicks: number | null
        }
        Insert: {
          business_id: string
          created_at?: string
          favorites?: number | null
          id?: string
          profile_views?: number | null
          shares?: number | null
          updated_at?: string
          whatsapp_clicks?: number | null
        }
        Update: {
          business_id?: string
          created_at?: string
          favorites?: number | null
          id?: string
          profile_views?: number | null
          shares?: number | null
          updated_at?: string
          whatsapp_clicks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "business_analytics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      business_listings: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          emergency_hotline: string | null
          hotel_amenities: string[] | null
          id: string
          insurance_providers: string | null
          is_paid_forex: boolean
          logo_url: string | null
          mall_name: string | null
          medical_services: string | null
          name: string
          operational_hours: string | null
          owner_id: string
          requires_admin_review: boolean
          room_price_range: string | null
          sector: Database["public"]["Enums"]["business_sector"]
          stall_number: string | null
          floor_number: string | null
          status: Database["public"]["Enums"]["listing_status"]
          trade_type: string | null
          updated_at: string
          whatsapp_clicks: number | null
          view_count: number | null
          is_verified: boolean | null
          membership_tier: string | null
          is_open: boolean | null
          google_maps_url: string | null
          indoor_landmark: string | null
          cover_image_url: string | null
          opening_hours: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          emergency_hotline?: string | null
          hotel_amenities?: string[] | null
          id?: string
          insurance_providers?: string | null
          is_paid_forex?: boolean
          logo_url?: string | null
          mall_name?: string | null
          medical_services?: string | null
          name: string
          operational_hours?: string | null
          owner_id: string
          requires_admin_review?: boolean
          room_price_range?: string | null
          sector: Database["public"]["Enums"]["business_sector"]
          stall_number?: string | null
          floor_number?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          trade_type?: string | null
          updated_at?: string
          whatsapp_clicks?: number | null
          view_count?: number | null
          is_verified?: boolean | null
          membership_tier?: string | null
          is_open?: boolean | null
          google_maps_url?: string | null
          indoor_landmark?: string | null
          cover_image_url?: string | null
          opening_hours?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          emergency_hotline?: string | null
          hotel_amenities?: string[] | null
          id?: string
          insurance_providers?: string | null
          is_paid_forex?: boolean
          logo_url?: string | null
          mall_name?: string | null
          medical_services?: string | null
          name?: string
          operational_hours?: string | null
          owner_id?: string
          requires_admin_review?: boolean
          room_price_range?: string | null
          sector?: Database["public"]["Enums"]["business_sector"]
          stall_number?: string | null
          floor_number?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          trade_type?: string | null
          updated_at?: string
          whatsapp_clicks?: number | null
          view_count?: number | null
          is_verified?: boolean | null
          membership_tier?: string | null
          is_open?: boolean | null
          google_maps_url?: string | null
          indoor_landmark?: string | null
          cover_image_url?: string | null
          opening_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_reviews: {
        Row: {
          id: string
          business_id: string
          customer_name: string | null
          rating: number
          review_text: string | null
          merchant_reply: string | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          customer_name?: string | null
          rating: number
          review_text?: string | null
          merchant_reply?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          customer_name?: string | null
          rating?: number
          review_text?: string | null
          merchant_reply?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      business_gallery: {
        Row: {
          id: string
          business_id: string
          image_url: string
          category: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          image_url: string
          category?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          image_url?: string
          category?: string | null
          display_order?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_gallery_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      catalog_items: {
        Row: {
          business_id: string
          created_at: string
          id: string
          image_url: string | null
          item_name: string
          price_rate: string
          wholesale_rate: number | null
          wholesale_price: string | null
          description: string | null
          category: string | null
          stock_status: string | null
          view_count: number | null
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          item_name: string
          price_rate: string
          wholesale_rate?: number | null
          wholesale_price?: string | null
          description?: string | null
          category?: string | null
          stock_status?: string | null
          view_count?: number | null
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          item_name?: string
          price_rate?: string
          wholesale_rate?: number | null
          wholesale_price?: string | null
          description?: string | null
          category?: string | null
          stock_status?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_items_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      commodity_prices: {
        Row: {
          id: string
          item_name: string
          current_price: string
          trend: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          item_name: string
          current_price: string
          trend?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          item_name?: string
          current_price?: string
          trend?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      forex_rates: {
        Row: {
          bureau_id: string
          buy_rate: number
          currency: string
          id: string
          sell_rate: number
          updated_at: string
        }
        Insert: {
          bureau_id: string
          buy_rate: number
          currency: string
          id?: string
          sell_rate: number
          updated_at?: string
        }
        Update: {
          bureau_id?: string
          buy_rate?: number
          currency?: string
          id?: string
          sell_rate?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forex_rates_bureau_id_fkey"
            columns: ["bureau_id"]
            isOneToOne: false
            referencedRelation: "business_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      logistics_providers: {
        Row: {
          id: string
          name: string
          contact_phone: string
          service_area: string
          is_verified: boolean
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          contact_phone: string
          service_area: string
          is_verified?: boolean
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          contact_phone?: string
          service_area?: string
          is_verified?: boolean
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
      increment_whatsapp_clicks: {
        Args: {
          row_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "merchant" | "super_admin"
      business_sector: "retail" | "hotel" | "hospital" | "forex" | "service" | "realestate" | "transport"
      listing_status: "pending_review" | "live" | "hidden"
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
      app_role: ["merchant", "super_admin"],
      business_sector: ["retail", "hotel", "hospital", "forex", "service", "realestate", "transport"],
      listing_status: ["pending_review", "live", "hidden"],
    },
  },
} as const
