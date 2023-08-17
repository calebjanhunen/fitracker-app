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
      exercises: {
        Row: {
          equipment: string | null
          id: number
          instructions: string[] | null
          level: string | null
          name: string
          primary_muscle: string[] | null
          secondary_muscle: string[] | null
        }
        Insert: {
          equipment?: string | null
          id?: number
          instructions?: string[] | null
          level?: string | null
          name: string
          primary_muscle?: string[] | null
          secondary_muscle?: string[] | null
        }
        Update: {
          equipment?: string | null
          id?: number
          instructions?: string[] | null
          level?: string | null
          name?: string
          primary_muscle?: string[] | null
          secondary_muscle?: string[] | null
        }
        Relationships: []
      }
      fitness_goals: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      gyms: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          email: string
          gym: number | null
          id: string
          province: string | null
          skill_level: string | null
          username: string
          workout_days: string[] | null
          workout_times: string[] | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          gym?: number | null
          id: string
          province?: string | null
          skill_level?: string | null
          username: string
          workout_days?: string[] | null
          workout_times?: string[] | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          gym?: number | null
          id?: string
          province?: string | null
          skill_level?: string | null
          username?: string
          workout_days?: string[] | null
          workout_times?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_gym_fkey"
            columns: ["gym"]
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
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
