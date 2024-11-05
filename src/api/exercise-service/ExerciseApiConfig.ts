export const exerciseEndpoints = {
    getAllExercises: () => '/api/exercises',
    getExercisesWithWorkoutDetails: () => '/api/exercises/workout-details',
    createExercise: () => '/api/exercises',
    getExerciseDetails: (exerciseId: string) => `/api/exercises/${exerciseId}/details`,
    updateExercise: (exerciseId: string) => `/api/exercises/${exerciseId}`,
};

export const GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY =
    'GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY';
export const exerciseDetailsQueryKey = (id: string) => ['exercises', id, 'details'];
