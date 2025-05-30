import { jobsAPI } from '@/api/jobAPI';
import { authAPI } from '@/api/authAPI';
import authSlice from "../config/authSlice";
import themeSlice from "../config/themeSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";


// Persist configuration for auth slice
const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage, // Use AsyncStorage for persistence
}

// Persist configurations for theme slice
const themePersistConfig = {
    key: 'theme',
    storage: AsyncStorage
}

// Combine reducers into a single reducer object.
const rootReducer = combineReducers({
    authState: persistReducer(authPersistConfig, authSlice), // Persist auth slice
    themeState: persistReducer(themePersistConfig, themeSlice), // Persist theme slice
    [authAPI.reducerPath]: authAPI.reducer, // Add authSlice reducer to the rootReducer
    [jobsAPI.reducerPath]: jobsAPI.reducer, // Add jobsAPI reducer to the rootReducer
});


export const store = configureStore({
    reducer: rootReducer,
    // Add the middleware for the API slices
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            },
        }).concat(authAPI.middleware, jobsAPI.middleware), // Middleware for caching,
    devTools: process.env.NODE_ENV !== 'production',
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create and export persistor for the store
export const persistor = persistStore(store);