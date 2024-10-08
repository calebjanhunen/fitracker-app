export interface ICreateWorkoutRequest {
    name: string;
    createdAt: string;
    duration: number;
    exercises: ICreateWorkoutExerciseRequest[];
}

export interface ICreateWorkoutExerciseRequest {
    exerciseId: string;
    order: number;
    sets: ICreateWorkoutSetRequest[];
}

export interface ICreateWorkoutSetRequest {
    weight: number;
    reps: number;
    rpe: number;
    order: number;
}
