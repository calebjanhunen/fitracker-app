export const ExerciseApiQueryKeys = {
    getExercisesWithWorkoutDetails: ['exercisesWithWorkoutDetails'],
    getEquipment: ['equipment'],
    getBodyParts: ['bodyParts'],
    getExerciseDetails: (exerciseId: string) => ['exercises', exerciseId, 'details'],
};

export const WorkoutApiQueryKeys = {
    getWorkouts: ['workouts'],
};

export const WorkoutTemplateQueryKeys = {
    getAllWorkoutTemplates: ['workoutTemplates'],
};
