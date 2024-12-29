import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as AuthApi from 'src/api/auth-service/login-service';
import { queryClient } from 'src/api/react-query-client';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { useLocalStorage } from '../common/useLocalStorage';

interface IUseLogout {
    logout: () => void;
    isPending: boolean;
}

export function useLogout(): IUseLogout {
    const router = useRouter();
    const { setAccessToken } = useAuth();
    const { clearStorage } = useLocalStorage();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: AuthApi.logout,
        onSettled: async () => {
            router.replace('/(auth)');
            setAccessToken(null);
            queryClient.clear();
            await clearStorage();
        },
    });

    return { logout, isPending };
}
