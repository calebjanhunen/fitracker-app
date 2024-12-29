/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { ExerciseDetailsDto } from 'src/api/generated';

interface IEditExerciseModalContext {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    routeToNavigateBackTo: string;
    setRouteToNavigateBackTo: Dispatch<SetStateAction<string>>;
    exerciseToEdit: ExerciseDetailsDto;
    setExerciseToEdit: Dispatch<SetStateAction<ExerciseDetailsDto>>;
}

const EditExerciseModalContext = createContext<IEditExerciseModalContext>(
    {} as IEditExerciseModalContext
);

export default function EditExerciseModalProvider({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [routeToNavigateBackTo, setRouteToNavigateBackTo] = useState<string>('');
    const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseDetailsDto>(
        {} as ExerciseDetailsDto
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
