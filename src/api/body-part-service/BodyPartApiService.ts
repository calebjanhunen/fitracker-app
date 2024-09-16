import { request } from '../client';
import { bodyPartEndpoints } from './BodyPartApiConfig';
import { IBodyPartResponse } from './interfaces/IBodyPartResponse';

export async function getAllBodyParts(): Promise<IBodyPartResponse[]> {
    return await request({
        method: 'GET',
        url: bodyPartEndpoints.getAllBodyParts(),
    });
}
