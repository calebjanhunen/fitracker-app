import { useEffect, useRef, useState } from 'react';
import { LocalStorageKeys } from 'src/constants/LocalStorageKeys';
import { useLocalStorage } from '../common/useLocalStorage';

interface IUseStopwatch {
    elapsedTime: number;
    clearStopwatch: () => void;
}

export function useStopwatch(): IUseStopwatch {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const startTime = useRef(0);
    const intervalRef = useRef<number | null>(null);
    const { saveToStorage, getFromStorage, removeFromStorage } = useLocalStorage();

    useEffect(() => {
        startStopwatch()
            .then(() => {
                // console.log('stopwatch started');
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
        const startTimeFromStorage = await getFromStorage(LocalStorageKeys.startTime);

        if (startTimeFromStorage) {
            startTime.current = parseInt(startTimeFromStorage);
        } else {
            startTime.current = Date.now();
            await saveToStorage(LocalStorageKeys.startTime, startTime.current.toString());
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
        await removeFromStorage(LocalStorageKeys.startTime);
        setElapsedTime(0);
        startTime.current = 0;
    }

    return {
        elapsedTime,
        clearStopwatch,
    };
}
