import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://e71f-137-59-44-39.ngrok-free.app',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    timeout: 10000
});

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

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);
