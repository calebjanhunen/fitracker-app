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
}

export interface IWorkoutTemplateFormState {
    workoutTemplate: IWorkoutTemplateForm;
    exercises: Record<string, IWorkoutTemplateExerciseForm>;
    sets: Record<string, IWorkoutTemplateSetForm>;
}
