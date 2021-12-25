import { createSlice } from "@reduxjs/toolkit";

// Data
import palettesData from "../../data/palettesData";

// Initial Sate
let initialState = palettesData;
if (window.localStorage.getItem("palettes") !== null) { // if Palettes data found on localStorage
	initialState = JSON.parse(window.localStorage.getItem("palettes"));
}

export const palettesSlice = createSlice({
	name: "palettes",
	initialState,
	reducers: {
		addPalette: (state, action) => {
			state.push(action.payload)
		},
		deletePalette: (state, action) => {
			return state.filter((palette) => palette.id !== action.payload);
		},
	},
});

export const { addPalette, deletePalette } = palettesSlice.actions;

export default palettesSlice.reducer;
