import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserSlice';
import workoutFormReducer from './workout-form/WorkoutFormSlice';

export const store = configureStore({
    reducer: { workoutForm: workoutFormReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
