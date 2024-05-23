import { type AxiosError } from 'axios';

const isDevelopment = __DEV__;

export const logger = {
    error: function (error: AxiosError): void {
        if (isDevelopment) {
            console.error(
                JSON.stringify(
                    {
                        timestamp: new Date().toISOString(),
                        message: error.message,
                        url: error.config?.url,
                        method: error.config?.method,
                        data: error.config?.data,
                        status: error.response?.status,
                        errorResponse: error.response?.data,
                    },
                    null,
                    2
                )
            );
        }
    },
};
