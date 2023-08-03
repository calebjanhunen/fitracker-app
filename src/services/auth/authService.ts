import Parse, { type User } from 'parse/react-native';

export async function loginUser(username: string, password: string): Promise<User> {
    return await Parse.User.logIn(username, password);
}

export async function logoutUser(): Promise<User> {
    return await Parse.User.logOut();
}

export async function checkIfUserLoggedIn(): Promise<User | null> {
    return await Parse.User.currentAsync();
}
