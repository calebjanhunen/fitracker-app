export const exerciseEndpoints = {
    getAllExercises: () => '/api/exercises',
    getExercisesWithWorkoutDetails: () => '/api/exercises/workout-details',
    createExercise: () => '/api/exercises',
    getExerciseWorkoutHistory: (exerciseId: string) =>
        `/api/exercises/${exerciseId}/workout-history`,
};

export const GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY =
    'GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY';
export const exerciseWorkoutHistoryQueryKey = (id: string) => ['exercises', id, 'workout-history'];
