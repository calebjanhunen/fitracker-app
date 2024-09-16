import { request } from '../client';
import { equipmentEndpoints } from './EquipmentApiConfig';
import { IEquipmentResponse } from './interfaces/IEquipmentResponse';

export async function getAllEquipment(): Promise<IEquipmentResponse[]> {
    return await request({
        method: 'GET',
        url: equipmentEndpoints.getAllEquipment(),
    });
}
