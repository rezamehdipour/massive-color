import { useState } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { Link, useParams, Navigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Helpers
import { getRgb, getHsl, getScale } from "../../helper/colorHelper";

// Components
import Color from "./Color";

// Framer Motion
import { motion } from "framer-motion";

// Material UI
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";

// CSS
import "./Palette.scss";

const paletteVariants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
	transition: {
		ease: "linear",
	},
};
export default function Palette() {
	const palettes = useSelector((state) => state.palettes);
	const paletteId = useParams().paletteId;
	const IntendedPalette = palettes.find((palette) => palette.id === paletteId);
	const [range, setRange] = useState(500);
	const [format, setFormat] = useState("hex");
	const [snackbar, setSnackbar] = useState(false);
	useUpdateEffect(() => {
		setSnackbar(true);
	}, [format]);

	// If intended Palette Not Found!
	if (IntendedPalette === undefined) {
		return <Navigate to="/" />;
	}
	const IntendedPaletteColors = IntendedPalette.colors;

	return (
		<motion.div
			className="Palette"
			variants={paletteVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition="transition"
		>
			<header>
				<Link className="brand" to="/">
					React Color Picker
				</Link>
				<div className="options">
					<div className="range">
						<label>Level : {range}</label>
						<Slider
							min={100}
							max={900}
							step={100}
							value={range}
							marks={true}
							onChange={(event, newValue) => setRange(newValue)}
						/>
					</div>
					<div className="colorFormat">
						<Select value={format} onChange={(e) => setFormat(e.target.value)}>
							<MenuItem value={"hex"}>HEX - #FFF</MenuItem>
							<MenuItem value={"rgb"}>RGB - (255,255,255)</MenuItem>
							<MenuItem value={"hsl"}>HSL - (50%, 10%, 20%)</MenuItem>
						</Select>
					</div>
				</div>
			</header>

			<div className="colors">
				{IntendedPaletteColors.map(({ name, color }, i) => {
					color = getScale(color)[range / 100 - 1];
					if (format === "rgb") {
						color = getRgb(color);
					} else if (format === "hsl") {
						color = getHsl(color);
					}
					return <Color key={i} name={name} color={color} range={range}></Color>;
				})}
			</div>

			<footer>
				<h6>
					<span className="paletteName">{IntendedPalette.paletteName}</span>
					<span className="emoji">{IntendedPalette.emoji}</span>
				</h6>
			</footer>

			<Snackbar
				open={snackbar}
				autoHideDuration={4000}
				onClose={() => setSnackbar(false)}
				message="Format Changed!"
			/>
		</motion.div>
	);
}
