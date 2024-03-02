// axios
import axios from 'axios';

// Next.js
import { useRouter } from 'next/navigation';

// project import
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { setTokens, clearTokens } from '@/redux/reducers/authSlice';

const baseURL = 'http://127.0.0.1:8000';

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    timeout: 10000
});

// handle before request
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// handle after response
function createResponseInterceptor() {
    // const refreshToken = useAppSelector((state) => state.auth.refreshToken);

    const interceptor = axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            // Reject promise if usual error
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }

            /*
             * When response code is 401, try to refresh the token.
             * Eject the interceptor so it doesn't loop in case
             * token refresh causes the 401 response.
             *
             * Must be re-attached later on or the token refresh will only happen once
             */
            axios.interceptors.response.eject(interceptor);

            return axios
                .post(`${baseURL}/refresh-token`, {
                    refresh_token: useAppSelector((state) => state.auth.refreshToken)
                })
                .then((response) => {
                    const dispatch = useAppDispatch();
                    // save tokens
                    dispatch(setTokens([response.data.access_token, response.data.refresh_token]));

                    error.response.config.headers['Authorization'] =
                        'Bearer ' + response.data.access_token;
                    // Retry the initial call, but with the updated token in the headers.
                    // Resolves the promise if successful
                    return axios(error.response.config);
                })
                .catch((error2) => {
                    // Retry failed, clean up and reject the promise
                    const dispatch = useAppDispatch();
                    const router = useRouter();

                    dispatch(clearTokens());
                    router.push('/auth/login');
                    return Promise.reject(error2);
                })
                .finally(createResponseInterceptor); // Re-attach the interceptor by running the method
        }
    );
}

// Execute the method once during start
// createResponseInterceptor();
