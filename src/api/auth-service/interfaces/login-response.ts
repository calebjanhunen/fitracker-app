import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';

export interface ILoginResponse {
    accessToken: string;
    user: IUserResponse;
}
