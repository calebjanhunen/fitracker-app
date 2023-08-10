export interface User {
    username: string | null;
    session: string | null;
}

export interface UserLocation {
    country: string;
    city: string;
    province: string;
    gym: string;
}

export interface SignupData {
    fitnessGoals: string[];
    workoutTypes: string[];
    skillLevel: string;
    location: UserLocation;
    workoutDays: string[];
    workoutTimes: string[];
}
