import { request } from '../client';
import { exerciseEndpoints } from './ExerciseApiConfig';
import { IExerciseRequest } from './interfaces/requests/IExerciseRequest';
import {
    IExerciseResponse,
    IExerciseWithWorkoutDetailsResponse,
} from './interfaces/responses/ExerciseResponse';
import { IExerciseWorkoutHistoryResponse } from './interfaces/responses/IExerciseWorkoutHistoryResponse';

export async function getAllExercises(): Promise<IExerciseResponse[]> {
    return await request({
        method: 'GET',
        url: exerciseEndpoints.getAllExercises(),
    });
}

export async function getExercisesWithWorkoutDetails(): Promise<
    IExerciseWithWorkoutDetailsResponse[]
> {
    return await request({
        method: 'GET',
        url: exerciseEndpoints.getExercisesWithWorkoutDetails(),
    });
}

export async function createExercise(exercise: IExerciseRequest): Promise<IExerciseResponse> {
    return await request<IExerciseRequest>({
        method: 'POST',
        url: exerciseEndpoints.createExercise(),
        data: exercise,
    });
}

export async function getExerciseWorkoutHistory(
    id: string
): Promise<IExerciseWorkoutHistoryResponse[]> {
    return await request({
        method: 'GET',
        url: exerciseEndpoints.getExerciseWorkoutHistory(id),
    });
}
