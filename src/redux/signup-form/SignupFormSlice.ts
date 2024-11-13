import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignupForm } from './ISignupForm';

const initialState: ISignupForm = {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    isCodeVerified: false,
};

const signupFormSlice = createSlice({
    name: 'signupForm',
    initialState,
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        updateCodeVerified: (state) => {
            state.isCodeVerified = true;
        },
        updateAccountInfo: (
            state,
            action: PayloadAction<{ firstName: string; lastName: string }>
        ) => {
            const { firstName, lastName } = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
        },
        updateUsernameAndPassword: (
            state,
            action: PayloadAction<{ username: string; password: string; confirmPassword: string }>
        ) => {
            const { username, password, confirmPassword } = action.payload;
            state.username = username;
            state.password = password;
            state.confirmPassword = confirmPassword;
        },
    },
});

export const { updateEmail, updateAccountInfo, updateUsernameAndPassword, updateCodeVerified } =
    signupFormSlice.actions;

export default signupFormSlice.reducer;
