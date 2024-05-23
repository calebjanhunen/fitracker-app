import { useContext, useState } from 'react';

import { authAPI } from 'src/api/auth/auth-api';
import { AuthContext } from 'src/context/auth-context';
import { type User } from 'src/interfaces/user';

interface IUseAuth {
    login: (username: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    accessToken: string | null;
    isLoading: boolean;
    error: string;
}

export function useAuth(): IUseAuth {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { setAccessTokenOnLogin, accessToken, removeAccessToken } = useContext(AuthContext);

    async function login(username: string, password: string): Promise<User> {
        setError('');
        setIsLoading(true);
        try {
            const response = await authAPI.login(username, password);
            await setAccessTokenOnLogin(response.accessToken);
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

    async function logout(): Promise<void> {
        try {
            await removeAccessToken();
        } catch (e) {
            console.error(e);
        }
    }

    return {
        login,
        logout,
        isLoading,
        error,
        accessToken,
    };
}
