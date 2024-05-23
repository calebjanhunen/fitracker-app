import { useContext, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { authAPI } from 'src/api/auth/auth-api';
import { AuthContext } from 'src/context/auth-context';
import { type User } from 'src/interfaces/user';

interface IUseAuth {
    login: (username: string, password: string) => Promise<User>;
    isLoading: boolean;
    error: string;
}

export function useAuth(): IUseAuth {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { setAccessTokenOnLogin } = useContext(AuthContext);

    async function login(username: string, password: string): Promise<User> {
        setError('');
        setIsLoading(true);
        try {
            const response = await authAPI.login(username, password);
            await setAccessTokenOnLogin(response.accessToken);
            console.log(response);
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                setError('Username or password is incorrect');
            } else {
                setError('Could not log in');
            }
        } finally {
            setIsLoading(false);
        }
        return {
            username: '123',
            firstName: '123',
            lastName: '123',
        };
    }

    return {
        isLoading,
        error,
        login,
    };
}
