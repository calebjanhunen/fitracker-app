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
          gym: number | null
          id: number
          province: string | null
          skill_level: string | null
          user_id: string
          username: string
          workout_days: string[] | null
          workout_times: string[] | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          gym?: number | null
          id?: number
          province?: string | null
          skill_level?: string | null
          user_id: string
          username: string
          workout_days?: string[] | null
          workout_times?: string[] | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          gym?: number | null
          id?: number
          province?: string | null
          skill_level?: string | null
          user_id?: string
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
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_fitness_goals: {
        Row: {
          fitness_goal_id: number
          id: number
          user_id: number
        }
        Insert: {
          fitness_goal_id: number
          id?: number
          user_id: number
        }
        Update: {
          fitness_goal_id?: number
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_fitness_goals_fitness_goal_id_fkey"
            columns: ["fitness_goal_id"]
            referencedRelation: "fitness_goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_fitness_goals_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_workout_types: {
        Row: {
          id: number
          user_id: number
          workout_types_id: number
        }
        Insert: {
          id?: number
          user_id: number
          workout_types_id: number
        }
        Update: {
          id?: number
          user_id?: number
          workout_types_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_workout_types_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_types_workout_types_id_fkey"
            columns: ["workout_types_id"]
            referencedRelation: "workout_types"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_types: {
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
