import { useContext } from 'react';

import Parse from 'parse/react-native';

import { AuthContext } from '../services/auth/authContext';
import { capitalizeFirstLetter } from '../utils/CapitalizeFirstLetter';

interface useAuthReturnType {
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
}

export function useAuth(): useAuthReturnType {
    const { setUser } = useContext(AuthContext);

    async function login(username: string, password: string): Promise<void> {
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

    return { login, logout, persistLogin };
}
