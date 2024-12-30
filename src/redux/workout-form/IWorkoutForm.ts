import { RecentSetDto } from 'src/api/generated';

interface IWorkoutForm {
    name: string;
    createdAt: string;
    lastUpdatedAt: string;
    exercises: string[];
}

export interface IWorkoutExerciseForm {
    id: string;
    name: string;
    sets: string[];
    recentSets: string[];
}

export interface IWorkoutSetForm {
    id: string;
    weight: number | null;
    reps: number | null;
    rpe: number | null;
}

export interface IWorkoutFormState {
    workout: IWorkoutForm;
    exercises: Record<string, IWorkoutExerciseForm>;
    sets: Record<string, IWorkoutSetForm>;
    recentSets: Record<string, RecentSetDto>;
}
