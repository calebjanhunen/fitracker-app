export interface Workout {
    name: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    exercises: ExerciseInWorkout[];
}

interface ExerciseInWorkout {
    name: string;
    id: string;
    sets: SetInWorkout[];
}

interface SetInWorkout {
    id: string;
    weight: number;
    reps: number;
    rpe: number;
}
