import { useCallback, useContext } from 'react';

import type { ExerciseInWorkout, WorkoutForm } from 'src/interfaces';
import { WorkoutFormContext } from 'src/state/context/workout-form-context';
import { WorkoutFormActionTypes } from 'src/state/reducers/workout-form-reducer';

interface IUseWorkoutForm {
    workout: WorkoutForm;
    updateWorkoutName: (text: string) => void;
    addExercises: (exercises: ExerciseInWorkout[]) => void;
    deleteExercise: (exerciseId: string) => void;
    addSet: (exerciseId: string) => void;
    updateSet: (
        exerciseId: string,
        setId: string,
        key: 'weight' | 'reps' | 'rpe',
        value: string
    ) => void;
    deleteSet: (exerciseId: string, setId: string) => void;
}

export function useWorkoutForm(): IUseWorkoutForm {
    const { workout, dispatch } = useContext(WorkoutFormContext);

    const updateWorkoutName = useCallback((text: string) => {
        dispatch({ type: WorkoutFormActionTypes.UPDATE_NAME, name: text });
    }, []);

    const addExercises = useCallback((exercises: ExerciseInWorkout[]) => {
        dispatch({ type: WorkoutFormActionTypes.ADD_EXERCISES, payload: exercises });
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
            dispatch({
                type: WorkoutFormActionTypes.UPDATE_SET,
                exerciseId,
                setId,
                updates: { [key]: parseInt(value) },
            });
        },
        []
    );

    return {
        workout,
        updateWorkoutName,
        addExercises,
        deleteExercise,
        addSet,
        deleteSet,
        updateSet,
    };
}
