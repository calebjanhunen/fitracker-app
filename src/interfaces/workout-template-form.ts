import { type SetType } from './set-type';

export interface IWorkoutTemplateForm {
    name: string;
    exercises: IWorkoutTemplateFormExercise[];
}

export interface IWorkoutTemplateFormExercise {
    id?: string;
    exerciseId: string;
    name: string;
    order: number;
    sets: IWorkoutTemplateFormSet[];
}

export interface IWorkoutTemplateFormSet {
    id?: string;
    frontendId: string;
    setType: SetType;
    order: number;
}
