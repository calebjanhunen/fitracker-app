import { type Exercise } from 'src/interfaces';
import { type PaginationResponse } from 'src/interfaces/api-responses/pagination-response';
import { API } from '../config/axios';

export const exercisesAPI = {
    getExercises: async function (
        page: number,
        limit: number
    ): Promise<PaginationResponse<Exercise>> {
        const response = await API.get<PaginationResponse<Exercise>>('/exercises', {
            params: { page, limit },
        });
        return response.data;
    },
    createExercise: async function ({
        name,
        primaryMuscle,
        equipment,
    }: {
        name: string;
        primaryMuscle: string;
        equipment: string;
    }): Promise<Exercise> {
        const response = await API.post('/exercises', {
            name,
            primaryMuscle,
            equipment,
            difficultyLevel: 'beginner',
            instructions: [],
        });
        return response.data;
    },
};
