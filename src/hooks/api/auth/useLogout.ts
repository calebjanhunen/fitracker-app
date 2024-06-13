import { queryClient } from 'src/api/config/react-query.config';
import { useAuth } from 'src/state/context/auth-context';

interface IUseLogout {
    logout: () => Promise<void>;
}

export function useLogout(): IUseLogout {
    const { removeAccessToken } = useAuth();

    async function logout(): Promise<void> {
        await queryClient.invalidateQueries();
        await removeAccessToken();
    }

    return { logout };
}
