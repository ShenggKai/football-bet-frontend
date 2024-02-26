import axios from 'axios';
import { axiosInstance } from '@/lib/axiosConfig';

// ================|| Login User API ||================
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/login', {
            username,
            password
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.code === 'ECONNABORTED') {
                console.log('Request timed out');
            } else if (error.response) {
                console.log(error.response.data);
            }
        } else {
            throw error;
        }
    }
};
