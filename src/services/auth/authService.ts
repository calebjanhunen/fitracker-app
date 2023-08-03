import Parse, { type User } from 'parse/react-native';

export async function loginUser(username: string, password: string): Promise<User> {
    return await Parse.User.logIn(username, password);
}
