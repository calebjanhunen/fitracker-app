import { useCallback, useState } from 'react';
import type { Exercise } from 'src/interfaces';

interface IUseSelectedExercisesFromModal {
    selectedExercises: Set<Exercise>;
    toggleExercise: (exercise: Exercise) => void;
}

export function useSelectedExercisesFromModal(): IUseSelectedExercisesFromModal {
    const [selectedExercises, setSelectedExercises] = useState<Set<Exercise>>(new Set());

    function addExercise(exercises: Set<Exercise>, exercise: Exercise): Set<Exercise> {
        const newSet = new Set(exercises);
        newSet.add(exercise);
        return newSet;
    }

    function removeExercise(exercises: Set<Exercise>, exercise: Exercise): Set<Exercise> {
        const newSet = new Set(exercises);
        newSet.delete(exercise);
        return newSet;
    }

    const toggleExercise = useCallback((exercise: Exercise): void => {
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
