import { request } from '../client';
import { exerciseEndpoints } from './ExerciseApiConfig';
import { IUpdateExerciseRequest } from './interfaces/requests/IUpdateExerciseRequest';
import { IExerciseResponse } from './interfaces/responses/ExerciseResponse';

export async function updateExercise(
    updateDto: IUpdateExerciseRequest
): Promise<IExerciseResponse> {
    return await request({
        method: 'PUT',
        url: exerciseEndpoints.updateExercise(updateDto.id),
        data: updateDto,
    });
}
