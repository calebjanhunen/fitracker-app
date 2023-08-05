import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';

import { type User } from '../../interfaces/User';

interface Props {
    children: React.ReactNode;
}

export interface AuthContextData {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props): React.ReactElement {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const [user, setUser] = useState<User>({} as User);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
