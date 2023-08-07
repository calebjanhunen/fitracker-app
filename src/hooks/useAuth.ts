import { useContext } from 'react';

import Parse from 'parse/react-native';

import { AuthContext } from '../services/auth/authContext';
import { capitalizeFirstLetter } from '../utils/CapitalizeFirstLetter';

interface useAuthReturnType {
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
}

export function useAuth(): useAuthReturnType {
    const { setUser, setIsLoading } = useContext(AuthContext);

    async function login(username: string, password: string): Promise<void> {
        setIsLoading(true);
        try {
            const response = await Parse.User.logIn(username, password);
            setUser({
                username: response.get('username'),
                sessionToken: response.getSessionToken(),
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'username/email is required.') {
                    throw new Error('Username is required');
                } else {
                    throw new Error(capitalizeFirstLetter(error.message));
                }
            } else {
                throw new Error('Login failed.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function signup(username: string, password: string, email: string): Promise<void> {
        const user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
        try {
            const response = await user.signUp();
            console.log(response);
            setUser({
                username: response.get('username'),
                sessionToken: response.getSessionToken(),
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(capitalizeFirstLetter(error.message));
            } else {
                throw new Error('Signup failed.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function logout(): Promise<void> {
        await Parse.User.logOut();
        setUser({ username: '', sessionToken: null });
    }

    async function persistLogin(): Promise<void> {
        try {
            const currentUser = await Parse.User.currentAsync();
            if (currentUser) {
                setUser({
                    username: currentUser.get('username'),
                    sessionToken: currentUser.getSessionToken(),
                });
            }
        } catch (error) {}
    }

    return { login, signup, logout, persistLogin };
}
