import { type ExerciseReturnType } from '../../interfaces/Exercise';
import { apiClient } from './utils/config';

// Gets the most recent exercise from workout_exercises table using id from exercises table
export async function getMostRecentExercise(
    exercisesId: number
): Promise<ExerciseReturnType | undefined> {
    try {
        const { data, error } = await apiClient
            .from('workout_exercises')
            .select(
                `
                    id,
                    name: exercises(name),
                    sets: exercise_sets(
                        id,
                        weight,
                        reps,
                        rpe
                    )
                `
            )
            .eq('exercises_id', exercisesId)
            .order('id', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            if (error.message === 'JSON object requested, multiple (or no) rows returned') {
                return undefined;
            }
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
