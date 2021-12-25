import { configureStore } from "@reduxjs/toolkit";

// Slices
import palettesSlice from "./palettes/palettesSlice";
import newPaletteSlice from "./newPalette/newPalette";

export default configureStore({
	reducer: {
		palettes: palettesSlice,
		newPalette: newPaletteSlice
	},
});
