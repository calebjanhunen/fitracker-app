import uuid from 'react-native-uuid';
import type {
    IWorkoutTemplateForm,
    IWorkoutTemplateFormExercise,
    IWorkoutTemplateFormSet,
    SetType,
} from 'src/interfaces';

export enum CreateWorkoutTemplateActionTypes {
    UPDATE_NAME = 'update-name',
    ADD_EXERCISES = 'add-exercises',
    DELETE_EXERCISE = 'delete-exercise',
    ADD_SET = 'add-set',
    DELETE_SET = 'delete-set',
    CLEAR_WORKOUT = 'clear-workout-template',
    REORDER_EXERCISES = 'reorder-exercises',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CreateWorkoutTemplateActions =
    | { type: CreateWorkoutTemplateActionTypes.UPDATE_NAME; name: string }
    | {
          type: CreateWorkoutTemplateActionTypes.ADD_EXERCISES;
          payload: IWorkoutTemplateFormExercise[];
      }
    | { type: CreateWorkoutTemplateActionTypes.DELETE_EXERCISE; payload: string }
    | {
          type: CreateWorkoutTemplateActionTypes.ADD_SET;
          exerciseId: string;
          setOrder: number;
          setType: SetType;
      }
    | { type: CreateWorkoutTemplateActionTypes.CLEAR_WORKOUT }
    | {
          type: CreateWorkoutTemplateActionTypes.DELETE_SET;
          exerciseId: string;
          setId: string;
      }
    | { type: CreateWorkoutTemplateActionTypes.CLEAR_WORKOUT }
    | {
          type: CreateWorkoutTemplateActionTypes.REORDER_EXERCISES;
          exercises: IWorkoutTemplateFormExercise[];
      };

export function reducer(
    workoutTemplate: IWorkoutTemplateForm,
    action: CreateWorkoutTemplateActions
): IWorkoutTemplateForm {
    switch (action.type) {
        case CreateWorkoutTemplateActionTypes.UPDATE_NAME:
            return { ...workoutTemplate, name: action.name };
        case CreateWorkoutTemplateActionTypes.ADD_EXERCISES:
            return {
                ...workoutTemplate,
                exercises: [...workoutTemplate.exercises, ...action.payload],
            };
        case CreateWorkoutTemplateActionTypes.DELETE_EXERCISE:
            return {
                ...workoutTemplate,
                exercises: workoutTemplate.exercises.filter(
                    (exercise) => exercise.exerciseId !== action.payload
                ),
            };
        case CreateWorkoutTemplateActionTypes.REORDER_EXERCISES:
            return {
                ...workoutTemplate,
                exercises: action.exercises.map((e, index) => ({ ...e, order: index + 1 })),
            };
        case CreateWorkoutTemplateActionTypes.ADD_SET: {
            const newSet: IWorkoutTemplateFormSet = {
                frontendId: uuid.v4().toString(),
                order: action.setOrder,
                setType: action.setType,
            };
            return {
                ...workoutTemplate,
                exercises: workoutTemplate.exercises.map((exercise) =>
                    exercise.exerciseId === action.exerciseId
                        ? { ...exercise, sets: [...exercise.sets, newSet] }
                        : exercise
                ),
            };
        }
        case CreateWorkoutTemplateActionTypes.DELETE_SET:
            return {
                ...workoutTemplate,
                exercises: workoutTemplate.exercises.map((exercise) => {
                    if (exercise.exerciseId === action.exerciseId) {
                        return {
                            ...exercise,
                            sets: exercise.sets.filter((set) => set.frontendId !== action.setId),
                        };
                    }
                    return exercise;
                }),
            };
        case CreateWorkoutTemplateActionTypes.CLEAR_WORKOUT:
            return {
                name: '',
                exercises: [],
            };
        default:
            return workoutTemplate;
    }
}
