/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: Props): React.ReactElement {
    const [accessToken, setAccessToken] = useState<string>('');

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}
