import type { IWorkoutTemplateForm, SetType, WorkoutTemplate } from 'src/interfaces';
import { API } from '../config/axios';

interface IWorkoutTemplatePostRequest {
    name: string;
    exercises: IWorkoutTemplateExercisePostRequest[];
}

interface IWorkoutTemplateExercisePostRequest {
    exerciseId: string;
    name: string;
    order: number;
    sets: IWorkoutTemplateSetPostRequest[];
}

interface IWorkoutTemplateSetPostRequest {
    setType: SetType;
    order: number;
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
                sets: e.sets.map((set) => ({
                    setType: set.setType,
                    order: set.order,
                })),
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
