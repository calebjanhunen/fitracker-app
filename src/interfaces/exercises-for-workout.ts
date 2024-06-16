import type { WorkoutFormSet } from './workout-form';

export interface ExerciseForWorkout {
    id: string;
    name: string;
    primaryMuscle: string;
    numTimesUsed: number;
    previousSets: WorkoutFormSet[];
}
