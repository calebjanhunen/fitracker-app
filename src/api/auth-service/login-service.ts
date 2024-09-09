import { request } from '../client';
import { ILoginResponse } from './interfaces/login-response';
import { SignupRequestDto } from './interfaces/requests/signup-request-dto';
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

export async function signup(
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string
): Promise<ILoginResponse> {
    return await request<SignupRequestDto>({
        method: 'POST',
        url: AuthEndpoints.signup(),
        data: {
            username,
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
        },
    });
}
