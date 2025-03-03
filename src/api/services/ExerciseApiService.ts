import { apiClient } from '../client';
import {
    BodyPartDto,
    CreateExerciseVariationDto,
    EquipmentDto,
    ExerciseDetailsDto,
    ExerciseRequestDto,
    ExerciseResponseDto,
    ExercisesApi,
    ExerciseWithWorkoutDetailsDto,
    LookupItemDto,
    UpdateExerciseVariationDto,
} from '../generated';

const exerciseApi = new ExercisesApi(undefined, undefined, apiClient);

interface ICreateExerciseVariation {
    parentExerciseId: string;
    dto: CreateExerciseVariationDto;
}

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
    async getCableAttachments(): Promise<LookupItemDto[]> {
        const response = await exerciseApi.getAllCableAttachments();
        return response.data;
    },
    async getExerciseDetails(id: string, isVariation: boolean): Promise<ExerciseDetailsDto> {
        const response = await exerciseApi.getExerciseDetails(id, isVariation);
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
    async createExerciseVariation(request: ICreateExerciseVariation): Promise<void> {
        await exerciseApi.createExerciseVariation(request.parentExerciseId, request.dto);
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
    async updateExerciseVariation({
        exerciseVariationId,
        request,
    }: {
        exerciseVariationId: string;
        request: UpdateExerciseVariationDto;
    }): Promise<ExerciseResponseDto> {
        const response = await exerciseApi.updateExerciseVaration(exerciseVariationId, request);
        return response.data;
    },
    async deleteExercise(id: string): Promise<void> {
        await exerciseApi.deleteExercise(id);
    },
};
