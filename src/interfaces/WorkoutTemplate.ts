import { type Exercise } from './Exercise';

export interface WorkoutTemplate {
    name: string;
    exercises: Exercise[];
}
