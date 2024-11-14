import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';

export interface IAuthenticationResponse {
    accessToken: string;
    user: IUserResponse;
}
