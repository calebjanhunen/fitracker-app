import { type Tables } from './Tables';

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
    fitnessGoals: Array<Tables<'fitness_goals'>['id']>;
    workoutTypes: Array<Tables<'workout_types'>['id']>;
    skillLevel: string;
    location: UserLocation;
    workoutDays: string[];
    workoutTimes: string[];
}
