import { apiClient } from '../client';
import {
    CreateWorkoutResponseDto,
    DeleteWorkoutDto,
    WorkoutRequestDto,
    WorkoutsApi,
    WorkoutSummaryDto,
} from '../generated';

const workoutApi = new WorkoutsApi(undefined, undefined, apiClient);

export const workoutApiService = {
    async getWorkouts(): Promise<WorkoutSummaryDto[]> {
        const response = await workoutApi.getWorkoutSummaries();
        return response.data;
    },
    async createWorkout(request: WorkoutRequestDto): Promise<CreateWorkoutResponseDto> {
        const response = await workoutApi.createWorkout(request);
        return response.data;
    },
    async deleteWorkout(workoutId: string): Promise<DeleteWorkoutDto> {
        const response = await workoutApi.deleteWorkout(workoutId);
        return response.data;
    },
};
