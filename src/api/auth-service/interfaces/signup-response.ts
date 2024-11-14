import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';

export interface ISignupResponse {
    accessToken: string;
    user: IUserResponse;
}
