import { BodyPart } from 'src/enums/BodyPart';

export interface IExerciseResponse {
    id: string;
    name: string;
    bodyPart: BodyPart;
    equipment: string;
    isCustom: boolean;
}

export interface IExerciseWithWorkoutDetailsResponse {
    id: string;
    name: string;
    bodyPart: BodyPart;
    numTimesUsed: number;
    recentSets: IRecentSet[];
}

export interface IRecentSet {
    id: string;
    weight: number;
    reps: number;
    rpe: number;
}
