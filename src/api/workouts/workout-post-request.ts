export interface WorkoutPostRequest {
    name: string;
    createdAt: string;
    exercises: WorkoutPostRequestExercise[];
}

export interface WorkoutPostRequestExercise {
    name: string;
    id: string;
    sets: WorkoutPostRequestSet[];
}

export interface WorkoutPostRequestSet {
    weight: number;
    reps: number;
    rpe: number;
    setOrder: number;
}
