import { useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Helpers
import { getScale, getRgb, getHsl } from "../../helper/colorHelper";

// Redux
import { useSelector } from "react-redux";

// Components
import Color from "./Color";

// Framer Motion
import { motion } from "framer-motion";

// Material UI
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// CSS
import "./Scale.scss";

const scaleVariants = {
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
const Scale = (props) => {
	const navigate = useNavigate();
	const palettes = useSelector((state) => state.palettes);
	const [format, setFormat] = useState("hex");
	const params = useParams();
	const paletteId = params.paletteId;
	const colorName = params.colorName;
	const intendedPalette = palettes.find((palette) => palette.id === paletteId);
	// If intended Palette Not Found!
	if (intendedPalette === undefined) {
		return <Navigate to="/" />;
	}
	const intendedColor = intendedPalette.colors.find((color) => color.name.toLowerCase() === colorName);
	// If intended Color Not Found!
	if (intendedColor === undefined) {
		return <Navigate to="/" />;
	}
	const intendedColorName = intendedColor.name;
	const intendedColorScale = getScale(intendedColor.color);

	return (
		<motion.div
			className="Scale"
			variants={scaleVariants}
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
				{intendedColorScale.map((color, index) => {
					const range = (index + 1) * 100;
					if (format === "rgb") {
						color = getRgb(color);
					} else if (format === "hsl") {
						color = getHsl(color);
					}
					return <Color key={uuidv4()} name={intendedColorName} color={color} range={range} />;
				})}
				<div className="goBack">
					<button onClick={() => navigate(-1)}>Go Back</button>
				</div>
			</div>
		</motion.div>
	);
};

export default Scale;
