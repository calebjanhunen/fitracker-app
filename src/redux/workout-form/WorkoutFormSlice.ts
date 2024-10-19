import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IExerciseWithWorkoutDetailsResponse } from 'src/api/exercise-service/interfaces/responses/ExerciseResponse';
import { IWorkoutTemplateResponse } from 'src/api/workout-template-service/responses/IWorkoutTemplateResponse';
import { IWorkoutFormState } from './IWorkoutForm';

const initialState: IWorkoutFormState = {
    workout: {
        name: '',
        createdAt: '',
        exercises: [],
    },
    exercises: {},
    sets: {},
    recentSets: {},
};

const workoutFormSlice = createSlice({
    name: 'workoutForm',
    initialState,
    reducers: {
        loadWorkoutOnRender: (state, action: PayloadAction<IWorkoutFormState>) => {
            state.workout = action.payload.workout;
            state.exercises = action.payload.exercises;
            state.sets = action.payload.sets;
            state.recentSets = action.payload.recentSets;
        },
        updatedCreatedAt: (state) => {
            state.workout.createdAt = new Date().toISOString();
        },
        updateName: (state, action: PayloadAction<string>) => {
            state.workout.name = action.payload;
        },
        addExercisesToWorkout: (
            state,
            action: PayloadAction<{
                selectedExerciseIds: string[];
                allExercises: IExerciseWithWorkoutDetailsResponse[];
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
                        recentSets: e.recentSets.map((recentSet) => recentSet.id),
                    };

                    e.recentSets.forEach((recentSet) => {
                        state.recentSets[recentSet.id] = recentSet;
                    });
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

            // Remove the exerciseId from the workout.exercises array
            state.workout.exercises = state.workout.exercises.filter((id) => id !== exerciseId);

            // Remove the exercise's sets and recent sets
            state.exercises[exerciseId].sets.forEach(
                (setId) => (state.sets = _.omit(state.sets, setId))
            );
            state.exercises[exerciseId].recentSets.forEach((recentSetId) => {
                state.recentSets = _.omit(state.recentSets, recentSetId);
            });

            // Remove exercise object
            state.exercises = _.omit(state.exercises, exerciseId);
        },
        reorderExercises: (state, action: PayloadAction<string[]>) => {
            state.workout.exercises = action.payload;
        },
        clearWorkout: (state) => {
            state.workout = initialState.workout;
            state.exercises = initialState.exercises;
            state.sets = initialState.sets;
            state.recentSets = initialState.recentSets;
        },
        initializeWorkoutFromTemplate: (
            state,
            action: PayloadAction<{
                template: IWorkoutTemplateResponse;
                exerciseDetails: IExerciseWithWorkoutDetailsResponse[];
            }>
        ) => {
            const { template, exerciseDetails } = action.payload;
            state.workout.createdAt = new Date().toISOString();
            state.workout.name = template.name;
            state.workout.exercises = template.exercises.map((e) => e.exerciseId);

            // Get the exercise details for the current exercise
            template.exercises.forEach((e) => {
                const matchedExerciseDetails = exerciseDetails.find(
                    (exDetails) => exDetails.id === e.exerciseId
                );
                state.exercises[e.exerciseId] = {
                    id: e.exerciseId,
                    name: e.exerciseName,
                    recentSets: matchedExerciseDetails?.recentSets.map((set) => set.id) ?? [],
                    sets: e.sets.map((set) => set.id),
                };

                // Add sets from workout template to set Record in workout form state
                e.sets.forEach((set) => {
                    state.sets[set.id] = {
                        id: set.id,
                        weight: null,
                        reps: null,
                        rpe: null,
                    };
                });

                // Add recent sets from the matched exercise to recent sets Record in workout form state
                matchedExerciseDetails?.recentSets.forEach((e) => {
                    state.recentSets[e.id] = {
                        id: e.id,
                        weight: e.weight,
                        reps: e.reps,
                        rpe: e.rpe,
                    };
                });
            });
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
    loadWorkoutOnRender,
    updatedCreatedAt,
    initializeWorkoutFromTemplate,
} = workoutFormSlice.actions;

export default workoutFormSlice.reducer;
