import type { SetType } from './set-type';
import type { WorkoutFormSet } from './workout-form';

export interface WorkoutTemplate {
    id: string;
    name: string;
    exercises: WorkoutTemplateExercise[];
}

export interface WorkoutTemplateExercise {
    id: string;
    name: string;
    order: number;
    sets: WorkoutTemplateSet[];
    previousSets: WorkoutFormSet[];
}

export interface WorkoutTemplateSet {
    id: string;
    setType: SetType;
    order: number;
}
