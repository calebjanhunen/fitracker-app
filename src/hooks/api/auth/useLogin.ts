import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { authAPI } from 'src/api/auth/auth-api';
import { useAuth } from 'src/state/context/auth-context';

interface IUseLogin {
    login: ({ username, password }: { username: string; password: string }) => void;
    isLoading: boolean;
    errorMsg: string;
}

export function useLogin(): IUseLogin {
    const { storeAccessToken } = useAuth();
    const [errorMsg, setErrorMsg] = useState<string>('');

    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: authAPI.login,
        onSuccess: async (data) => {
            await storeAccessToken(data.accessToken);
            // set user state from context
        },
        onError: (e) => {
            setErrorMsg('Invalid username or password');
        },
    });

    return { login, isLoading, errorMsg };
}
