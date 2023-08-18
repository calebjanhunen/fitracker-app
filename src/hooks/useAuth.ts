import { useContext } from 'react';

import { type SignupData } from '../interfaces/User';
import { AuthAPI } from '../services/api/AuthAPI';
import { JunctionTableAPI } from '../services/api/JunctionTablesAPI';
import { UsersAPI } from '../services/api/UsersAPI';
import { AuthContext } from '../services/context/AuthContext';

interface useAuthReturnType {
    login: (email: string, password: string) => Promise<void>;
    signup: (signupData: SignupData) => Promise<void>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
    checkIfUserAlreadyExists: (username: string, email: string) => Promise<void>;
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

    async function signup(signupData: SignupData): Promise<void> {
        setIsLoading(true);
        try {
            const newUser = await AuthAPI.signup(signupData);
            if (newUser?.user) {
                await JunctionTableAPI.insertIntoUserFitnessGoals(
                    signupData.fitnessGoals,
                    newUser.user.id
                );
                await JunctionTableAPI.insertIntoUserWorkoutTypes(
                    signupData.workoutTypes,
                    newUser.user.id
                );
                await JunctionTableAPI.insertIntoUserWorkoutDays(
                    signupData.workoutDays,
                    newUser.user.id
                );
                await JunctionTableAPI.insertIntoUserWorkoutTimes(
                    signupData.workoutTimes,
                    newUser.user.id
                );
            }
            setSession(newUser.session);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setIsLoading(false);
        }
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

    async function checkIfUserAlreadyExists(username: string, email: string): Promise<void> {
        setIsLoading(true);
        try {
            const userByUsername = await UsersAPI.getByField('username', username);
            const userByEmail = await UsersAPI.getByField('email', email);
            if (userByUsername) {
                throw new Error('Username is taken.');
            }
            if (userByEmail) {
                throw new Error('Email is already in use.');
            }
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { login, signup, logout, persistLogin, checkIfUserAlreadyExists };
}
