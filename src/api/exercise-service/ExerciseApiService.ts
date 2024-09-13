import { request } from '../client';
import { exerciseEndpoints } from './ExerciseApiConfig';
import { IExerciseResponse } from './interfaces/responses/ExerciseResponse';

export async function getAllExercises(): Promise<IExerciseResponse[]> {
    return await request({
        method: 'GET',
        url: exerciseEndpoints.getAllExercises(),
    });
}
