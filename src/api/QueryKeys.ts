export const ExerciseApiQueryKeys = {
    getAllExercises: ['exercises'],
    getExercisesForWorkout: ['exercises', 'isForWorkout'],
    getEquipment: ['equipment'],
    getBodyParts: ['bodyParts'],
    getCableAttachments: ['cableAttachments'],
    getExerciseDetails: (exerciseId: string) => ['exercises', exerciseId, 'details'],
};

export const WorkoutApiQueryKeys = {
    getWorkouts: ['workouts'],
    getWorkoutDetails: (workoutId: string) => ['workouts', workoutId],
};

export const WorkoutTemplateQueryKeys = {
    getAllWorkoutTemplates: ['workoutTemplates'],
};

export const UserApiQueryKeys = {
    getCurrentUser: ['users', 'me'],
};

export const LeaderbaordApiQueryKeys = {
    getTotalXpLeaderbaord: ['leaderboard', 'totalXp'],
};
