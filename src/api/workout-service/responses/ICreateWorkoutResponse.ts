import { IWorkoutResponse } from './IWorkoutResponse';

export interface ICreateWorkoutResponse {
    workout: IWorkoutResponse;
    workoutStats: WorkoutStatsDto;
}

interface WorkoutStatsDto {
    xpGainedFromWeeklyGoal: number;
    totalGainedXp: number;
    totalUserXp: number;
}
