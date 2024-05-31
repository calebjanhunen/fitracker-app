import { useCallback, useContext } from 'react';

import type { ExerciseForWorkout, ExerciseInWorkout, WorkoutForm } from 'src/interfaces';
import { WorkoutFormContext } from 'src/state/context/workout-form-context';
import { WorkoutFormActionTypes } from 'src/state/reducers/workout-form-reducer';

interface IUseWorkoutForm {
    workout: WorkoutForm;
    updateWorkoutName: (text: string) => void;
    addExercises: (exercises: Set<ExerciseForWorkout>) => void;
    deleteExercise: (exerciseId: string) => void;
    addSet: (exerciseId: string) => void;
    updateSet: (
        exerciseId: string,
        setId: string,
        key: 'weight' | 'reps' | 'rpe',
        value: string
    ) => void;
    deleteSet: (exerciseId: string, setId: string) => void;
    clearWorkout: () => void;
}

export function useWorkoutForm(): IUseWorkoutForm {
    const { workout, dispatch } = useContext(WorkoutFormContext);

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

    const addSet = useCallback((exerciseId: string) => {
        dispatch({ type: WorkoutFormActionTypes.ADD_SET, payload: exerciseId });
    }, []);

    const deleteSet = useCallback((exerciseId: string, setId: string) => {
        dispatch({ type: WorkoutFormActionTypes.DELETE_SET, exerciseId, setId });
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

    function transformExerciseForWorkout(exercise: ExerciseForWorkout): ExerciseInWorkout {
        return {
            name: exercise.name,
            id: exercise.id,
            sets: [],
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
    };
}
