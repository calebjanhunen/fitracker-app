import { IWorkoutFormState } from 'src/redux/workout-form/IWorkoutForm';
import { request } from '../client';
import { ICreateWorkoutRequest } from './requests/ICreateWorkoutRequest';
import { IWorkoutResponse } from './responses/IWorkoutResponse';
import { workoutEndpoints } from './WorkoutApiConfig';

export async function createWorkout(workoutForm: IWorkoutFormState): Promise<IWorkoutResponse> {
    const workoutRequest = fromWorkoutFormToWorkoutRequest(workoutForm);
    return await request<ICreateWorkoutRequest>({
        method: 'POST',
        url: workoutEndpoints.createWorkout(),
        data: workoutRequest,
    });
}

function fromWorkoutFormToWorkoutRequest(workoutForm: IWorkoutFormState): ICreateWorkoutRequest {
    return {
        name: workoutForm.workout.name,
        exercises: workoutForm.workout.exercises.map((exerciseId, index) => {
            return {
                exerciseId,
                order: index + 1,
                sets: workoutForm.exercises[exerciseId].sets.map((setId, index) => {
                    return {
                        weight: workoutForm.sets[setId].weight ?? 0,
                        reps: workoutForm.sets[setId].reps ?? 0,
                        rpe: workoutForm.sets[setId].rpe ?? 0,
                        order: index + 1,
                    };
                }),
            };
        }),
    };
}
