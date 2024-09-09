import { request } from '../client';
import { ILoginResponse } from './interfaces/login-response';
import { AuthEndpoints } from './login-endpoints';

export async function login(username: string, password: string): Promise<ILoginResponse> {
    return await request({
        method: 'POST',
        url: AuthEndpoints.login(),
        data: {
            username,
            password,
        },
    });
}
