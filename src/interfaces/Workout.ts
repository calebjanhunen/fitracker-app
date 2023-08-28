import { type Database } from './Database';
import { type Exercise } from './Exercise';

export interface Workout {
    name: string;
    dateCreated: string;
    exercises: Exercise[];
}

export type WorkoutInsertType = Database['public']['Tables']['workouts']['Insert'];
export type ExerciseInsertType = Database['public']['Tables']['workout_exercises']['Insert'];
export type ExerciseSetsInsertType = Database['public']['Tables']['exercise_sets']['Insert'];
export interface InsertWorkoutRequest {
    workout: WorkoutInsertType;
    exercises: ExerciseInsertType[];
    sets: ExerciseSetsInsertType[];
}
