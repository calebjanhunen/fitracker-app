import { useContext } from 'react';

import { type SignupData } from '../interfaces/User';
import { AuthAPI } from '../services/api/AuthAPI';
import { UsersAPI } from '../services/api/UsersAPI';
import { AuthContext } from '../services/context/AuthContext';

interface useAuthReturnType {
    login: (email: string, password: string) => Promise<void>;
    signup: (signupData: SignupData) => Promise<void>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
    checkIfUserAlreadyExists: (username: string, email: string) => Promise<void>;
}

export function useAuth(): useAuthReturnType {
    const { setSession, setIsLoading } = useContext(AuthContext);

    async function login(email: string, password: string): Promise<void> {
        setIsLoading(true);
        const { data, error } = await AuthAPI.login(email, password);
        setIsLoading(false);
        if (error) {
            throw new Error(error.message);
        }

        setSession(data.session);
    }

    async function signup(signupData: SignupData): Promise<void> {
        setIsLoading(true);
        try {
            const newUser = await AuthAPI.signup(signupData);
            console.log(newUser);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function logout(): Promise<void> {
        const { error } = await AuthAPI.logout();
        if (error) {
            console.error(error);
        }
        setSession(null);
    }

    async function persistLogin(): Promise<void> {
        const { data } = await AuthAPI.getCurrentUser();
        if (data.session !== null) {
            setSession(data.session);
        }
    }

    async function checkIfUserAlreadyExists(username: string, email: string): Promise<void> {
        setIsLoading(true);
        try {
            const userByUsername = await UsersAPI.getByField('username', username);
            const userByEmail = await UsersAPI.getByField('email', email);
            if (userByUsername || userByEmail) {
                throw new Error('User already exists.');
            }
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { login, signup, logout, persistLogin, checkIfUserAlreadyExists };
}
