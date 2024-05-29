import 'dotenv/config';

export default {
    expo: {
        name: 'fitracker',
        slug: 'fitracker',
        extra: {
            androidEmulatorApiUrl: process.env.ANDROID_EMULATOR_API_URL,
            iosEmulatorApiUrl: process.env.IOS_EMULATOR_API_URL,
            physicalDeviceApiUrl: process.env.PHYSICAL_DEVICE_API_URL,
            apiPort: process.env.API_PORT,
        },
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
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
