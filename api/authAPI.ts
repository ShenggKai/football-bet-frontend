// project import
import { axiosInstance } from '@/api/apiConfig';

// ================|| Login User API ||================
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/login', {
            username,
            password
        });

        return response;
    } catch (error) {
        throw error;
    }
};
