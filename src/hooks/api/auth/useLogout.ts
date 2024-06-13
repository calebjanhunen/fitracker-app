import { useAuth } from 'src/state/context/auth-context';

interface IUseLogout {
    logout: () => Promise<void>;
}

export function useLogout(): IUseLogout {
    const { removeAccessToken } = useAuth();

    async function logout(): Promise<void> {
        await removeAccessToken();
    }

    return { logout };
}
