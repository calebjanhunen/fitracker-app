import { IWorkoutSetResponse } from 'src/api/workout-service/responses/IWorkoutResponse';

export interface IExerciseWorkoutHistoryResponse {
    id: string;
    name: string;
    createdAt: Date;
    duration: number;
    sets: IWorkoutSetResponse[];
}
