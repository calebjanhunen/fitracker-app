import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as AuthApi from 'src/api/auth-service/login-service';
import { queryClient } from 'src/api/react-query-client';
import { useAuth } from 'src/context/auth-context/AuthContext';

interface IUseLogout {
    logout: () => void;
    isPending: boolean;
}

export function useLogout(): IUseLogout {
    const router = useRouter();
    const { setAccessToken } = useAuth();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: AuthApi.logout,
        onMutate: async () => {
            router.replace('/(auth)');
            setAccessToken(null);
            queryClient.clear();
        },
    });

    return { logout, isPending };
}
