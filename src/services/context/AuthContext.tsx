import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';

import { type Session } from '@supabase/supabase-js';

interface Props {
    children: React.ReactNode;
}

export interface AuthContextData {
    session: Session | null;
    setSession: Dispatch<SetStateAction<Session | null>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props): React.ReactElement {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <AuthContext.Provider
            value={{
                session,
                setSession,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
