import { type SignupData } from '../interfaces/User';

export const SignupDataMock: SignupData = {
    username: 'testUser',
    password: '123456',
    email: 'testing@text.com',
    fitnessGoals: [1, 3, 5, 7],
    workoutTypes: [1, 3, 6],
    skillLevel: 'Expert',
    location: {
        country: 'Canada',
        city: 'Guelph',
        province: 'ON',
        gym: 1,
    },
    workoutDays: [1, 3, 7],
    workoutTimes: [2, 3],
};
