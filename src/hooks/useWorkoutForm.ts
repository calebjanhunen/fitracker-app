import { useCallback, useContext, useEffect } from 'react';

import type { ExerciseForWorkout, WorkoutForm } from 'src/interfaces';
import type { WorkoutFormExercise } from 'src/interfaces/workout-form';
import { WorkoutFormContext } from 'src/state/context/workout-form-context';
import { WorkoutFormActionTypes } from 'src/state/reducers/workout-form-reducer';

interface IUseWorkoutForm {
    workout: WorkoutForm;
    updateWorkoutName: (text: string) => void;
    addExercises: (exercises: Set<ExerciseForWorkout>) => void;
    deleteExercise: (exerciseId: string) => void;
    addSet: (exerciseId: string, setOrder: number) => void;
    updateSet: (
        exerciseId: string,
        setId: string,
        key: 'weight' | 'reps' | 'rpe',
        value: string
    ) => void;
    deleteSet: (exerciseId: string, setId: string) => void;
    clearWorkout: () => void;
    updateCreatedAt: () => void;
    reorderExercises: (exercises: WorkoutFormExercise[]) => void;
}

export function useWorkoutForm(): IUseWorkoutForm {
    const { workout, dispatch } = useContext(WorkoutFormContext);

    useEffect(() => {
        if (!workout.createdAt) updateCreatedAt();
    }, []);

    const updateCreatedAt = useCallback(() => {
        dispatch({ type: WorkoutFormActionTypes.UPDATE_CREATED_AT });
    }, []);

    const updateWorkoutName = useCallback((text: string) => {
        dispatch({ type: WorkoutFormActionTypes.UPDATE_NAME, name: text });
    }, []);

    const addExercises = useCallback((exercises: Set<ExerciseForWorkout>) => {
        const exerciseArr = Array.from(exercises).map((exercise) =>
            transformExerciseForWorkout(exercise)
        );
        dispatch({ type: WorkoutFormActionTypes.ADD_EXERCISES, payload: exerciseArr });
    }, []);

    const deleteExercise = useCallback((exerciseId: string) => {
        dispatch({ type: WorkoutFormActionTypes.DELETE_EXERCISE, payload: exerciseId });
    }, []);

    const addSet = useCallback((exerciseId: string, setOrder: number) => {
        dispatch({
            type: WorkoutFormActionTypes.ADD_SET,
            exerciseId,
            setOrder,
        });
    }, []);

    const deleteSet = useCallback((exerciseId: string, setId: string) => {
        dispatch({ type: WorkoutFormActionTypes.DELETE_SET, exerciseId, setId });
    }, []);

    const reorderExercises = useCallback((exercises: WorkoutFormExercise[]) => {
        dispatch({ type: WorkoutFormActionTypes.REORDER_EXERCISES, exercises });
    }, []);

    const updateSet = useCallback(
        (
            exerciseId: string,
            setId: string,
            key: 'weight' | 'reps' | 'rpe',
            value: string
        ): void => {
            if (value === '') {
                value = '0';
            }
            dispatch({
                type: WorkoutFormActionTypes.UPDATE_SET,
                exerciseId,
                setId,
                updates: { [key]: parseInt(value) },
            });
        },
        []
    );

    const clearWorkout = useCallback(() => {
        dispatch({ type: WorkoutFormActionTypes.CLEAR_WORKOUT });
    }, []);

    function transformExerciseForWorkout(exercise: ExerciseForWorkout): WorkoutFormExercise {
        return {
            name: exercise.name,
            id: exercise.id,
            sets: [],
            previousSets: exercise.previousSets,
        };
    }

    return {
        workout,
        updateWorkoutName,
        addExercises,
        deleteExercise,
        addSet,
        deleteSet,
        updateSet,
        clearWorkout,
        updateCreatedAt,
        reorderExercises,
    };
}
