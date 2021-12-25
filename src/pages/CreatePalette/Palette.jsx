// Redux
import { useDispatch, useSelector } from "react-redux";
import { setColors, removeColor } from '../../redux/newPalette/newPalette';

// Helpers
import { getLuminance } from "../../helper/colorHelper";

// React Sortable HOC
import { SortableElement, SortableContainer } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

// Material UI
import DeleteIcon from "@mui/icons-material/Delete";

// CSS
import "./Palette.scss";

const Color = SortableElement(({ name, color }) => {
	const dispatch = useDispatch();
	const handleDeleteColor = (color) => dispatch(removeColor(color));
	const textColor = getLuminance(color) <= 0.5 ? "white" : "black";

	return (
		<div className="color" style={{ backgroundColor: color, color: textColor }}>
			<h6 className="name">{name}</h6>
			<button className="delete" onClick={() => handleDeleteColor(color)}>
				<DeleteIcon fontSize="inherit" />
			</button>
		</div>
	)
});

const Colors = SortableContainer(({ colors }) => {
	return (
		<div className="palette">
			{colors.map(({ name, color }, index) => (
				<Color key={name} name={name} color={color} index={index} />
			))}
		</div>
	)
})

const Palette = (props) => {
	const dispatch = useDispatch();
	const newPalette = useSelector(s => s.newPalette);
	const handleSortEnd = ({ oldIndex, newIndex }) => {
		const newColorsOrder = arrayMoveImmutable(newPalette.colors, oldIndex, newIndex);
		dispatch(setColors(newColorsOrder));
	}

	return (
		<>
			{newPalette.colors.length > 0 && <Colors colors={newPalette.colors} onSortEnd={handleSortEnd} axis="xy" />}
			{newPalette.colors.length < 1 && <h6 className="addSomeColors">Add some colors ...</h6>}
		</>
	);
};

export default Palette;
