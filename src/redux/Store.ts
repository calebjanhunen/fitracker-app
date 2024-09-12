import { configureStore } from '@reduxjs/toolkit';
import workoutFormReducer from './workout-form/WorkoutFormSlice';

export const store = configureStore({
    reducer: { workoutForm: workoutFormReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
