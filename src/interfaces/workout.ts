export interface Workout {
    name: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    exercises: ExerciseInWorkout[];
}

export interface ExerciseInWorkout {
    name: string;
    id: string;
    sets: SetInWorkout[];
}

export interface SetInWorkout {
    id: string;
    weight: number;
    reps: number;
    rpe: number;
    setOrder: number;
}
