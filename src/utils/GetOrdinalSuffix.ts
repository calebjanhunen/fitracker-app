export function getOrdinalSuffix(n: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const remainder = n % 100; // Get last two digits for numbers like 111, 112, etc.

    if (remainder >= 11 && remainder <= 13) {
        return 'th'; // Special case for 11, 12, 13
    }

    const lastDigit = n % 10; // Get the last digit

    // Use the last digit to determine the suffix, default to 'th'
    const suffix = suffixes[lastDigit] || 'th';

    return suffix;
}
