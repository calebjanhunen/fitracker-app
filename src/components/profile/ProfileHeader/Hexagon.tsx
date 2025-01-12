import React from 'react';
import Svg, { Polygon, Text } from 'react-native-svg';
import { useTheme } from 'tamagui';

interface Props {
    size: number;
    text: string | number;
}

export default function Hexagon({ size, text }: Props) {
    const theme = useTheme();
    const height = (Math.sqrt(4.5) / 2) * size;
    const halfWidth = size / 2;
    const quarterHeight = height / 4;
    const borderWidth = 5;
    const points = `
    ${halfWidth},0 
    ${size},${quarterHeight} 
    ${size},${height - quarterHeight} 
    ${halfWidth},${height} 
    0,${height - quarterHeight} 
    0,${quarterHeight}
  `;

    const fontSize = 20;
    const adjustedFontSize = fontSize / Math.max(1, text.toString().length / 2); // Scale down for long text

    return (
        <Svg
            height={height + 2 * borderWidth} // Account for border height
            width={size + 2 * borderWidth} // Account for border width
            viewBox={`-${borderWidth} -${borderWidth} ${size + 2 * borderWidth} ${
                height + 2 * borderWidth
            }`}
        >
            <Polygon
                points={points}
                fill={theme.blue10.val}
                // stroke='#f17000'
                stroke={theme.blue7.val}
                strokeWidth={borderWidth}
            />
            <Text
                x={size / 2}
                y={height / 2}
                textAnchor='middle'
                alignmentBaseline='middle'
                fontSize={adjustedFontSize}
                fill={theme.gray1.val}
                fontFamily='Inter'
                fontWeight='bold'
            >
                {text}
            </Text>
        </Svg>
    );
}
