import { request } from '../client';
import { exerciseEndpoints } from './ExerciseApiConfig';
import { IExerciseRequest } from './interfaces/requests/IExerciseRequest';
import { IUpdateExerciseRequest } from './interfaces/requests/IUpdateExerciseRequest';
import {
    IExerciseResponse,
    IExerciseWithWorkoutDetailsResponse,
} from './interfaces/responses/ExerciseResponse';
import { IExerciseDetailsResponse } from './interfaces/responses/IExerciseWorkoutHistoryResponse';

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

export async function getExerciseDetails(id: string): Promise<IExerciseDetailsResponse> {
    return await request({
        method: 'GET',
        url: exerciseEndpoints.getExerciseDetails(id),
    });
}

export async function updateExercise(
    updateDto: IUpdateExerciseRequest
): Promise<IExerciseResponse> {
    return await request({
        method: 'PUT',
        url: exerciseEndpoints.updateExercise(updateDto.id),
        data: updateDto,
    });
}
