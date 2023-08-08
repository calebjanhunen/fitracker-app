export interface User {
    username: string;
    sessionToken: string | null;
}

export interface SignupData {
    fitnessGoals: string[];
    workoutTypes: string[];
    skillLevel: string;
    location: Location;
    workoutDays: string[];
    workoutTimes: string[];
}
