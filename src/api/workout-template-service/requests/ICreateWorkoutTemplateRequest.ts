export interface ICreateWorkoutTemplateRequest {
    name: string;
    exercises: ICreateWorkoutTemplateExerciseRequest[];
}

export interface ICreateWorkoutTemplateExerciseRequest {
    exerciseId: string;
    order: number;
    sets: ICreateWorkoutTemplateSetRequest[];
}

export interface ICreateWorkoutTemplateSetRequest {
    order: number;
}
