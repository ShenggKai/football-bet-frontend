import { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// project import
import { LayoutContext } from '@/layout/context/layoutcontext';
import { loginUser } from './loginAPI';
import { setAuthState, setTokens } from '@/lib/features/auth/authSlice';
import { useAppDispatch } from '@/lib/store';

const useLogin = () => {
    const { setIsLoading, showError, showSuccess } = useContext(LayoutContext);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const login = async (username: string, password: string) => {
        setIsLoading(true);

        try {
            const response = await loginUser(username, password);
            // handle successful login here, e.g. update user state, redirect, etc.

            // save tokens
            dispatch(setTokens([response.data.access_token, response.data.refresh_token]));

            // set status logged in = true
            dispatch(setAuthState(true));

            // show message
            showSuccess('Đăng nhập thành công');
            router.push('/');

            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showError(error.response.data.detail);
                return error.response;
            } else {
                showError('Lỗi máy chủ');
                return error;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { login };
};

export default useLogin;
