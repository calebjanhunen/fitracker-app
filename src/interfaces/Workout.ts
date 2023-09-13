import { type Database } from './Database';
import { type ExerciseReturnType } from './Exercise';

export interface Workout {
    name: string | null;
    id: number;
    dateCreated: string;
    exercises: ExerciseReturnType[];
}

export type WorkoutInsertType = Database['public']['Tables']['workouts']['Insert'];
export type ExerciseInsertType = Database['public']['Tables']['workout_exercises']['Insert'];
export type ExerciseSetsInsertType = Database['public']['Tables']['exercise_sets']['Insert'];
