import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/users/3'
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
        console.log(response.data);

        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);
