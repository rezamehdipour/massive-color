import { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addColor, clear } from '../../redux/newPalette/newPalette';

// Helper
import { getRandomColorHex } from "../../helper/colorHelper";

// Toast
import { toast } from "react-toastify";

// Color Picker
import { ChromePicker } from "react-color";

// Material UI
import TextField from "@mui/material/TextField";

// CSS
import "./Sidebar.scss";

toast.configure();
const Sidebar = ({ open }) => {
	const dispatch = useDispatch();
	const newPalette = useSelector(s => s.newPalette);
	const handleAddColor = (name, color) => {
		name = name.toLowerCase();
		if (newPalette.colors.length < 20) { // Palette Color MAX Capacity is 20
			if (newPalette.colors.find((c) => c.name === name) === undefined) { // Color NAME Must be Unique!
				if (newPalette.colors.find((c) => c.color === color) === undefined) { // Color HEX Must be Unique!
					let newColor = { name: name, color: color };
					dispatch(addColor(newColor));
				} else {
					toast.error('Picked Color has already added!', {
						position: toast.POSITION.BOTTOM_LEFT,
						autoClose: 3000,
					});
				}
			} else {
				toast.error('Picked Color Name is not unique!', {
					position: toast.POSITION.BOTTOM_LEFT,
					autoClose: 3000,
				});
			}
		} else {
			toast.error('Palette if full!');
		}
	};
	const handleAddRandomColor = () => { // Add Random Color to Palette
		while (true) {
			let randomColorHex = getRandomColorHex();
			if (newPalette.colors.find((c) => c.color === randomColorHex) === undefined) {
				let newColor = { name: `random${randomColorHex.replace(/(#)/g, '')}`, color: randomColorHex };
				dispatch(addColor(newColor));
				break;
			}
		}
	}
	const handleClearPalette = () => {
		dispatch(clear());
	}

	const [pickedColorHex, setPickedColorHex] = useState("#0000ff");
	const [pickedColorName, setPickedColorName] = useState("");
	let sidebarClass = "sidebar";
	if (open === false) sidebarClass += " hide";

	return (
		<aside className={sidebarClass}>
			<div className="wrapper">
				<h2>Design Your Palette</h2>
				<div className="buttons">
					<button
						className="clear"
						onClick={handleClearPalette}
						disabled={newPalette.colors.length < 1 ? true : false}
					>
						Clear Palette
					</button>
					<button
						className="random"
						onClick={handleAddRandomColor}
						disabled={newPalette.colors.length > 19 ? true : false}
					>
						Random Color
					</button>
				</div>
				<ChromePicker color={pickedColorHex} onChange={(newColor) => setPickedColorHex(newColor.hex)} />
				<TextField
					style={{ marginTop: "3rem", width: "100%" }}
					label="Color Name"
					value={pickedColorName}
					onChange={(e) => setPickedColorName(e.target.value)}
				/>

				<button
					className="add"
					onClick={() => handleAddColor(pickedColorName, pickedColorHex)}
					style={{ backgroundColor: pickedColorHex }}
					disabled={newPalette.colors.length > 19 ? true : false}
				>
					{newPalette.colors.length > 19 ? "Palette is FULL" : "Add Color"}
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
