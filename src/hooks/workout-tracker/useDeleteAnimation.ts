import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, ViewStyle } from 'react-native';

interface IUseDeleteAnimation {
    onDelete: () => void;
    duration?: number;
}

export function useDeleteAnimation({ onDelete, duration = 200 }: IUseDeleteAnimation) {
    const heightAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const [height, setHeight] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        Animated.parallel([
            Animated.timing(heightAnim, {
                toValue: 0,
                duration,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration,
                useNativeDriver: false,
            }),
        ]).start(onDelete);
    };

    const handleLayout = (event: LayoutChangeEvent) => {
        if (height === null && !isDeleting) {
            const { height } = event.nativeEvent.layout;
            setHeight(height);
        }
    };

    const animatedStyle: ViewStyle = {
        height: (isDeleting && height !== null
            ? heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, height],
              })
            : 'auto') as number | Animated.AnimatedInterpolation<string | number>,
        opacity: opacityAnim,
    };

    useEffect(() => {
        if (!isDeleting) {
            setHeight(null);
        }
    }, [isDeleting]);

    return {
        animatedStyle,
        handleDelete,
        handleLayout,
    };
}
