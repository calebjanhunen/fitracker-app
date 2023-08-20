import { type Tables } from './Tables';

export interface ExerciseSet {
    id: string | number[];
    reps: number | null;
    weight: number | null;
    rpe: number | null;
    previous: {
        reps: number;
        weight: number;
        rpe: number;
    } | null;
}

export interface Exercise {
    id: Tables<'exercises'>['id'];
    name: Tables<'exercises'>['name'];
    numSets: number;
    sets: ExerciseSet[];
}
