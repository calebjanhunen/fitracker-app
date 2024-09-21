export const workoutEndpoints = {
    createWorkout: () => '/api/workouts',
    getAllWorkouts: () => '/api/workouts',
    deleteWorkout: (workoutId: string) => `/api/workouts/${workoutId}`,
};

export const GET_ALL_WORKOUTS_QUERY_KEY = '/api/workouts';
