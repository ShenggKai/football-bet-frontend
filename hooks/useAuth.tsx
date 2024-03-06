import { useContext } from 'react';

// axios
import axios from 'axios';

// Next.js
import { useRouter } from 'next/navigation';

// project import
import { LayoutContext } from '@/layout/context/layoutcontext';
import { loginUser } from '@/api/authAPI';
import { setAuthState, setTokens, setUserInfo } from '@/redux/reducers/authSlice';
import { useAppDispatch } from '@/redux/store';

// ========================|| Custom hook login ||========================
const useAuth = () => {
    const { setIsLoading, showError, showSuccess } = useContext(LayoutContext);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogin = async (username: string, password: string) => {
        setIsLoading(true);

        try {
            const response = await loginUser(username, password);
            // handle successful login here, e.g. update user state, redirect, etc.

            // save tokens
            dispatch(setTokens([response.data.access_token, response.data.refresh_token]));

            // save user info
            dispatch(setUserInfo([response.data.username, response.data.role_name]));

            // set status logged in = true
            dispatch(setAuthState(true));

            // show message
            showSuccess('Đăng nhập thành công');
            router.push('/');

            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showError(error.response.data.detail);

                // for demo, remove in production
                dispatch(setUserInfo(['admin', 'admin']));
                dispatch(setAuthState(true));
                router.push('/');

                return error.response;
            } else {
                showError('Lỗi máy chủ');

                // for demo, remove in production
                dispatch(setUserInfo(['admin', 'admin']));
                dispatch(setAuthState(true));
                router.push('/');

                return error;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin };
};

export default useAuth;
