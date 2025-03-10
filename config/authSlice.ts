import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../library/store";
import { UserData } from "@/interfaces/interface";

const initialState = {
    isAuthenticated: false,
    user: null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.role = null;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

// Selector functions to access user information
export const isAuthenticated = (state: RootState) => state.authState.isAuthenticated; // Check Auth State Selector
export const user = (state: RootState): UserData | null => state.authState.user;  // Get User Info Selector

export default authSlice.reducer;