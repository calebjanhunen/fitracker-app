import { useCallback, useState } from 'react';
import type { ExerciseForWorkout } from 'src/interfaces';

interface IUseSelectedExercisesFromModal {
    selectedExercises: Set<ExerciseForWorkout>;
    toggleExercise: (exercise: ExerciseForWorkout) => void;
    clearSelectedExercises: () => void;
}

export function useSelectedExercisesFromModal(): IUseSelectedExercisesFromModal {
    const [selectedExercises, setSelectedExercises] = useState<Set<ExerciseForWorkout>>(new Set());

    function addExercise(
        exercises: Set<ExerciseForWorkout>,
        exercise: ExerciseForWorkout
    ): Set<ExerciseForWorkout> {
        const newSet = new Set(exercises);
        newSet.add(exercise);
        return newSet;
    }

    function removeExercise(
        exercises: Set<ExerciseForWorkout>,
        exercise: ExerciseForWorkout
    ): Set<ExerciseForWorkout> {
        const newSet = new Set(exercises);
        newSet.delete(exercise);
        return newSet;
    }

    const toggleExercise = useCallback((exercise: ExerciseForWorkout): void => {
        setSelectedExercises((prev) => {
            return prev.has(exercise)
                ? removeExercise(prev, exercise)
                : addExercise(prev, exercise);
        });
    }, []);

    const clearSelectedExercises = useCallback(() => {
        setSelectedExercises(new Set());
    }, []);

    return {
        selectedExercises,
        toggleExercise,
        clearSelectedExercises,
    };
}
