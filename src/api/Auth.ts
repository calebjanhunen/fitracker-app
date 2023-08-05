// import Parse, { type User } from 'parse/react-native';

// interface AuthReturnType {
//     ;
// }

// export function AuthService(): {(username: string, password: string) => Promise<User>} {
//     async function sendLoginRequest(username: string, password: string): Promise<User> {
//         return await Parse.User.logIn(username, password);
//     }

//     return { sendLoginRequest };
// }

// export async function logoutUser(): Promise<User> {
//     return await Parse.User.logOut();
// }

// export async function checkIfUserLoggedIn(): Promise<User | null> {
//     return await Parse.User.currentAsync();
// }

// export function createUser(): User {
//     return new Parse.User();
// }

// export async function signupUser(user: User): Promise<User> {
//     return await user.signUp();
// }
