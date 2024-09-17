import { request } from '../client';
import { IUserResponse } from './interfaces/IUserResponse';
import { userEndpoints } from './UserApiConfig';

export async function getUserById(): Promise<IUserResponse> {
    return await request({
        method: 'GET',
        url: userEndpoints.getUserById(),
    });
}
