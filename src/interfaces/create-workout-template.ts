import type { WorkoutTemplateSet } from './workout-template';

export interface ICreateWorkoutTemplate {
    name: string;
    exercises: ICreateWorkoutTemplateExercise[];
}

export interface ICreateWorkoutTemplateExercise {
    id: string;
    name: string;
    order: number;
    sets: WorkoutTemplateSet[];
}
