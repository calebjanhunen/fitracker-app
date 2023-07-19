interface ExerciseSets {
    reps: number;
    weight: number;
    rpe: number;
}

export interface Exercise {
    name: string;
    sets: ExerciseSets[];
}
