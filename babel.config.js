module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'module:react-native-dotenv',
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        src: './src',
                    },
                },
            ],
            [
                '@tamagui/babel-plugin',
                {
                    components: ['tamagui'],
                    config: './tamagui.config.ts',
                    // logTimings: true,
                    // disableExtraction: process.env.NODE_ENV === 'development',
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
