import { type SignupData } from '../interfaces/User';

export const SignupDataMock: SignupData = {
    fitnessGoals: ['Weight Loss', 'Injury Rehab', 'Muscle Gain'],
    workoutTypes: ['Strength Training', 'Cardio'],
    skillLevel: 'Expert',
    location: {
        country: 'Canada',
        city: 'Guelph',
        province: 'ON',
        gym: 'ggac',
    },
    workoutDays: ['Sunday', 'Wednesday', 'Friday'],
    workoutTimes: ['Afternoon', 'Evening'],
};
