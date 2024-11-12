import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignupForm } from './ISignupForm';

const initialState: ISignupForm = {
    email: '',
    firstName: '',
    lastName: '',
    birthday: new Date(),
    username: '',
    password: '',
    confirmPassword: '',
};

const signupFormSlice = createSlice({
    name: 'signupForm',
    initialState,
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        updateAccountInfo: (
            state,
            action: PayloadAction<{ firstName: string; lastName: string; birthday: Date }>
        ) => {
            const { firstName, lastName, birthday } = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.birthday = birthday;
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

export const { updateEmail, updateAccountInfo, updateUsernameAndPassword } =
    signupFormSlice.actions;

export default signupFormSlice.reducer;
