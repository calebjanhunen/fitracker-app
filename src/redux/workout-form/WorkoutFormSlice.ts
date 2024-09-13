import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IExerciseResponse } from 'src/api/exercise-service/interfaces/responses/ExerciseResponse';
import { IWorkoutFormState } from './IWorkoutForm';

const initialState: IWorkoutFormState = {
    workout: {
        name: '',
        createdAt: '',
        exercises: [],
    },
    exercises: {},
    sets: {},
};

const workoutFormSlice = createSlice({
    name: 'workoutForm',
    initialState,
    reducers: {
        updateName: (state, action: PayloadAction<string>) => {
            state.workout.name = action.payload;
        },
        addExercisesToWorkout: (
            state,
            action: PayloadAction<{
                selectedExerciseIds: string[];
                allExercises: IExerciseResponse[];
            }>
        ) => {
            const { selectedExerciseIds, allExercises } = action.payload;
            state.workout.exercises.push(...selectedExerciseIds);
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
        updateSetWeight: (
            state,
            action: PayloadAction<{ setId: string; weight: number | null }>
        ) => {
            state.sets[action.payload.setId].weight = action.payload.weight;
        },
        updateSetReps: (state, action: PayloadAction<{ setId: string; reps: number | null }>) => {
            state.sets[action.payload.setId].reps = action.payload.reps;
        },
        updateSetRpe: (state, action: PayloadAction<{ setId: string; rpe: number | null }>) => {
            state.sets[action.payload.setId].rpe = action.payload.rpe;
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
        deleteExerciseFromWorkout: (state, action: PayloadAction<{ exerciseId: string }>) => {
            const { exerciseId } = action.payload;
            state.workout.exercises = state.workout.exercises.filter((id) => id !== exerciseId);
            state.exercises[exerciseId].sets.forEach(
                (setId) => (state.sets = _.omit(state.sets, setId))
            );
            state.exercises = _.omit(state.exercises, exerciseId);
        },
        reorderExercises: (state, action: PayloadAction<string[]>) => {
            console.log(state.workout.exercises);
            state.workout.exercises = action.payload;
            console.log(state.workout.exercises);
        },
        clearWorkout: (state) => {
            state.workout = initialState.workout;
            state.exercises = initialState.exercises;
            state.sets = initialState.sets;
        },
    },
});

export const {
    updateName,
    addExercisesToWorkout,
    addSetToExercise,
    updateSetWeight,
    updateSetReps,
    updateSetRpe,
    deleteSetFromExercise,
    deleteExerciseFromWorkout,
    clearWorkout,
    reorderExercises,
} = workoutFormSlice.actions;

export default workoutFormSlice.reducer;
