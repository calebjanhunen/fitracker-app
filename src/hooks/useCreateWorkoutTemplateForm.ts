import { useCallback, useReducer } from 'react';

import type {
    ExerciseForWorkout,
    IWorkoutTemplateForm,
    IWorkoutTemplateFormExercise,
    SetType,
    WorkoutTemplate,
} from 'src/interfaces';
import {
    CreateWorkoutTemplateActionTypes,
    reducer,
} from 'src/state/reducers/create-workoute-template-reducer';

interface IUseCreateWorkoutTemplate {
    workoutTemplate: IWorkoutTemplateForm;
    updateWorkoutTemplateName: (text: string) => void;
    addExercises: (exercises: Set<ExerciseForWorkout>) => void;
    deleteExercise: (exerciseId: string) => void;
    addSet: (exerciseId: string, setOrder: number, setType: SetType) => void;
    deleteSet: (exerciseId: string, setId: string) => void;
    clearWorkoutTemplate: () => void;
    reorderExercises: (exercises: IWorkoutTemplateFormExercise[]) => void;
}

export function useCreateWorkoutTemplateForm(): IUseCreateWorkoutTemplate {
    const [workoutTemplate, dispatch] = useReducer(reducer, {
        name: '',
        exercises: [],
    });

    const updateWorkoutTemplateName = useCallback((text: string) => {
        dispatch({ type: CreateWorkoutTemplateActionTypes.UPDATE_NAME, name: text });
    }, []);

    // Add exercises from add exercises modal to workout form
    const addExercises = useCallback((exercises: Set<ExerciseForWorkout>) => {
        // Convert exercises from add exercise modal (of type ExerciseForWorkout) to exercises for workout (of type WorkoutFormExercise)
        const exerciseArr = Array.from(exercises).map((exercise, index) =>
            transformExerciseForWorkoutToWorkoutTemplateExercise(exercise, index)
        );
        dispatch({ type: CreateWorkoutTemplateActionTypes.ADD_EXERCISES, payload: exerciseArr });
    }, []);

    const deleteExercise = useCallback((exerciseId: string) => {
        dispatch({ type: CreateWorkoutTemplateActionTypes.DELETE_EXERCISE, payload: exerciseId });
    }, []);

    const addSet = useCallback((exerciseId: string, setOrder: number, setType: SetType) => {
        dispatch({
            type: CreateWorkoutTemplateActionTypes.ADD_SET,
            exerciseId,
            setOrder,
            setType,
        });
    }, []);

    const deleteSet = useCallback((exerciseId: string, setId: string) => {
        dispatch({ type: CreateWorkoutTemplateActionTypes.DELETE_SET, exerciseId, setId });
    }, []);

    const reorderExercises = useCallback((exercises: IWorkoutTemplateFormExercise[]) => {
        dispatch({ type: CreateWorkoutTemplateActionTypes.REORDER_EXERCISES, exercises });
    }, []);

    const clearWorkoutTemplate = useCallback(() => {
        dispatch({ type: CreateWorkoutTemplateActionTypes.CLEAR_WORKOUT });
    }, []);

    function transformExerciseForWorkoutToWorkoutTemplateExercise(
        exercise: ExerciseForWorkout,
        index: number
    ): IWorkoutTemplateFormExercise {
        const exerciseLen: number = workoutTemplate.exercises.length;
        return {
            name: exercise.name,
            exerciseId: exercise.id,
            order: exerciseLen + index + 1,
            sets: [],
        };
    }

    return {
        workoutTemplate,
        updateWorkoutTemplateName,
        addExercises,
        deleteExercise,
        addSet,
        deleteSet,
        clearWorkoutTemplate,
        reorderExercises,
    };
}
