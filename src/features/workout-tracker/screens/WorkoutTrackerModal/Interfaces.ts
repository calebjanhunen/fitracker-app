import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { type theme } from '../../../../theme/theme';

export interface AlertModalVars {
    title: string;
    desc: string;
    ctaBtn: {
        text: string;
        backgroundColor: keyof typeof theme.colors;
        textColor: keyof typeof theme.fontColors;
    };
    ctaFunction: (params: alertModalCTAFunctionParams) => void;
    ctaFunctionArgs: alertModalCTAFunctionParams;
}

export interface alertModalCTAFunctionParams {
    setWorkoutName: (val: string) => void;
    setAlertModalVisible: (val: boolean) => void;
    setWorkoutTrackerActive: (val: boolean) => void;
    sheetRef: React.RefObject<BottomSheetModal>;
    deleteAllExercises: () => void;
}
