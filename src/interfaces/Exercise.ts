export interface ExerciseSet {
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
    id: number;
    name: string;
    sets: ExerciseSet[];
}
