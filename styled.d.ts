import 'styled-components';
import { type ThemeType } from './src/theme/theme';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
