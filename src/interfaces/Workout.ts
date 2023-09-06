import { type Database } from './Database';
import { ExerciseSet, type Exercise } from './Exercise';

export interface Workout {
    name: string | null;
    dateCreated: string;
    exercises: ExerciseReturnType[];
}

interface ExerciseReturnType {
    id: number;
    name: {
        name: string;
    } | null;
    sets: ExerciseSetReturnType[];
}

interface ExerciseSetReturnType {
    id: number;
    weight: number;
    reps: number;
    rpe: number | null;
}

export type WorkoutInsertType = Database['public']['Tables']['workouts']['Insert'];
export type ExerciseInsertType = Database['public']['Tables']['workout_exercises']['Insert'];
export type ExerciseSetsInsertType = Database['public']['Tables']['exercise_sets']['Insert'];
