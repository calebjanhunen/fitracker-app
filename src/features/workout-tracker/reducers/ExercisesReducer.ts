import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

import { type Exercise, type ExerciseSet } from '../../../interfaces/Exercise';

export enum ExercisesActionsTypes {
    ADD_EXERCISES = 'add-exercises',
    DELETE_EXERCISE = 'delete-exercise',
    DELETE_ALL_EXERCISES = 'delete-all-exercises',
    ADD_SET = 'add-set',
    DELETE_SET = 'delete-set',
    UPDATE_SET_WEIGHT = 'update-set-weight',
    UPDATE_SET_REPS = 'update-set-reps',
    VALIDATE_EXERCISE = 'validate-exercise',
    VALIDATE_SET = 'validate-set',
    REORDER_EXERCISES = 'reorder-exercises',
}

export type ExercisesActions =
    | {
          type: ExercisesActionsTypes.ADD_EXERCISES;
          payload: Exercise[];
      }
    | {
          type: ExercisesActionsTypes.DELETE_EXERCISE;
          payload: { id: number };
      }
    | {
          type: ExercisesActionsTypes.DELETE_ALL_EXERCISES;
      }
    | {
          type: ExercisesActionsTypes.ADD_SET;
          payload: {
              exerciseId: number;
          };
      }
    | {
          type: ExercisesActionsTypes.DELETE_SET;
          payload: {
              exerciseId: number;
              setId: string | number[] | number;
          };
      }
    | {
          type: ExercisesActionsTypes.UPDATE_SET_WEIGHT;
          payload: {
              exerciseId: number;
              setId: string | number[] | number;
              weight: number;
          };
      }
    | {
          type: ExercisesActionsTypes.UPDATE_SET_REPS;
          payload: {
              exerciseId: number;
              setId: string | number[] | number;
              reps: number;
          };
      }
    | {
          type: ExercisesActionsTypes.VALIDATE_EXERCISE;
          payload: {
              valid: boolean;
              exerciseId: number;
          };
      }
    | {
          type: ExercisesActionsTypes.VALIDATE_SET;
          payload: {
              valid: boolean;
              exerciseId: number;
              setId: string | number[] | number;
          };
      }
    | {
          type: ExercisesActionsTypes.REORDER_EXERCISES;
          payload: {
              exercises: Exercise[];
          };
      };

export function exercisesReducer(exercises: Exercise[], action: ExercisesActions): Exercise[] {
    switch (action.type) {
        case ExercisesActionsTypes.ADD_EXERCISES:
            return [...exercises, ...action.payload];
        case ExercisesActionsTypes.DELETE_EXERCISE:
            return exercises.filter((exercise) => exercise.id !== action.payload?.id);
        case ExercisesActionsTypes.DELETE_ALL_EXERCISES:
            return [];
        case ExercisesActionsTypes.ADD_SET:
            return exercises.map((exercise) =>
                exercise.id === action.payload.exerciseId
                    ? {
                          ...exercise,
                          sets: [
                              ...exercise.sets,
                              {
                                  id: uuid.v4(),
                                  exerciseId: action.payload.exerciseId,
                                  weight: null,
                                  reps: null,
                                  rpe: null,
                                  valid: false,
                              },
                          ],
                      }
                    : exercise
            );
        case ExercisesActionsTypes.DELETE_SET:
            return deleteSet(exercises, action.payload.exerciseId, action.payload.setId);
        case ExercisesActionsTypes.UPDATE_SET_WEIGHT:
            return updateSetVal(
                exercises,
                action.payload.setId,
                action.payload.exerciseId,
                'weight',
                action.payload.weight
            );
        case ExercisesActionsTypes.UPDATE_SET_REPS:
            return updateSetVal(
                exercises,
                action.payload.setId,
                action.payload.exerciseId,
                'reps',
                action.payload.reps
            );
        case ExercisesActionsTypes.VALIDATE_EXERCISE:
            return validateExercise(exercises, action.payload.exerciseId, action.payload.valid);
        case ExercisesActionsTypes.VALIDATE_SET:
            return validateSet(
                exercises,
                action.payload.exerciseId,
                action.payload.setId,
                action.payload.valid
            );
        case ExercisesActionsTypes.REORDER_EXERCISES:
            return action.payload.exercises;
        default:
            return exercises;
    }
}

function getExercise(exercises: Exercise[], exerciseId: number): Exercise {
    return exercises.filter((exercise) => exercise.id === exerciseId)[0];
}

function getSet(exercise: Exercise, setId: string | number[] | number): ExerciseSet {
    return exercise.sets.filter((set) => set.id === setId)[0];
}

function updateSetVal(
    exercises: Exercise[],
    setId: string | number[] | number,
    exerciseId: number,
    propertyToUpdate: keyof ExerciseSet,
    val: number
): Exercise[] {
    const exerciseToEdit = exercises.find((exercise) => exercise.id === exerciseId);
    if (!exerciseToEdit) {
        return exercises;
    }

    const setToEdit = exerciseToEdit.sets.find((set) => set.id === setId);
    if (!setToEdit) {
        return exercises;
    }

    const newSet = { ...setToEdit, [propertyToUpdate]: val };
    const newExercise = {
        ...exerciseToEdit,
        sets: exerciseToEdit.sets.map((set) => (set.id === setId ? newSet : set)),
    };
    const newExercises = exercises.map((exercise) =>
        exercise.id === exerciseId ? newExercise : exercise
    );
    return newExercises;
}

function deleteSet(
    exercises: Exercise[],
    exerciseId: number,
    setId: string | number[] | number
): Exercise[] {
    const exerciseToEdit = exercises.find((exercise) => exercise.id === exerciseId);
    if (!exerciseToEdit) {
        return exercises;
    }
    const newSets = exerciseToEdit.sets.filter((set) => set.id !== setId);
    const newExercise = { ...exerciseToEdit, sets: newSets };
    return exercises.map((exercise) => (exercise.id === exerciseId ? newExercise : exercise));
}

function validateExercise(exercises: Exercise[], exerciseId: number, isValid: boolean): Exercise[] {
    const exerciseToUpdate = getExercise(exercises, exerciseId);

    const updatedExercise = { ...exerciseToUpdate, valid: isValid };

    return exercises.map((exercise) => (exercise.id === exerciseId ? updatedExercise : exercise));
}

function validateSet(
    exercises: Exercise[],
    exerciseId: number,
    setId: string | number[] | number,
    isValid: boolean
): Exercise[] {
    const exerciseToUpdate = getExercise(exercises, exerciseId);
    const setToUpdate = getSet(exerciseToUpdate, setId);

    const updatedSet = { ...setToUpdate, valid: isValid };
    const updatedSets = exerciseToUpdate.sets.map((set) => (set.id === setId ? updatedSet : set));
    const updatedExercise = { ...exerciseToUpdate, sets: updatedSets };
    return exercises.map((exercise) => (exercise.id === exerciseId ? updatedExercise : exercise));
}
