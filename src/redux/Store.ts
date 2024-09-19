import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserSlice';
import { saveWorkoutMiddleware } from './workout-form/WorkoutFormMiddleware';
import workoutFormReducer from './workout-form/WorkoutFormSlice';

export const store = configureStore({
    reducer: { workoutForm: workoutFormReducer, user: userReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveWorkoutMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
