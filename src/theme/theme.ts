export type ThemeType = typeof theme;

export const theme = {
    fonts: {
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
    },
    fontSize: {
        largeTitle: 34,
        title1: 28,
        title2: 22,
        title3: 20,
        headline: 17,
        body: 17,
        button: 16,
        subhead: 15,
        footnote: 13,
        caption1: 12,
        caption2: 11,
    },
    fontColors: {
        white: '#FFFFFF',
        primary: '#000000',
        light: '#636363',
        placeholder: '#9E9E9E',
    },
    colors: {
        primary: '#5E69EE',
        secondary: '#39AFEA',
        white: '#FFFFFF',
        error: '#CC0000',
        success: '#4BB543',
    },
    spacing: {
        xxxl: '65px',
        xxl: '40px',
        xl: '25px',
        lg: '20px',
        md: '16px',
        sm: '14px',
        xs: '12px',
        xxs: '10px',
        xxxs: '3px',
    },
};
