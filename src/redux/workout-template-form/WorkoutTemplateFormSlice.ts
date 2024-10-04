import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IExerciseWithWorkoutDetailsResponse } from 'src/api/exercise-service/interfaces/responses/ExerciseResponse';
import { IWorkoutTemplateFormState } from './IWorkoutTemplateForm';

const initialState: IWorkoutTemplateFormState = {
    workoutTemplate: {
        name: '',
        exercises: [],
    },
    exercises: {},
    sets: {},
};

const workoutTemplateFormSlice = createSlice({
    name: 'workoutTemplateForm',
    initialState,
    reducers: {
        updateName: (state, action: PayloadAction<string>) => {
            state.workoutTemplate.name = action.payload;
        },
        addExercisesToWorkoutTemplate: (
            state,
            action: PayloadAction<{
                selectedExerciseIds: string[];
                allExercises: IExerciseWithWorkoutDetailsResponse[];
            }>
        ) => {
            const { selectedExerciseIds, allExercises } = action.payload;
            state.workoutTemplate.exercises.push(...selectedExerciseIds);
            allExercises
                .filter((e) => selectedExerciseIds.includes(e.id))
                .forEach((e) => {
                    state.exercises[e.id] = {
                        id: e.id,
                        name: e.name,
                        sets: [],
                    };
                });
        },
        addSetToExercise: (state, action: PayloadAction<{ exerciseId: string }>) => {
            const setId = Date.now().toString();
            state.exercises[action.payload.exerciseId].sets.push(setId);
            state.sets[setId] = {
                id: setId,
                weight: null,
                reps: null,
                rpe: null,
            };
        },
        deleteSetFromExercise: (
            state,
            action: PayloadAction<{ setId: string; exerciseId: string }>
        ) => {
            const { setId, exerciseId } = action.payload;
            state.exercises[exerciseId].sets = state.exercises[exerciseId].sets.filter(
                (id) => id !== setId
            );
            state.sets = _.omit(state.sets, setId);
        },
        deleteExerciseFromWorkoutTemplate: (
            state,
            action: PayloadAction<{ exerciseId: string }>
        ) => {
            const { exerciseId } = action.payload;
            state.workoutTemplate.exercises = state.workoutTemplate.exercises.filter(
                (id) => id !== exerciseId
            );
            state.exercises[exerciseId].sets.forEach(
                (setId) => (state.sets = _.omit(state.sets, setId))
            );
            state.exercises = _.omit(state.exercises, exerciseId);
        },
        reorderExercises: (state, action: PayloadAction<string[]>) => {
            state.workoutTemplate.exercises = action.payload;
        },
        clearWorkoutTemplate: (state) => {
            state.workoutTemplate = initialState.workoutTemplate;
            state.exercises = initialState.exercises;
            state.sets = initialState.sets;
        },
    },
});

export const {
    updateName,
    addExercisesToWorkoutTemplate,
    addSetToExercise,
    deleteSetFromExercise,
    deleteExerciseFromWorkoutTemplate,
    clearWorkoutTemplate,
    reorderExercises,
} = workoutTemplateFormSlice.actions;

export default workoutTemplateFormSlice.reducer;
