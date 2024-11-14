import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { IAuthenticationResponse } from 'src/api/auth-service/interfaces/authentication-response';
import { SignupRequestDto } from 'src/api/auth-service/interfaces/requests/signup-request-dto';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { clearSignupForm } from 'src/redux/signup-form/SignupFormSlice';
import { setUser } from 'src/redux/user/UserSlice';

interface IUseSignup {
    signup: (signupDto: SignupRequestDto) => void;
    isLoading: boolean;
    error: IErrorResponse | null;
}

export function useSignup(onSuccessCallback: () => void): IUseSignup {
    const { setAccessToken } = useAuth();
    const dispatch = useDispatch();

    const {
        mutate: signup,
        isPending: isLoading,
        error,
    } = useMutation<IAuthenticationResponse, IErrorResponse, SignupRequestDto>({
        mutationFn: AuthApi.signup,
        onSuccess: (response: IAuthenticationResponse) => {
            setAccessToken(response.accessToken);
            dispatch(setUser(response.user));
            onSuccessCallback();
            dispatch(clearSignupForm());
        },
    });

    return { signup, isLoading, error };
}
