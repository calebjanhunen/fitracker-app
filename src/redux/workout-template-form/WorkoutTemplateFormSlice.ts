import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { ExerciseResponseDto, ExerciseResponseDtoExerciseTypeEnum } from 'src/api/generated';
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
                allExercises: ExerciseResponseDto[];
            }>
        ) => {
            const { selectedExerciseIds, allExercises } = action.payload;
            state.workoutTemplate.exercises.push(...selectedExerciseIds);
            allExercises
                .filter((e) => selectedExerciseIds.includes(e.id))
                .forEach((e) => {
                    state.exercises[e.id] = {
                        id: e.id,
                        isVariation:
                            e.exerciseType === ExerciseResponseDtoExerciseTypeEnum.Variation,
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
        replaceExercise: (
            state,
            action: PayloadAction<{
                oldExerciseId: string;
                newExercise: ExerciseResponseDto;
            }>
        ) => {
            const { oldExerciseId, newExercise } = action.payload;
            const exerciseIndex = state.workoutTemplate.exercises.indexOf(oldExerciseId);
            if (exerciseIndex === -1) {
                return state;
            }

            // Replace exercise id in workout.exercises array
            state.workoutTemplate.exercises[exerciseIndex] = newExercise.id;

            // Create new exercise object
            state.exercises[newExercise.id] = {
                id: newExercise.id,
                name: newExercise.name,
                isVariation:
                    newExercise.exerciseType === ExerciseResponseDtoExerciseTypeEnum.Variation,
                sets: state.exercises[oldExerciseId].sets,
            };

            // Remove old exercise object
            state.exercises = _.omit(state.exercises, oldExerciseId);
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
    replaceExercise,
} = workoutTemplateFormSlice.actions;

export default workoutTemplateFormSlice.reducer;
