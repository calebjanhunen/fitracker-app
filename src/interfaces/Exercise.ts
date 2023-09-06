import { type Tables } from './Tables';

export interface ExerciseSet {
    id: string | number[] | number;
    exerciseId: number;
    reps: number | null;
    weight: number | null;
    rpe: number | null;
    valid?: boolean;
}

export interface Exercise {
    id: Tables<'exercises'>['id'];
    name: Tables<'exercises'>['name'];
    sets: ExerciseSet[];
    valid?: boolean;
}
