import { useContext } from 'react';

import { type SignupData } from '../interfaces/User';
import { AuthAPI } from '../services/api/AuthAPI';
import { AuthContext } from '../services/context/AuthContext';

interface useAuthReturnType {
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, password: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
    updateUserInfo: (signupData: SignupData) => Promise<void>;
}

export function useAuth(): useAuthReturnType {
    const { setSession, setIsLoading } = useContext(AuthContext);

    async function login(email: string, password: string): Promise<void> {
        setIsLoading(true);
        const { data, error } = await AuthAPI.login(email, password);
        setIsLoading(false);
        if (error) {
            throw new Error(error.message);
        }

        setSession(data.session);
    }

    async function signup(username: string, password: string, email: string): Promise<void> {
        // setIsLoading(true);
        // const user = new Parse.User();
        // user.set('username', username);
        // user.set('password', password);
        // user.set('email', email);
        // try {
        //     await user.signUp();
        // } catch (error) {
        //     if (error instanceof Error) {
        //         throw new Error(capitalizeFirstLetter(error.message));
        //     } else {
        //         throw new Error('Signup failed.');
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    }

    async function updateUserInfo(signupData: SignupData): Promise<void> {
        // setIsLoading(true);
        // try {
        //     const currentUser = await Parse.User.currentAsync();
        //     if (currentUser) {
        //         currentUser.set('fitnessGoals', signupData.fitnessGoals);
        //         currentUser.set('workoutTypes', signupData.workoutTypes);
        //         currentUser.set('skillLevel', signupData.skillLevel);
        //         currentUser.set('country', signupData.location.country);
        //         currentUser.set('city', signupData.location.city);
        //         currentUser.set('province', signupData.location.province);
        //         currentUser.set('gym', signupData.location.gym);
        //         currentUser.set('workoutDays', signupData.workoutDays);
        //         currentUser.set('workoutTimes', signupData.workoutTimes);
        //         await currentUser.save();
        //         setUser({
        //             username: currentUser.get('username'),
        //             sessionToken: currentUser.getSessionToken(),
        //         });
        //     }
        // } catch (error) {
        //     if (error instanceof Error) {
        //         throw new Error(capitalizeFirstLetter(error.message));
        //     } else {
        //         throw new Error('Failed to update User.');
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    }

    async function logout(): Promise<void> {
        const { error } = await AuthAPI.logout();
        if (error) {
            console.error(error);
        }
        setSession(null);
    }

    async function persistLogin(): Promise<void> {
        const { data } = await AuthAPI.getCurrentUser();
        if (data.session !== null) {
            setSession(data.session);
        }
    }

    return { login, signup, logout, persistLogin, updateUserInfo };
}
