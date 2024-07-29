import type { ICreateWorkoutTemplate, WorkoutTemplate } from 'src/interfaces';
import { API } from '../config/axios';

export const workoutTemplatesApi = {
    getWorkoutTemplates: async function (): Promise<WorkoutTemplate[]> {
        const response = await API.get<WorkoutTemplate[]>('/workout-templates');
        return response.data;
    },
    saveWorkoutTemplate: async function(workoutTemplate: ICreateWorkoutTemplate): Promise<WorkoutTemplate> {
        const response = await API.post<WorkoutTemplate>('/workout-templates', workoutTemplate);
        return response.data;
    }
};
