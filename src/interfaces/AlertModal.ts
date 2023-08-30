import { type theme } from '../theme/theme';

export interface AlertModalVars {
    title: string;
    desc: string;
    ctaBtn: {
        text: string;
        backgroundColor: keyof typeof theme.colors;
        textColor: keyof typeof theme.fontColors;
    };
    ctaFunction: () => void;
}
