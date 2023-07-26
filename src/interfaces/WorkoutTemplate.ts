export interface WorkoutTemplate {
    name: string;
    exercises: WorkoutTemplateExercise[];
}

export interface WorkoutTemplateExercise {
    name: string;
    id: string | number[];
    numSets: number;
}
