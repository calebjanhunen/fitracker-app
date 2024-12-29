import { apiClient } from '../client';
import {
    CreateWorkoutResponseDto,
    WorkoutRequestDto,
    WorkoutResponseDto,
    WorkoutsApi,
} from '../generated';

const workoutApi = new WorkoutsApi(undefined, undefined, apiClient);

export const workoutApiService = {
    async getWorkouts(): Promise<WorkoutResponseDto[]> {
        const response = await workoutApi.getAllWorkouts();
        return response.data;
    },
    async createWorkout(request: WorkoutRequestDto): Promise<CreateWorkoutResponseDto> {
        const response = await workoutApi.createWorkout(request);
        return response.data;
    },
    async deleteWorkout(workoutId: string): Promise<void> {
        await workoutApi.deleteWorkout(workoutId);
    },
};
