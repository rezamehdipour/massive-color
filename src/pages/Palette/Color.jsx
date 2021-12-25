import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Helpers
import { getLuminance } from "../../helper/colorHelper";

// CSS
import "./Color.scss";

const Color = ({ name, color, range }) => {
	const location = useLocation();
	const [copying, setCopying] = useState(false);
	const handleCopying = () => {
		setCopying(true);
		document.body.classList.add("overflow-hidden");
		setTimeout(() => {
			setCopying(false);
			document.body.classList.remove("overflow-hidden");
		}, 1500);
	};
	const textColor = getLuminance(color) <= 0.5 ? "white" : "black";

	return (
		<div className="color" style={{ backgroundColor: color, color: textColor }}>
			<CopyToClipboard text={color}>
				<button className="copy" onClick={() => handleCopying()}>
					Copy
				</button>
			</CopyToClipboard>
			<span className="name">
				{name} {range}
			</span>
			<Link className="more" to={`${location.pathname}/${name.toLowerCase()}`}>
				More
			</Link>

			{copying && (
				<>
					<div className="copyOverlay" style={{ backgroundColor: color }}></div>
					<div className="copyOverlayContent">
						<h6 className="copied">Copied !</h6>
						<p>{color}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Color;
