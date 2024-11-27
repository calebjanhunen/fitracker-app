export interface ICreateWorkoutRequest {
    name: string;
    createdAt: string;
    lastUpdatedAt: string;
    duration: number;
    exercises: ICreateWorkoutExerciseRequest[];
}

export interface ICreateWorkoutExerciseRequest {
    exerciseId: string;
    order: number;
    sets: ICreateWorkoutSetRequest[];
}

export interface ICreateWorkoutSetRequest {
    weight: number | null;
    reps: number | null;
    rpe: number | null;
    order: number;
}
