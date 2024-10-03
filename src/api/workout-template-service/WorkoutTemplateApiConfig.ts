export const workoutTemplateEndpoints = {
    createWorkouTemplate: () => '/api/workout-templates',
    getAllWorkoutTemplates: () => '/api/workout-templates',
    deleteWorkoutTemplate: (id: string) => `/api/workout-templates/${id}`,
};

export const GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY = '/api/workout-templates';
