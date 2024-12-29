import { apiClient } from '../client';
import {
    BodyPartDto,
    EquipmentDto,
    ExerciseDetailsDto,
    ExerciseRequestDto,
    ExerciseResponseDto,
    ExercisesApi,
    ExerciseWithWorkoutDetailsDto,
} from '../generated';

const exerciseApi = new ExercisesApi(undefined, undefined, apiClient);

export const exerciseApiService = {
    async getAllExercises(): Promise<ExerciseResponseDto[]> {
        const response = await exerciseApi.getAllExercises();
        return response.data;
    },
    async getEquipment(): Promise<EquipmentDto[]> {
        const response = await exerciseApi.getAllEquipment();
        return response.data;
    },
    async getBodyParts(): Promise<BodyPartDto[]> {
        const response = await exerciseApi.getAllBodyParts();
        return response.data;
    },
    async getExerciseDetails(id: string): Promise<ExerciseDetailsDto> {
        const response = await exerciseApi.getExerciseDetails(id);
        return response.data;
    },
    async getExercisesWithWorkoutDetails(): Promise<ExerciseWithWorkoutDetailsDto[]> {
        const response = await exerciseApi.getExercisesWithWorkoutDetails();
        return response.data;
    },
    async createExercise(request: ExerciseRequestDto): Promise<ExerciseResponseDto> {
        const response = await exerciseApi.createExercise(request);
        return response.data;
    },
    async updateExercise({
        id,
        request,
    }: {
        id: string;
        request: ExerciseRequestDto;
    }): Promise<ExerciseResponseDto> {
        const response = await exerciseApi.updateExercise(id, request);
        return response.data;
    },
    async deleteExercise(id: string): Promise<void> {
        await exerciseApi.deleteExercise(id);
    },
};
