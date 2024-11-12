import { configureStore } from '@reduxjs/toolkit';
import signupFormReducer from './signup-form/SignupFormSlice';
import userReducer from './user/UserSlice';
import { saveWorkoutMiddleware } from './workout-form/WorkoutFormMiddleware';
import workoutFormReducer from './workout-form/WorkoutFormSlice';
import workoutTemplateFormReducer from './workout-template-form/WorkoutTemplateFormSlice';

export const store = configureStore({
    reducer: {
        workoutForm: workoutFormReducer,
        user: userReducer,
        workoutTemplateForm: workoutTemplateFormReducer,
        signupForm: signupFormReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveWorkoutMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
