import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';
import { IUser } from './IUser';

const initialState: IUser = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    totalXp: 0,
    weeklyWorkoutGoal: 3,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserResponse>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.totalXp = action.payload.totalXp;
        },
        clearUser: (state) => {
            state.id = '';
            state.username = '';
            state.firstName = '';
            state.lastName = '';
            state.totalXp = 0;
        },
        updateTotalXP: (state, action: PayloadAction<number>) => {
            state.totalXp = action.payload;
        },
        updateWeeklyWorkoutGoal: (state, action: PayloadAction<number>) => {
            state.weeklyWorkoutGoal = action.payload;
        },
    },
});

export const { setUser, clearUser, updateTotalXP, updateWeeklyWorkoutGoal } = userSlice.actions;
export default userSlice.reducer;
