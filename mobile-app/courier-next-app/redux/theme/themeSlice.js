import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appTheme: '',
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        resetTheme: () => initialState,

        setThemeState: (state, action) => {
            state.appTheme = action.payload    
        },
    },
})

export const { resetTheme, setThemeState} = themeSlice.actions;
export default themeSlice.reducer;