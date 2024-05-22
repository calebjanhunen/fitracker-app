import { useState } from 'react';
import { authAPI } from 'src/api/auth/auth-api';
import { type User } from 'src/interfaces/user';

interface IUseAuth {
    login: (username: string, password: string) => Promise<User>;
    isLoading: boolean;
    error: string;
}

export function useAuth(): IUseAuth {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    async function login(username: string, password: string): Promise<User> {
        setIsLoading(true);
        try {
            const response = await authAPI.login(username, password);
            console.log(response);
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Could not log in');
            }
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
