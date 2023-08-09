import { type SignupData, type UserLocation } from '../../../../interfaces/User';

export enum SignupActionTypes {
    ADD_FITNESS_GOALS = 'add-fitness-goals',
    ADD_WORKOUT_TYPES = 'add-workout-types',
    ADD_SKILL_LEVEL = 'add-skill-level',
    ADD_LOCATION = 'add-location',
    ADD_WORKOUT_DAYS = 'add-workout-days',
    ADD_WORKOUT_TIMES = 'add-workout-times',
}

export type ActionProps =
    | {
          type: SignupActionTypes.ADD_FITNESS_GOALS;
          payload: string[];
      }
    | {
          type: SignupActionTypes.ADD_WORKOUT_TYPES;
          payload: string[];
      }
    | {
          type: SignupActionTypes.ADD_SKILL_LEVEL;
          payload: string;
      }
    | {
          type: SignupActionTypes.ADD_LOCATION;
          payload: UserLocation;
      }
    | {
          type: SignupActionTypes.ADD_WORKOUT_DAYS;
          payload: string[];
      }
    | {
          type: SignupActionTypes.ADD_WORKOUT_TIMES;
          payload: string[];
      };

export function signupReducer(signupData: SignupData, action: ActionProps): SignupData {
    switch (action.type) {
        case SignupActionTypes.ADD_FITNESS_GOALS:
            return {
                ...signupData,
                fitnessGoals: action.payload,
            };
        case SignupActionTypes.ADD_WORKOUT_TYPES:
            return {
                ...signupData,
                workoutTypes: action.payload,
            };
        case SignupActionTypes.ADD_SKILL_LEVEL:
            return {
                ...signupData,
                skillLevel: action.payload,
            };
        case SignupActionTypes.ADD_LOCATION:
            return {
                ...signupData,
                location: action.payload,
            };
        case SignupActionTypes.ADD_WORKOUT_DAYS:
            return {
                ...signupData,
                workoutDays: action.payload,
            };
        case SignupActionTypes.ADD_WORKOUT_TIMES:
            return {
                ...signupData,
                workoutTimes: action.payload,
            };
        default:
            return signupData;
    }
}
