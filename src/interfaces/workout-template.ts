export interface WorkoutTemplate {
    name: string;
    exercises: WorkoutTemplateExercise[];
}

export interface WorkoutTemplateExercise {
    id: string;
    name: string;
    order: number;
    sets: WorkoutTemplateSet[];
}

export interface WorkoutTemplateSet {
    setType: 'working' | 'warmup';
    order: number;
}
