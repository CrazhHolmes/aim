export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      credit_ledger: {
        Row: {
          id: string
          user_id: string
          delta: number
          reason: string
          track_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          delta: number
          reason: string
          track_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          delta?: number
          reason?: string
          track_id?: string | null
          created_at?: string
        }
      }
      tracks: {
        Row: {
          id: string
          user_id: string
          title: string
          prompt: string
          genre: string | null
          mood: string | null
          duration_seconds: number
          status: 'queued' | 'processing' | 'completed' | 'failed'
          audio_url: string | null
          error_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          prompt: string
          genre?: string | null
          mood?: string | null
          duration_seconds?: number
          status?: 'queued' | 'processing' | 'completed' | 'failed'
          audio_url?: string | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          prompt?: string
          genre?: string | null
          mood?: string | null
          duration_seconds?: number
          status?: 'queued' | 'processing' | 'completed' | 'failed'
          audio_url?: string | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_credits: {
        Args: { uid: string }
        Returns: number
      }
    }
    Enums: {
      track_status: 'queued' | 'processing' | 'completed' | 'failed'
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Track = Database['public']['Tables']['tracks']['Row']
export type CreditLedger = Database['public']['Tables']['credit_ledger']['Row']
