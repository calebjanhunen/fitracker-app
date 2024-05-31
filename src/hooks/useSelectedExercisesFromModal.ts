import { useCallback, useState } from 'react';
import type { ExercisesForWorkout } from 'src/interfaces';

interface IUseSelectedExercisesFromModal {
    selectedExercises: Set<ExercisesForWorkout>;
    toggleExercise: (exercise: ExercisesForWorkout) => void;
}

export function useSelectedExercisesFromModal(): IUseSelectedExercisesFromModal {
    const [selectedExercises, setSelectedExercises] = useState<Set<ExercisesForWorkout>>(new Set());

    function addExercise(
        exercises: Set<ExercisesForWorkout>,
        exercise: ExercisesForWorkout
    ): Set<ExercisesForWorkout> {
        const newSet = new Set(exercises);
        newSet.add(exercise);
        return newSet;
    }

    function removeExercise(
        exercises: Set<ExercisesForWorkout>,
        exercise: ExercisesForWorkout
    ): Set<ExercisesForWorkout> {
        const newSet = new Set(exercises);
        newSet.delete(exercise);
        return newSet;
    }

    const toggleExercise = useCallback((exercise: ExercisesForWorkout): void => {
        setSelectedExercises((prev) => {
            return prev.has(exercise)
                ? removeExercise(prev, exercise)
                : addExercise(prev, exercise);
        });
    }, []);

    return {
        selectedExercises,
        toggleExercise,
    };
}
