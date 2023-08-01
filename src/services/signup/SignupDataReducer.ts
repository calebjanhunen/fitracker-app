export enum SignupActionTypes {
    UPDATE_ACCOUNT_INFO = 'update-account-info',
}

export interface SignupData {
    email: string;
    username: string;
    password: string;
    fitnessGoals: string[];
    workoutTypes: string[];
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
          type: SignupActionTypes.UPDATE_ACCOUNT_INFO;
          payload: { email: string; username: string; password: string };
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
        default:
            return signupData;
    }
}
