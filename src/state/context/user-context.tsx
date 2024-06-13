/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, {
    type Dispatch,
    type SetStateAction,
    createContext,
    useState,
    useContext,
} from 'react';
import type { User } from 'src/interfaces';

interface Props {
    children: React.ReactNode;
}

interface IUserContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: Props): React.ReactElement {
    const [user, setUser] = useState<User>({} as User);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = (): IUserContext => useContext(UserContext);
