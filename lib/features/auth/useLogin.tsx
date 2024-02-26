import { useState, useContext } from 'react';
import { loginUser } from './loginAPI';
import { LayoutContext } from '@/layout/context/layoutcontext';

const useLogin = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const { setIsLoading } = useContext(LayoutContext);
    const [error, setError] = useState<null | Error>(null);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await loginUser(username, password);
            // handle successful login here, e.g. update user state, redirect, etc.

            console.log(response);

            return response;
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, error };
};

export default useLogin;
