import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';

import { type User } from '../../interfaces/User';

interface Props {
    children: React.ReactNode;
}

export interface AuthContextData {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props): React.ReactElement {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const [user, setUser] = useState<User>({} as User);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
