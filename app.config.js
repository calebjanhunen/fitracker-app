import 'dotenv/config';

const prodApiUrl = process.env.PROD_API_URL;

export default {
    expo: {
        name: 'Fitracker',
        slug: 'fitracker',
        plugins: ['expo-router', 'expo-font'],
        scheme: 'fitracker',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/fitracker-icon.png',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/fitracker-splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'com.calebjanhunen.fitracker',
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
        extra: {
            eas: {
                projectId: '45091350-52c3-4c87-8398-d0988898db85',
            },
            PROD_API_URL: prodApiUrl,
            ENVIRONMENT: process.env.ENVIRONMENT,
        },
        sdkVersion: '51.0.0',
    },
    name: 'fitracker',
};
