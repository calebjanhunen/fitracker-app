export interface WorkoutTemplate {
    name: string;
    exercises: WorkoutTemplateExercise[];
}

export interface WorkoutTemplateExercise {
    name: string;
    sets: number;
}
