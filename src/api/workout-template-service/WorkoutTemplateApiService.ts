import { request } from '../client';
import { IWorkoutTemplateResponse } from './responses/IWorkoutTemplateResponse';
import { workoutTemplateEndpoints } from './WorkoutTemplateApiConfig';

export async function getAllWorkoutTemplates(): Promise<IWorkoutTemplateResponse[]> {
    return await request({
        method: 'GET',
        url: workoutTemplateEndpoints.getAllWorkoutTemplates(),
    });
}
