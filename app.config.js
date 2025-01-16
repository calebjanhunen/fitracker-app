import 'dotenv/config';

const appEnv = process.env.APP_VARIANT;
const apiUrl = process.env.API_URL;

export default {
    expo: {
        name:
            appEnv === 'development'
                ? 'Fitracker (Dev)'
                : appEnv === 'preview'
                ? 'Fitracker (Preview)'
                : 'Fitracker',
        slug: 'fitracker',
        plugins: ['expo-router', 'expo-font', 'expo-secure-store'],
        scheme: 'fitracker',
        version: '2.8.1',
        runtimeVersion: {
            policy: 'appVersion',
        },
        orientation: 'portrait',
        icon:
            appEnv === 'development'
                ? './assets/fitracker-dev-icon.png'
                : appEnv === 'preview'
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
                appEnv === 'development'
                    ? 'com.calebjanhunen.fitracker.development'
                    : appEnv === 'preview'
                    ? 'com.calebjanhunen.fitracker.preview'
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
            PROD_API_URL: apiUrl,
            ENVIRONMENT: appEnv,
        },
        updates: {
            url: 'https://u.expo.dev/45091350-52c3-4c87-8398-d0988898db85',
        },
    },
    name: 'fitracker',
};
