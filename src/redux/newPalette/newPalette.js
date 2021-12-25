import { createSlice } from "@reduxjs/toolkit";

// Initial Sate
let initialState = {
    paletteName: null,
    id: null,
    emoji: null,
    colors: [],
};

export const newPaletteSlice = createSlice({
    name: "newPalette",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.paletteName = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setEmoji: (state, action) => {
            state.emoji = action.payload;
        },
        addColor: (state, action) => {
            state.colors.push(action.payload);
        },
        setColors: (state, action) => {
            state.colors = action.payload;
        },
        removeColor: (state, action) => {
            let colorIndex = state.colors.findIndex((c) => c.color === action.payload);
            state.colors.splice(colorIndex, 1);
        },
        clear: (state, action) => {
            return initialState;
        },
    },
});

export const { setName, setId, setEmoji, addColor, setColors, removeColor, clear } = newPaletteSlice.actions;

export default newPaletteSlice.reducer;
