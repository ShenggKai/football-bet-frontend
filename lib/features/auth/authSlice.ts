import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
    authState: boolean;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: IAuthState = {
    authState: false,
    accessToken: null,
    refreshToken: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<boolean>) => {
            state.authState = action.payload;
        },
        setTokens: (state, action: PayloadAction<[string, string]>) => {
            const [accessToken, refreshToken] = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
});

export const { setAuthState, setTokens, clearTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
