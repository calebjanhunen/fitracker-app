import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '../common/useLocalStorage';

interface IUseStopwatch {
    elapsedTime: number;
    clearStopwatch: () => void;
}
const START_TIME_STORAGE_KEY = 'stopwatch-start-time';

export function useStopwatch(): IUseStopwatch {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const startTime = useRef(0);
    const intervalRef = useRef<number | null>(null);
    const { saveToStorage, getFromStorage, removeFromStorage } = useLocalStorage();

    useEffect(() => {
        startStopwatch()
            .then(() => {
                console.log('stopwatch started');
            })
            .catch((e) => {
                console.error(e);
            });

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    async function startStopwatch() {
        const startTimeFromStorage = await getFromStorage(START_TIME_STORAGE_KEY);

        if (startTimeFromStorage) {
            startTime.current = parseInt(startTimeFromStorage);
        } else {
            startTime.current = Date.now();
            await saveToStorage(START_TIME_STORAGE_KEY, startTime.current.toString());
        }

        intervalRef.current = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime.current) / 1000));
        }, 1000);
    }

    async function clearStopwatch() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        await removeFromStorage(START_TIME_STORAGE_KEY);
        setElapsedTime(0);
        startTime.current = 0;
    }

    return {
        elapsedTime,
        clearStopwatch,
    };
}
