import { config } from '@tamagui/config/v3';
import { color, radius, size, space, themes, zIndex } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';

const tokens = createTokens({
    size,
    space,
    zIndex,
    color,
    radius,
});

const appConfig = createTamagui({
    ...config,
    themes,
    tokens,
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
    // or '@tamagui/core'
    // overrides TamaguiCustomConfig so your custom types
    // work everywhere you import `tamagui`
    interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
