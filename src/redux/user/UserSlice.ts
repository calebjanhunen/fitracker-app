import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';
import { IUser } from './IUser';

const initialState: IUser = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    totalXp: 0,
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
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
