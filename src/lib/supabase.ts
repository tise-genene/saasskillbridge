import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is properly configured
export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here'

// Use placeholder values if not configured to prevent errors
const finalUrl = supabaseUrl || 'https://placeholder.supabase.co'
const finalKey = supabaseAnonKey || 'placeholder-key'

export const supabase = createClient(finalUrl, finalKey)

// Database types will be generated here
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
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          user_type: 'learner' | 'instructor' | 'company'
          bio: string | null
          location: string | null
          hourly_rate: number | null
          skills: string[] | null
          verified: boolean
          rating: number | null
          total_earnings: number | null
          success_rate: number | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          user_type: 'learner' | 'instructor' | 'company'
          bio?: string | null
          location?: string | null
          hourly_rate?: number | null
          skills?: string[] | null
          verified?: boolean
          rating?: number | null
          total_earnings?: number | null
          success_rate?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          user_type?: 'learner' | 'instructor' | 'company'
          bio?: string | null
          location?: string | null
          hourly_rate?: number | null
          skills?: string[] | null
          verified?: boolean
          rating?: number | null
          total_earnings?: number | null
          success_rate?: number | null
        }
      }
      skill_requests: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          skill_category: string
          skill_level: 'beginner' | 'intermediate' | 'advanced'
          budget_min: number
          budget_max: number
          duration_weeks: number
          location_type: 'online' | 'in_person' | 'hybrid'
          location: string | null
          learner_id: string
          status: 'open' | 'in_progress' | 'completed' | 'cancelled'
          selected_instructor_id: string | null
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          skill_category: string
          skill_level: 'beginner' | 'intermediate' | 'advanced'
          budget_min: number
          budget_max: number
          duration_weeks: number
          location_type: 'online' | 'in_person' | 'hybrid'
          location?: string | null
          learner_id: string
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          selected_instructor_id?: string | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          skill_category?: string
          skill_level?: 'beginner' | 'intermediate' | 'advanced'
          budget_min?: number
          budget_max?: number
          duration_weeks?: number
          location_type?: 'online' | 'in_person' | 'hybrid'
          location?: string | null
          learner_id?: string
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          selected_instructor_id?: string | null
          tags?: string[] | null
        }
      }
      proposals: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          skill_request_id: string
          instructor_id: string
          cover_letter: string
          proposed_rate: number
          estimated_duration: number
          status: 'pending' | 'accepted' | 'rejected'
          attachments: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          skill_request_id: string
          instructor_id: string
          cover_letter: string
          proposed_rate: number
          estimated_duration: number
          status?: 'pending' | 'accepted' | 'rejected'
          attachments?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          skill_request_id?: string
          instructor_id?: string
          cover_letter?: string
          proposed_rate?: number
          estimated_duration?: number
          status?: 'pending' | 'accepted' | 'rejected'
          attachments?: string[] | null
        }
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
  }
} 