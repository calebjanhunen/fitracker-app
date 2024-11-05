import { IWorkoutSetResponse } from 'src/api/workout-service/responses/IWorkoutResponse';

export interface IExerciseDetailsResponse {
    id: string;
    name: string;
    bodyPart: string;
    equipment: string;
    isCustom: boolean;
    workoutHistory: IExerciseWorkoutHistoryResponse[];
}
export interface IExerciseWorkoutHistoryResponse {
    id: string;
    name: string;
    createdAt: Date;
    duration: number;
    sets: IWorkoutSetResponse[];
}
