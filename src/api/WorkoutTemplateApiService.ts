import { apiClient } from './client';
import {
    WorkoutTemplateRequestDto,
    WorkoutTemplateResponseDto,
    WorkoutTemplatesApi,
} from './generated';

const workoutTemplatesApi = new WorkoutTemplatesApi(undefined, undefined, apiClient);

export const workoutTemplateApiService = {
    async getAllWorkoutTemplates(): Promise<WorkoutTemplateResponseDto[]> {
        const response = await workoutTemplatesApi.getAllWorkoutTemplates();
        return response.data;
    },
    async createWorkoutTemplate(
        request: WorkoutTemplateRequestDto
    ): Promise<WorkoutTemplateResponseDto> {
        const response = await workoutTemplatesApi.createWorkoutTemplate(request);
        return response.data;
    },
    async deleteWorkoutTemplate(id: string) {
        await workoutTemplatesApi.deleteWorkoutTemplate(id);
    },
};
