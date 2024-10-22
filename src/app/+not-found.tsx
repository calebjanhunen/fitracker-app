import React from 'react';
import { ImageBackground } from 'react-native';

export default function NotFound() {
    return (
        <ImageBackground
            source={require('../../assets/fitracker-splash.png')}
            style={{ height: '100%', width: '100%' }}
        />
    );
}
