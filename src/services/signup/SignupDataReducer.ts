export enum SignupActionTypes {
    UPDATE_ACCOUNT_INFO = 'update-account-info',
    ADD_FITNESS_GOALS = 'add-fitness-goals',
    ADD_WORKOUT_TYPES = 'add-workout-types',
}

interface FitnessGoalsOrWorkoutTypes {
    id: number;
    name: string;
}

export interface SignupData {
    email: string;
    username: string;
    password: string;
    fitnessGoals: FitnessGoalsOrWorkoutTypes[];
    workoutTypes: FitnessGoalsOrWorkoutTypes[];
    skillLevel: string;
    location: {
        country: string;
        city: string;
        province: string;
        gym: string;
    };
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
          payload: FitnessGoalsOrWorkoutTypes[];
      }
    | {
          type: SignupActionTypes.ADD_WORKOUT_TYPES;
          payload: FitnessGoalsOrWorkoutTypes[];
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
        default:
            return signupData;
    }
}
