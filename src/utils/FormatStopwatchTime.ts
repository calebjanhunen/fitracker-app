export function formatStopwatchTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    if (hours === 0) {
        return `${formattedMinutes.toString()}:${formattedSeconds.toString()}`;
    } else {
        return `${hours.toString()}:${formattedMinutes.toString()}:${formattedSeconds.toString()}`;
    }
}
