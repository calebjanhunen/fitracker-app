export const AuthEndpoints = {
    login: () => '/auth/login',
    logout: () => '/auth/logout',
    signup: () => '/auth/signup',
    refreshToken: () => '/auth/refresh',
    verifyEmail: () => '/auth/verify-email-on-signup',
    confirmEmailVerificationCode: () => '/auth/confirm-email-verification-code',
    forgotPassword: () => '/auth/forgotPassword',
    resetPassword: () => '/auth/resetPassword',
};
