import axios from 'axios';
import { axiosInstance } from '@/lib/axiosConfig';

// ================|| Login User API ||================
export const loginUser = async (username: string, password: string) => {
    try {
        // const response = await axiosInstance.get('', {
        //     username,
        //     password
        // });
        const response = await axiosInstance.get('');

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return error;
    }
};
