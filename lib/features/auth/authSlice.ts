import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
    authState: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
    roleName: string | null;
}

const initialState: IAuthState = {
    authState: false,
    accessToken: null,
    refreshToken: null,
    username: null,
    roleName: null
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
        setUserInfo: (state, action: PayloadAction<[string, string]>) => {
            const [username, roleName] = action.payload;
            state.username = username;
            state.roleName = roleName;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.username = null;
            state.roleName = null;
        }
    }
});

export const { setAuthState, setTokens, setUserInfo, clearTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
