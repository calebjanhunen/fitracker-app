import { IWorkoutFormState } from 'src/redux/workout-form/IWorkoutForm';
import { request } from '../client';
import { ICreateWorkoutRequest } from './requests/ICreateWorkoutRequest';
import { ICreateWorkoutResponse } from './responses/ICreateWorkoutResponse';
import { IDeleteWorkoutResponse } from './responses/IDeleteWorkoutResponse';
import { IWorkoutResponse } from './responses/IWorkoutResponse';
import { workoutEndpoints } from './WorkoutApiConfig';

export async function createWorkout({
    workoutForm,
    duration,
}: {
    workoutForm: IWorkoutFormState;
    duration: number;
}): Promise<ICreateWorkoutResponse> {
    const workoutRequest = fromWorkoutFormToWorkoutRequest(workoutForm, duration);
    return await request<ICreateWorkoutRequest>({
        method: 'POST',
        url: workoutEndpoints.createWorkout(),
        data: workoutRequest,
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

function fromWorkoutFormToWorkoutRequest(
    workoutForm: IWorkoutFormState,
    duration: number
): ICreateWorkoutRequest {
    return {
        name: workoutForm.workout.name,
        createdAt: workoutForm.workout.createdAt,
        duration,
        exercises: workoutForm.workout.exercises.map((exerciseId, index) => {
            return {
                exerciseId,
                order: index + 1,
                sets: workoutForm.exercises[exerciseId].sets.map((setId, index) => {
                    return {
                        weight: workoutForm.sets[setId].weight,
                        reps: workoutForm.sets[setId].reps,
                        rpe: workoutForm.sets[setId].rpe,
                        order: index + 1,
                    };
                }),
            };
        }),
    };
}
