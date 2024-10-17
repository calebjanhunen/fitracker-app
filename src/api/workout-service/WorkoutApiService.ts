import { request } from '../client';
import { ICreateWorkoutRequest } from './requests/ICreateWorkoutRequest';
import { ICreateWorkoutResponse } from './responses/ICreateWorkoutResponse';
import { IDeleteWorkoutResponse } from './responses/IDeleteWorkoutResponse';
import { IWorkoutResponse } from './responses/IWorkoutResponse';
import { workoutEndpoints } from './WorkoutApiConfig';

export async function createWorkout({
    createWorkoutRequest,
}: {
    createWorkoutRequest: ICreateWorkoutRequest;
}): Promise<ICreateWorkoutResponse> {
    return await request<ICreateWorkoutRequest>({
        method: 'POST',
        url: workoutEndpoints.createWorkout(),
        data: createWorkoutRequest,
    });
}

export async function getAllWorkouts(): Promise<IWorkoutResponse[]> {
    return await request<IWorkoutResponse[]>({
        method: 'GET',
        url: workoutEndpoints.getAllWorkouts(),
    });
}

export async function deleteWorkout(workoutId: string): Promise<IDeleteWorkoutResponse> {
    return await request<IDeleteWorkoutResponse>({
        method: 'DELETE',
        url: workoutEndpoints.deleteWorkout(workoutId),
    });
}
