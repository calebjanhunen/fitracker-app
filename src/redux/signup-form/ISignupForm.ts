export interface ISignupForm {
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    username: string;
    password: string;
    confirmPassword: string;
}
