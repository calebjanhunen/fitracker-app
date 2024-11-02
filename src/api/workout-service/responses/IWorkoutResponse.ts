export interface IWorkoutResponse {
    id: string;
    name: string;
    createdAt: string;
    duration: number;
    exercises: IWorkoutExerciseResponse[];
}

export interface IWorkoutExerciseResponse {
    id: string;
    name: string;
    order: number;
    sets: IWorkoutSetResponse[];
}

export interface IWorkoutSetResponse {
    id: string;
    order: number;
    weight: number;
    reps: number;
    rpe: number | null;
}
