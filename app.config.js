import 'dotenv/config';

export default {
    expo: {
        name: 'fitracker',
        slug: 'fitracker',
        plugins: ['expo-router', 'expo-font'],
        scheme: 'fitracker',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
        },
        web: {
            favicon: './assets/favicon.png',
        },
        sdkVersion: '51.0.0',
    },
    name: 'fitracker',
};
