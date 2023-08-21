import { useContext } from 'react';

import { type Exercise } from '../interfaces/Exercise';
import { ExercisesActionsTypes } from '../services/context/WorkoutExercisesContext/ExercisesReducer';
import { WorkoutExercisesContext } from '../services/context/WorkoutExercisesContext/WorkoutExercisesContext';

interface UseWorkoutExercises {
    workoutExercises: Exercise[];
    addExercisesToWorkout: (exercises: Exercise[]) => void;
    deleteAllExercises: () => void;
    deleteExercise: (id: number) => void;
}

export function useWorkoutExercises(): UseWorkoutExercises {
    const { workoutExercises, dispatchExercises } = useContext(WorkoutExercisesContext);

    function addExercisesToWorkout(exercises: Exercise[]): void {
        dispatchExercises({ type: ExercisesActionsTypes.ADD_EXERCISES, payload: exercises });
    }

    function deleteAllExercises(): void {
        dispatchExercises({ type: ExercisesActionsTypes.DELETE_ALL_EXERCISES });
    }

    function deleteExercise(id: number): void {
        dispatchExercises({ type: ExercisesActionsTypes.DELETE_EXERCISE, payload: { id } });
    }

    return { workoutExercises, addExercisesToWorkout, deleteExercise, deleteAllExercises };
}
