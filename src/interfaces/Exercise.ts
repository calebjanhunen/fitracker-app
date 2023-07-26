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
    id: string | number[];
    name: string;
    sets: ExerciseSet[];
}
