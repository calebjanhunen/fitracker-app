import { request } from '../client';
import { exerciseEndpoints } from './ExerciseApiConfig';
import {
    IExerciseResponse,
    IExerciseWithWorkoutDetailsResponse,
} from './interfaces/responses/ExerciseResponse';

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
