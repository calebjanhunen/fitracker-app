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
      exercise_sets: {
        Row: {
          id: number
          reps: number
          rpe: number | null
          set_num: number
          weight: number
          workout_exercises_id: number
        }
        Insert: {
          id?: number
          reps: number
          rpe?: number | null
          set_num: number
          weight: number
          workout_exercises_id: number
        }
        Update: {
          id?: number
          reps?: number
          rpe?: number | null
          set_num?: number
          weight?: number
          workout_exercises_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sets_workout_exercises_id_fkey"
            columns: ["workout_exercises_id"]
            referencedRelation: "workout_exercises"
            referencedColumns: ["id"]
          }
        ]
      }
      exercises: {
        Row: {
          equipment: string | null
          id: number
          instructions: string[] | null
          level: string | null
          name: string
          primary_muscle: string[]
          secondary_muscle: string[] | null
        }
        Insert: {
          equipment?: string | null
          id?: number
          instructions?: string[] | null
          level?: string | null
          name: string
          primary_muscle: string[]
          secondary_muscle?: string[] | null
        }
        Update: {
          equipment?: string | null
          id?: number
          instructions?: string[] | null
          level?: string | null
          name?: string
          primary_muscle?: string[]
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
      user_fitness_goals: {
        Row: {
          fitness_goal_id: number
          user_id: string
        }
        Insert: {
          fitness_goal_id: number
          user_id: string
        }
        Update: {
          fitness_goal_id?: number
          user_id?: string
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_workout_days: {
        Row: {
          user_id: string
          workout_day_id: number
        }
        Insert: {
          user_id: string
          workout_day_id: number
        }
        Update: {
          user_id?: string
          workout_day_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_workout_days_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_days_workout_day_id_fkey"
            columns: ["workout_day_id"]
            referencedRelation: "workout_days"
            referencedColumns: ["id"]
          }
        ]
      }
      user_workout_times: {
        Row: {
          user_id: string
          workout_time_id: number
        }
        Insert: {
          user_id: string
          workout_time_id: number
        }
        Update: {
          user_id?: string
          workout_time_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_workout_times_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_times_workout_time_id_fkey"
            columns: ["workout_time_id"]
            referencedRelation: "workout_times"
            referencedColumns: ["id"]
          }
        ]
      }
      user_workout_types: {
        Row: {
          user_id: string
          workout_type_id: number
        }
        Insert: {
          user_id: string
          workout_type_id: number
        }
        Update: {
          user_id?: string
          workout_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_workout_types_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_types_workout_type_id_fkey"
            columns: ["workout_type_id"]
            referencedRelation: "workout_types"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_days: {
        Row: {
          day: string
          id: number
        }
        Insert: {
          day: string
          id?: number
        }
        Update: {
          day?: string
          id?: number
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          exercises_id: number
          id: number
          workout_id: number
        }
        Insert: {
          exercises_id?: number
          id?: number
          workout_id: number
        }
        Update: {
          exercises_id?: number
          id?: number
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercises_id_fkey"
            columns: ["exercises_id"]
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_times: {
        Row: {
          id: number
          time: string
          time_range: string
        }
        Insert: {
          id?: number
          time: string
          time_range?: string
        }
        Update: {
          id?: number
          time?: string
          time_range?: string
        }
        Relationships: []
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
      workouts: {
        Row: {
          created_at: string
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
