import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfileDto } from 'src/api/generated';
import { IUser } from './IUser';

const initialState: IUser = {
    username: '',
    firstName: '',
    lastName: '',
    totalXp: 0,
    weeklyWorkoutGoal: 0,
    level: 0,
    currentXp: 0,
    xpNeededForCurrentLevel: 0,
    role: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfileDto>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.totalXp = action.payload.totalXp;
            state.weeklyWorkoutGoal = action.payload.weeklyWorkoutGoal;
            state.level = action.payload.level;
            state.currentXp = action.payload.currentXp;
            state.xpNeededForCurrentLevel = action.payload.xpNeededForCurrentLevel;
            state.role = action.payload.role;
        },
        clearUser: (state) => {
            state.username = '';
            state.firstName = '';
            state.lastName = '';
            state.totalXp = 0;
            state.weeklyWorkoutGoal = 0;
        },
        updateUserStatsAfterWorkout: (
            state,
            action: PayloadAction<{ totalWorkoutXp: number; level: number; currentXp: number }>
        ) => {
            const { totalWorkoutXp, level, currentXp } = action.payload;
            state.totalXp += totalWorkoutXp;
            state.currentXp = currentXp;
            state.level = level;
        },
        updateWeeklyWorkoutGoal: (state, action: PayloadAction<number>) => {
            state.weeklyWorkoutGoal = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const {
    setUser,
    clearUser,
    updateUserStatsAfterWorkout,
    updateWeeklyWorkoutGoal,
    updateUsername,
} = userSlice.actions;
export default userSlice.reducer;
