import { UserProfileDto } from 'src/api/generated';

export interface IUser extends UserProfileDto {
    username: string;
    firstName: string;
    lastName: string;
    totalXp: number;
    weeklyWorkoutGoal: number;
}
