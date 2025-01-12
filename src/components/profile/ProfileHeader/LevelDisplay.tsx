import React from 'react';

import Hexagon from './Hexagon';

interface Props {
    level: number;
}

export default function LevelDisplay({ level }: Props) {
    return <Hexagon size={40} text={level} />;
}
