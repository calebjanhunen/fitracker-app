import type { IWorkoutTemplateForm, WorkoutTemplate, WorkoutTemplateSet } from 'src/interfaces';
import { API } from '../config/axios';

interface IWorkoutTemplatePostRequest {
    name: string;
    exercises: IWorkoutTemplateExercisePostRequest[];
}

interface IWorkoutTemplateExercisePostRequest {
    exerciseId: string;
    name: string;
    order: number;
    sets: WorkoutTemplateSet[];
}
export const workoutTemplatesApi = {
    getWorkoutTemplates: async function (): Promise<WorkoutTemplate[]> {
        const response = await API.get<WorkoutTemplate[]>('/workout-templates');
        return response.data;
    },
    saveWorkoutTemplate: async function (
        workoutTemplate: IWorkoutTemplateForm
    ): Promise<WorkoutTemplate> {
        const workoutTemplatePostRequest: IWorkoutTemplatePostRequest = {
            name: workoutTemplate.name,
            exercises: workoutTemplate.exercises.map((e) => ({
                exerciseId: e.exerciseId,
                order: e.order,
                name: e.name,
                sets: e.sets,
            })),
        };
        const response = await API.post<WorkoutTemplate>(
            '/workout-templates',
            workoutTemplatePostRequest
        );
        return response.data;
    },
    deleteWorkoutTemplate: async function (id: string): Promise<void> {
        await API.delete(`/workout-templates/${id}`);
    },
};
