import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from '@reduxjs/toolkit';

export const WORKOUT_FORM_STORAGE_KEY = 'workout-form';

export const saveWorkoutMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
    // Call next(action) to get updated state
    const result = next(action);

    if (action.type.startsWith('workoutForm/')) {
        // calling this after next(action) ensures that it's the updated state
        const workoutState = storeAPI.getState().workoutForm;
        try {
            // Convert the state to a string and store it in AsyncStorage
            await AsyncStorage.setItem(WORKOUT_FORM_STORAGE_KEY, JSON.stringify(workoutState));
            // console.log('Workout form saved to async storage:', workoutState);
        } catch (e) {
            // console.error('Error saving workout form to async storage:', e);
        }
    }

    return result;
};
