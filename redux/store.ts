// redux
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// project import
import { authReducer } from '@/redux/reducers/authSlice';

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        }
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// configure key to persist
const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['authState', 'accessToken', 'refreshToken', 'username', 'roleName']
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
    auth: persistedReducer
});

// ========================|| Store ||========================
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

// ========================|| Type ||========================
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ========================|| App dispatch ||========================
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ========================|| App selector ||========================
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
