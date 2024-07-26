import type { WorkoutTemplate } from 'src/interfaces';
import { API } from '../config/axios';

export const workoutTemplatesApi = {
    getWorkoutTemplates: async function (): Promise<WorkoutTemplate[]> {
        const response = await API.get<WorkoutTemplate[]>('/workout-templates');
        return response.data;
    },
};
