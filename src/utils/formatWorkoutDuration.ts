export function formatWorkoutDuration(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    if (minutes === 0) {
        return `${seconds}s`;
    }

    if (hours === 0) {
        return `${minutes}mins`;
    }

    return `${hours}h ${minutes}min`;
}
