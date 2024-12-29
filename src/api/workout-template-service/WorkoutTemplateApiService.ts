import { IWorkoutTemplateFormState } from 'src/redux/workout-template-form/IWorkoutTemplateForm';
import { request } from '../client';
import { WorkoutTemplateResponseDto } from '../generated';
import { ICreateWorkoutTemplateRequest } from './requests/ICreateWorkoutTemplateRequest';
import { workoutTemplateEndpoints } from './WorkoutTemplateApiConfig';

export async function getAllWorkoutTemplates(): Promise<WorkoutTemplateResponseDto[]> {
    return await request({
        method: 'GET',
        url: workoutTemplateEndpoints.getAllWorkoutTemplates(),
    });
}

export async function createWorkoutTemplate(
    workoutTemplateForm: IWorkoutTemplateFormState
): Promise<WorkoutTemplateResponseDto> {
    const requestBody = fromWorkoutTemplateFormToWorkoutTemplateRequest(workoutTemplateForm);
    return await request({
        method: 'POST',
        url: workoutTemplateEndpoints.createWorkoutTemplate(),
        data: requestBody,
    });
}

export async function deleteWorkoutTemplate(id: string): Promise<void> {
    await request({
        method: 'DELETE',
        url: workoutTemplateEndpoints.deleteWorkoutTemplate(id),
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
