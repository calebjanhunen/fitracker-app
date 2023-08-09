import { useContext } from 'react';

import Parse from 'parse/react-native';

import { type SignupData } from '../interfaces/User';
import { AuthContext } from '../services/auth/authContext';
import { capitalizeFirstLetter } from '../utils/CapitalizeFirstLetter';

interface useAuthReturnType {
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
    updateUserInfo: (signupData: SignupData) => Promise<void>;
}

export function useAuth(): useAuthReturnType {
    const { setUser, setIsLoading } = useContext(AuthContext);

    async function login(username: string, password: string): Promise<void> {
        setIsLoading(true);
        try {
            const response = await Parse.User.logIn(username, password);
            setUser({
                username: response.get('username'),
                sessionToken: response.getSessionToken(),
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'username/email is required.') {
                    throw new Error('Username is required');
                } else {
                    throw new Error(capitalizeFirstLetter(error.message));
                }
            } else {
                throw new Error('Login failed.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function signup(username: string, password: string, email: string): Promise<void> {
        setIsLoading(true);
        const user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
        try {
            await user.signUp();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(capitalizeFirstLetter(error.message));
            } else {
                throw new Error('Signup failed.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function updateUserInfo(signupData: SignupData): Promise<void> {
        setIsLoading(true);
        try {
            const currentUser = await Parse.User.currentAsync();
            if (currentUser) {
                currentUser.set('fitnessGoals', signupData.fitnessGoals);
                currentUser.set('workoutTypes', signupData.workoutTypes);
                currentUser.set('skillLevel', signupData.skillLevel);
                currentUser.set('country', signupData.location.country);
                currentUser.set('city', signupData.location.city);
                currentUser.set('province', signupData.location.province);
                currentUser.set('gym', signupData.location.gym);
                currentUser.set('workoutDays', signupData.workoutDays);
                currentUser.set('workoutTimes', signupData.workoutTimes);
                await currentUser.save();
                setUser({
                    username: currentUser.get('username'),
                    sessionToken: currentUser.getSessionToken(),
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(capitalizeFirstLetter(error.message));
            } else {
                throw new Error('Failed to update User.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function logout(): Promise<void> {
        await Parse.User.logOut();
        setUser({ username: '', sessionToken: null });
    }

    async function persistLogin(): Promise<void> {
        Parse.User.enableUnsafeCurrentUser();
        try {
            const currentUser = await Parse.User.currentAsync();
            if (currentUser) {
                setUser({
                    username: currentUser.get('username'),
                    sessionToken: currentUser.getSessionToken(),
                });
            }
        } catch (error) {}
    }

    return { login, signup, logout, persistLogin, updateUserInfo };
}
