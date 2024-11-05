import { useQuery } from '@tanstack/react-query';
import { getBodyPartsQueryKey } from 'src/api/body-part-service/BodyPartApiConfig';
import { getAllBodyParts } from 'src/api/body-part-service/BodyPartApiService';
import { IBodyPartResponse } from 'src/api/body-part-service/interfaces/IBodyPartResponse';
import { IErrorResponse } from 'src/api/client';
import { getEqupmentQueryKey } from 'src/api/equipment-service/EquipmentApiConfig';
import { getAllEquipment } from 'src/api/equipment-service/EquipmentApiService';
import { IEquipmentResponse } from 'src/api/equipment-service/interfaces/IEquipmentResponse';

interface IUseGetEquipmentAndBodyParts {
    equipment: IEquipmentResponse[];
    bodyParts: IBodyPartResponse[];
    isLoading: boolean;
    error: IErrorResponse | null;
}

export function useGetEquipmentAndBodyParts(): IUseGetEquipmentAndBodyParts {
    const {
        data: equipment,
        isLoading: isEquipmentLoading,
        error: equipmentError,
    } = useQuery<IEquipmentResponse[], IErrorResponse>({
        queryFn: getAllEquipment,
        queryKey: getEqupmentQueryKey,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    const {
        data: bodyParts,
        isLoading: isBodyPartsLoading,
        error: bodyPartsError,
    } = useQuery<IBodyPartResponse[], IErrorResponse>({
        queryFn: getAllBodyParts,
        queryKey: getBodyPartsQueryKey,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return {
        equipment: equipment ?? [],
        bodyParts: bodyParts ?? [],
        isLoading: isBodyPartsLoading || isEquipmentLoading,
        error: bodyPartsError ?? equipmentError,
    };
}
