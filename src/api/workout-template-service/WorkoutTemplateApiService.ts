import { IWorkoutTemplateFormState } from 'src/redux/workout-template-form/IWorkoutTemplateForm';
import { request } from '../client';
import { ICreateWorkoutTemplateRequest } from './requests/ICreateWorkoutTemplateRequest';
import { IWorkoutTemplateResponse } from './responses/IWorkoutTemplateResponse';
import { workoutTemplateEndpoints } from './WorkoutTemplateApiConfig';

export async function getAllWorkoutTemplates(): Promise<IWorkoutTemplateResponse[]> {
    return await request({
        method: 'GET',
        url: workoutTemplateEndpoints.getAllWorkoutTemplates(),
    });
}

export async function createWorkoutTemplate(
    workoutTemplateForm: IWorkoutTemplateFormState
): Promise<IWorkoutTemplateResponse> {
    const requestBody = fromWorkoutTemplateFormToWorkoutTemplateRequest(workoutTemplateForm);
    return await request({
        method: 'POST',
        url: workoutTemplateEndpoints.createWorkoutTemplate(),
        data: requestBody,
    });
}

function fromWorkoutTemplateFormToWorkoutTemplateRequest(
    workoutTemplateForm: IWorkoutTemplateFormState
): ICreateWorkoutTemplateRequest {
    return {
        name: workoutTemplateForm.workoutTemplate.name,
        exercises: workoutTemplateForm.workoutTemplate.exercises.map((exerciseId, index) => {
            return {
                exerciseId,
                order: index + 1,
                sets: workoutTemplateForm.exercises[exerciseId].sets.map((_, index) => {
                    return {
                        order: index + 1,
                    };
                }),
            };
        }),
    };
}
