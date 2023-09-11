import { type Tables } from './Tables';

interface PreviousSet {
    weight: number;
    reps: number;
    rpe: number;
}

export interface ExerciseSet {
    id: string | number[] | number;
    exerciseId: number;
    reps: number | null;
    weight: number | null;
    rpe: number | null;
    previousSets?: PreviousSet[];
    valid?: boolean;
}

export interface Exercise {
    id: Tables<'exercises'>['id'];
    name: Tables<'exercises'>['name'];
    sets: ExerciseSet[];
    valid?: boolean;
}

// Return type from supabase
export interface ExerciseReturnType {
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
