import { type ExerciseInWorkout } from './workout';

export interface WorkoutForm {
    name: string;
    createdAt: string;
    exercises: ExerciseInWorkout[];
}
