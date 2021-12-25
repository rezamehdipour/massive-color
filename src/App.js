import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Hooks
import useUpdateEffect from "./hooks/useUpdateEffect";

// Pages
import Home from "./pages/Home/Home";
import Palette from "./pages/Palette/Palette";
import Scale from "./pages/Scale/Scale";
import CreatePalette from "./pages/CreatePalette/CreatePalette";

// Framer Motion
import { AnimatePresence } from "framer-motion";

// Global CSS
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
	const location = useLocation();
	const palettes = useSelector((s) => s.palettes);
	const handleSetPaletteDataToLocalStorage = () => {
		let palettesJSON = JSON.stringify(palettes);
		window.localStorage.setItem("palettes", palettesJSON);
	}
	useEffect(() => { // Save palettes to localStorage if already not exist there
		if (window.localStorage.getItem("palettes") === null) {
			handleSetPaletteDataToLocalStorage();
		}
	}, []);
	useUpdateEffect(() => { // Save new data of palettes to localStorage each time it changes [Delete/Add Palettes]
		handleSetPaletteDataToLocalStorage();
	}, [palettes]);

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.key}>
				<Route path="/" exact element={<Home />} />
				<Route path="/palette" exact element={<Navigate to="/" />} />
				<Route path="/palette/new" exact element={<CreatePalette />} />
				<Route path="/palette/:paletteId" element={<Palette />} />
				<Route path="/palette/:paletteId/:colorName" element={<Scale />} />
			</Routes>
		</AnimatePresence>
	);
};

export default App;
