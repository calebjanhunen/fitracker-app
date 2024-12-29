import { request } from '../client';
import { ICreateWorkoutRequest } from './requests/ICreateWorkoutRequest';
import { ICreateWorkoutResponse } from './responses/ICreateWorkoutResponse';
import { IDeleteWorkoutResponse } from './responses/IDeleteWorkoutResponse';
import { workoutEndpoints } from './WorkoutApiConfig';

export async function createWorkout({
    createWorkoutRequest,
}: {
    createWorkoutRequest: ICreateWorkoutRequest;
}): Promise<ICreateWorkoutResponse> {
    return await request<ICreateWorkoutRequest, ICreateWorkoutResponse>({
        method: 'POST',
        url: workoutEndpoints.createWorkout(),
        data: createWorkoutRequest,
    });
}

export async function deleteWorkout(workoutId: string): Promise<IDeleteWorkoutResponse> {
    return await request<null, IDeleteWorkoutResponse>({
        method: 'DELETE',
        url: workoutEndpoints.deleteWorkout(workoutId),
    });
}
