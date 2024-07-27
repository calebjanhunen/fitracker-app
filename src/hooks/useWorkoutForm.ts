import { useCallback, useContext, useEffect } from 'react';

import uuid from 'react-native-uuid';

import type {
    ExerciseForWorkout,
    WorkoutForm,
    WorkoutTemplate,
    WorkoutTemplateExercise,
} from 'src/interfaces';
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

export function useWorkoutForm(workoutTemplate: WorkoutTemplate | null): IUseWorkoutForm {
    const { workout, dispatch } = useContext(WorkoutFormContext);

    useEffect(() => {
        if (!workout.createdAt) {
            // Add created at first time page is loaded
            updateCreatedAt();

            // Add workout template name, exercises and set on first load (when created at doesnt exist)
            addWorkoutTemplateToWorkoutForm();
        }
    }, []);

    const addWorkoutTemplateToWorkoutForm = useCallback(() => {
        if (!workoutTemplate) return;

        updateWorkoutName(workoutTemplate.name);

        // Convert exercises from workout template to exercises of type WorkoutFormExercise
        const exercises = workoutTemplate.exercises.map((e) => {
            return transformWorkoutTemplateExerciseForWorkout(e);
        });

        // Add converted exercises to workout form
        dispatch({ type: WorkoutFormActionTypes.ADD_EXERCISES, payload: exercises });
    }, []);

    const updateCreatedAt = useCallback(() => {
        dispatch({ type: WorkoutFormActionTypes.UPDATE_CREATED_AT });
    }, []);

    const updateWorkoutName = useCallback((text: string) => {
        dispatch({ type: WorkoutFormActionTypes.UPDATE_NAME, name: text });
    }, []);

    // Add exercises from add exercises modal to workout form
    const addExercises = useCallback((exercises: Set<ExerciseForWorkout>) => {
        // Convert exercises from add exercise modal (of type ExerciseForWorkout) to exercises for workout (of type WorkoutFormExercise)
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

    function transformWorkoutTemplateExerciseForWorkout(
        workoutTemplateExercise: WorkoutTemplateExercise
    ): WorkoutFormExercise {
        return {
            name: workoutTemplateExercise.name,
            id: workoutTemplateExercise.id,
            sets: workoutTemplateExercise.sets.map((set) => {
                return {
                    setOrder: set.order,
                    id: uuid.v4().toString(),
                    weight: 0,
                    reps: 0,
                    rpe: 0,
                };
            }),
            previousSets: workoutTemplateExercise.previousSets ?? [],
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
