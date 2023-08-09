import React, { createContext, useReducer, type Dispatch } from 'react';

import { type SignupData } from '../../../../interfaces/User';
import { signupReducer, type ActionProps } from './SignupDataReducer';

interface Props {
    children: React.ReactNode;
}

interface SignupContextData {
    signupData: SignupData;
    dispatchSignupData: Dispatch<ActionProps>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const SignupDataContext = createContext<SignupContextData>({} as SignupContextData);

export default function SignupDataProvider({ children }: Props): React.ReactElement {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const [signupData, dispatch] = useReducer(signupReducer, {} as SignupData);
    return (
        <SignupDataContext.Provider value={{ signupData, dispatchSignupData: dispatch }}>
            {children}
        </SignupDataContext.Provider>
    );
}
