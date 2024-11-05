/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IExerciseDetailsResponse } from 'src/api/exercise-service/interfaces/responses/IExerciseWorkoutHistoryResponse';

interface IEditExerciseModalContext {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    routeToNavigateBackTo: string;
    setRouteToNavigateBackTo: Dispatch<SetStateAction<string>>;
    exerciseToEdit: IExerciseDetailsResponse;
    setExerciseToEdit: Dispatch<SetStateAction<IExerciseDetailsResponse>>;
}

const EditExerciseModalContext = createContext<IEditExerciseModalContext>(
    {} as IEditExerciseModalContext
);

export default function EditExerciseModalProvider({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [routeToNavigateBackTo, setRouteToNavigateBackTo] = useState<string>('');
    const [exerciseToEdit, setExerciseToEdit] = useState<IExerciseDetailsResponse>(
        {} as IExerciseDetailsResponse
    );

    return (
        <EditExerciseModalContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                routeToNavigateBackTo,
                setRouteToNavigateBackTo,
                exerciseToEdit,
                setExerciseToEdit,
            }}
        >
            {children}
        </EditExerciseModalContext.Provider>
    );
}

export function useEditExerciseModal() {
    return useContext(EditExerciseModalContext);
}
