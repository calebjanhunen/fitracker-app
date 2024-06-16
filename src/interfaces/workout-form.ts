export interface WorkoutForm {
    name: string;
    createdAt: string;
    exercises: WorkoutFormExercise[];
}

export interface WorkoutFormExercise {
    name: string;
    id: string;
    sets: WorkoutFormSet[];
    previousSets: WorkoutFormSet[];
}

export interface WorkoutFormSet {
    id: string;
    weight: number;
    reps: number;
    rpe: number;
    setOrder: number;
}
