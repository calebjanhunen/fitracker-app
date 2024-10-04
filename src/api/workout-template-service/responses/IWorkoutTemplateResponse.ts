export interface IWorkoutTemplateResponse {
    id: string;
    name: string;
    createdAt: Date;
    exercises: IWorkoutTemplateExerciseResponse[];
}

interface IWorkoutTemplateExerciseResponse {
    exerciseId: string;
    exerciseName: string;
    order: number;
    sets: IWorkoutTemplateSetResponse[];
}

interface IWorkoutTemplateSetResponse {
    id: string;
    order: number;
}
