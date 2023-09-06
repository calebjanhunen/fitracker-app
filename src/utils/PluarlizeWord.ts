export function pluralizeWord(val: number, word: string): string {
    if (val !== 1) {
        return word.concat('s');
    }
    return word;
}
