import dotenv from 'dotenv';

dotenv.config({
    path:
        process.env.NODE_ENV === 'development'
            ? '.env'
            : process.env.NODE_ENV === 'test'
            ? '.env.prev'
            : '.env.prod',
});

export default {
    expo: {
        name:
            process.env.ENVIRONMENT === 'preview'
                ? 'Fitracker Preview'
                : process.env.ENVIRONMENT === 'development'
                ? 'Fitracker Dev'
                : 'Fitracker',
        slug: 'fitracker',
        plugins: ['expo-router', 'expo-font'],
        scheme: 'fitracker',
        version: '1.0.0',
        runtimeVersion: {
            policy: 'appVersion',
        },
        orientation: 'portrait',
        icon:
            process.env.ENVIRONMENT === 'preview'
                ? './assets/fitracker-preview-icon.png'
                : './assets/fitracker-icon.png',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/fitracker-splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            bundleIdentifier:
                process.env.ENVIRONMENT === 'preview'
                    ? 'com.calebjanhunen.fitracker.preview'
                    : process.env.ENVIRONMENT === 'development'
                    ? 'com.calebjanhunen.fitracker.development'
                    : 'com.calebjanhunen.fitracker',
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
            PROD_API_URL: process.env.API_URL,
            ENVIRONMENT: process.env.ENVIRONMENT,
        },
        updates: {
            url: 'https://u.expo.dev/45091350-52c3-4c87-8398-d0988898db85',
        },
        sdkVersion: '51.0.0',
    },
    name: 'fitracker',
};
