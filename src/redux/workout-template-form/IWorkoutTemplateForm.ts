interface IWorkoutTemplateForm {
    name: string;
    exercises: string[];
}

export interface IWorkoutTemplateExerciseForm {
    id: string;
    name: string;
    sets: string[];
}

export interface IWorkoutTemplateSetForm {
    id: string;
    weight: number | null;
    reps: number | null;
    rpe: number | null;
}

export interface IWorkoutTemplateFormState {
    workoutTemplate: IWorkoutTemplateForm;
    exercises: Record<string, IWorkoutTemplateExerciseForm>;
    sets: Record<string, IWorkoutTemplateSetForm>;
}
