import { RootState } from "@/library/store";
import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

// initialize initial state
const initialState = {
    theme: Appearance.getColorScheme() // Detect system theme
}

// create slice
const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        changeTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
})


export const { changeTheme, setTheme } = themeSlice.actions;

// Selector functions to access theme information
export const selectTheme = (state: RootState) => state.themeState.theme; // Get user theme

export default themeSlice.reducer;