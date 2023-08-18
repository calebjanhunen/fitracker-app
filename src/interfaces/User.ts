import { type Tables } from './Tables';

export interface User {
    username: string | null;
    session: string | null;
}

export interface UserLocation {
    country: string;
    city: string;
    province: string;
    gym: number;
}

export interface SignupData {
    username: string;
    password: string;
    email: string;
    fitnessGoals: Array<Tables<'fitness_goals'>['id']>;
    workoutTypes: Array<Tables<'workout_types'>['id']>;
    skillLevel: string;
    location: UserLocation;
    workoutDays: Array<Tables<'workout_days'>['id']>;
    workoutTimes: Array<Tables<'workout_times'>['id']>;
}
