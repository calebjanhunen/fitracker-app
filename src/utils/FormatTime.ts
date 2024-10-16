export function formatTime(dateString: string): string {
    const timeString = new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // This ensures AM/PM format
    });

    return timeString;
}
