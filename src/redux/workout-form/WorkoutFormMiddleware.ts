import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from '@reduxjs/toolkit';
import { LocalStorageKeys } from 'src/constants/LocalStorageKeys';

export const saveWorkoutMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
    // Call next(action) to get updated state
    const result = next(action);

    if (action.type.startsWith('workoutForm/')) {
        // calling this after next(action) ensures that it's the updated state
        const workoutState = storeAPI.getState().workoutForm;

        if (action.type !== 'workoutForm/updateLastUpdatedAt') {
            storeAPI.dispatch({
                type: 'workoutForm/updateLastUpdatedAt',
            });
        }
        try {
            // Convert the state to a string and store it in AsyncStorage
            await AsyncStorage.setItem(LocalStorageKeys.workoutForm, JSON.stringify(workoutState));
            // console.log('Workout form saved to async storage:', workoutState);
        } catch (e) {
            // console.error('Error saving workout form to async storage:', e);
        }
    }

    return result;
};
