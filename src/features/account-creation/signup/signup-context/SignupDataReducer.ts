export enum SignupActionTypes {
    UPDATE_ACCOUNT_INFO = 'update-account-info',
    ADD_FITNESS_GOALS = 'add-fitness-goals',
    ADD_WORKOUT_TYPES = 'add-workout-types',
    ADD_SKILL_LEVEL = 'add-skill-level',
    ADD_LOCATION = 'add-location',
    ADD_WORKOUT_DAYS = 'add-workout-days',
    ADD_WORKOUT_TIMES = 'add-workout-times',
}

interface FitnessGoalsOrWorkoutTypes {
    id: number;
    name: string;
}

interface Location {
    country: string;
    city: string;
    province: string;
    gym: string;
}

export interface SignupData {
    email: string;
    username: string;
    password: string;
    fitnessGoals: string[];
    workoutTypes: FitnessGoalsOrWorkoutTypes[];
    skillLevel: string;
    location: Location;
    workoutDays: string[];
    workoutTimes: string[];
}

export type ActionProps =
    | {
          type: SignupActionTypes.UPDATE_ACCOUNT_INFO;
          payload: { email: string; username: string; password: string };
      }
    | {
          type: SignupActionTypes.ADD_FITNESS_GOALS;
          payload: string[];
      }
    | {
          type: SignupActionTypes.ADD_WORKOUT_TYPES;
          payload: FitnessGoalsOrWorkoutTypes[];
      }
    | {
          type: SignupActionTypes.ADD_SKILL_LEVEL;
          payload: string;
      }
    | {
          type: SignupActionTypes.ADD_LOCATION;
          payload: Location;
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
        case SignupActionTypes.UPDATE_ACCOUNT_INFO:
            return {
                ...signupData,
                email: action.payload.email,
                username: action.payload.username,
                password: action.payload.password,
            };
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
