import 'styled-components';
import { type ThemeType } from '../theme/theme';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
