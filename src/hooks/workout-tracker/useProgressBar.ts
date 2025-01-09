import { useEffect, useRef, useState } from 'react';

const friendlyXpSourceDisplay = {
    workoutEffortXp: 'Workout effort',
    workoutGoalXp: 'Weekly goal',
    workoutGoalStreakXp: 'Weekly streak',
};

const MAX_PROGRESS_VAL = 100;
const MIN_PROGRESS_VAL = 0;
const QUICK_ANIMATION_DURATION = 300;
const MEDIUM_ANIMATION_DURATION = 1000;

const DELAY_BETWEEN_XP_SOURCES = 2000;
const PROGRESS_RESET_DELAY = 400;
const INITIAL_PAGE_RENDER_DELAY = 1000;

const XP_CALCULATION_EXPONENT_VAL = 2;
const XP_CALCULATION_CONSTANT_VAL = 200;
export function useProgressBar(
    initialLevel: number,
    initialXp: number,
    allXpSources: Record<string, string>
) {
    let xpNeededForNextLevel = calculateXpNeededForNextLevel(initialLevel);
    const [level, setLevel] = useState(initialLevel);
    const [progress, setProgress] = useState(calculateProgress(initialXp, xpNeededForNextLevel));
    const [duration, setDuration] = useState(200);
    const [isAnimated, setIsAnimated] = useState(true);
    const [currentlyDisplayedXpSource, setCurrentlyDisplayedXpSource] =
        useState<keyof typeof allXpSources>('');
    const isMounted = useRef(true);
    const [totalXp, setTotalXp] = useState(0);

    useEffect(() => {
        isMounted.current = true;
        void handleLevelUp();
        return () => {
            isMounted.current = false; // Cleanup on unmount
        };
    }, []);

    async function handleLevelUp() {
        // Initial delay to let page render before starting the animation
        await safeSetTimeout(INITIAL_PAGE_RENDER_DELAY);
        let currentXp = initialXp;

        // Loop through all the xp sources and update the progress bar
        for (const xpSource in allXpSources) {
            setCurrentlyDisplayedXpSource(xpSource);
            currentXp += Number(allXpSources[xpSource]);

            // Level up until the xp is less than the xp required for the next level
            while (currentXp >= xpNeededForNextLevel) {
                const newLevel = level + 1;
                xpNeededForNextLevel = calculateXpNeededForNextLevel(newLevel);

                // quickly animate the progress bar to 100%
                setDuration(QUICK_ANIMATION_DURATION);
                setIsAnimated(true);
                setProgress(MAX_PROGRESS_VAL);

                // wait for animation to finish then reset the progress bar to 0
                await safeSetTimeout(PROGRESS_RESET_DELAY);
                setIsAnimated(false);
                setLevel((prevLevel) => prevLevel + 1);
                setProgress(MIN_PROGRESS_VAL);

                currentXp -= xpNeededForNextLevel;
            }

            // Animate progress bar to final position
            setIsAnimated(true);
            setDuration(MEDIUM_ANIMATION_DURATION);
            setProgress(calculateProgress(currentXp, xpNeededForNextLevel));

            // Wait for a bit before moving to the next xp source
            await safeSetTimeout(DELAY_BETWEEN_XP_SOURCES);
        }
    }

    function calculateXpNeededForNextLevel(level: number) {
        return (level + 1) ** XP_CALCULATION_EXPONENT_VAL + XP_CALCULATION_CONSTANT_VAL;
    }

    function calculateProgress(currentXp: number, xpNeededForNextLevel: number) {
        return currentXp / xpNeededForNextLevel;
    }

    async function safeSetTimeout(delay: number) {
        // eslint-disable-next-line @typescript-eslint/return-await
        return new Promise<void>((resolve) => {
            const timeout = setTimeout(() => {
                if (isMounted.current) resolve();
            }, delay);

            // Clear timeout on unmount
            return () => clearTimeout(timeout);
        });
    }

    return {
        level,
        progress,
        duration,
        isAnimated,
        currentXpSourceName:
            friendlyXpSourceDisplay[
                currentlyDisplayedXpSource as keyof typeof friendlyXpSourceDisplay
            ],
        currentXpSourceVal: Number(allXpSources[currentlyDisplayedXpSource]),
        handleLevelUp,
    };
}
