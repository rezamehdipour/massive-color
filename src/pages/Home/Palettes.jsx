import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { deletePalette } from "../../redux/palettes/palettesSlice";

// CSS
import "./Palettes.scss";

export default function Palettes() {
	const dispatch = useDispatch();
	const palettes = useSelector((state) => state.palettes);

	return (
		<div className="palettes container mx-auto">
			{palettes.map(({ paletteName, id, emoji, colors }) => (
				<div key={id} className="palette">
					<div className="delete" onClick={() => dispatch(deletePalette(id))}>
						<i className="fas fa-trash-alt"></i>
					</div>
					<Link to={`/palette/${id}`} className="link">
						<div className="colors">
							{colors.map(({ name, color }, i) => (
								<div className="color" key={i} style={{ backgroundColor: color }} />
							))}
						</div>
						<div className="info">
							<h3 className="name">{paletteName}</h3>
							<span className="emoji">{emoji}</span>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
}
