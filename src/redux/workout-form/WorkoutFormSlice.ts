import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IWorkoutExerciseForm, IWorkoutFormState, IWorkoutSetForm } from './IWorkoutForm';

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
        addExercise: (state, action: PayloadAction<IWorkoutExerciseForm>) => {
            state.workout.exercises.push(action.payload.id);
            state.exercises[action.payload.id] = action.payload;
        },
        addSetToExercise: (
            state,
            action: PayloadAction<{ exerciseId: string; set: IWorkoutSetForm }>
        ) => {
            state.exercises[action.payload.exerciseId].sets.push(action.payload.set.id);
            state.sets[action.payload.set.id] = action.payload.set;
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
        clearWorkout: (state) => {
            state.workout = initialState.workout;
            state.exercises = initialState.exercises;
            state.sets = initialState.sets;
        },
    },
});

export const {
    updateName,
    addExercise,
    addSetToExercise,
    updateSetWeight,
    updateSetReps,
    updateSetRpe,
    deleteSetFromExercise,
    deleteExerciseFromWorkout,
    clearWorkout,
} = workoutFormSlice.actions;

export default workoutFormSlice.reducer;
