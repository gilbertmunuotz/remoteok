import { authAPI } from '@/api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "../config/authSlice";


// Persist configuration for auth slice
const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage, // Use AsyncStorage for persistence
}

// Combine reducers into a single reducer object.
const rootReducer = combineReducers({
    authState: persistReducer(authPersistConfig, authSlice), // Only persist the auth slice
    [authAPI.reducerPath]: authAPI.reducer, // Add authSlice reducer to the rootReducer
});

// Create and export the store
export const store = configureStore({
    reducer: rootReducer,
    // Add the middleware for the API slices
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            },
        }).concat(authAPI.middleware) // Middleware for caching,
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create and export persistor for the store
export const persistor = persistStore(store);