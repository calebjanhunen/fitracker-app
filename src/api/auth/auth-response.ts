export interface LoginResponse {
    accessToken: string;
    user: {
        username: string;
        firstName: string;
        lastName: string;
    };
}
