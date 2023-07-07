import { type Exercise } from './Exercise';

export interface Workout {
    name: string;
    dateCreated: string;
    exercises: Exercise[];
}
