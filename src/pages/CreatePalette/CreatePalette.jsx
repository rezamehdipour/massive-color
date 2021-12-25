import { useState } from "react";

// Components
import Sidebar from "./Sidebar";
import Header from "./Header";
import Palette from "./Palette";

// CSS
import "./CreatePalette.scss";

const CreatePalette = (props) => {
	const [sidebar, setSidebar] = useState(true);
	const handleToggleSidebar = () => setSidebar((prevState) => !prevState);

	return (
		<div className="CreatePalette">
			<Sidebar open={sidebar} />
			<main>
				<Header handleToggleSidebar={handleToggleSidebar} sidebar={sidebar} />
				<Palette />
			</main>
		</div>
	);
};

export default CreatePalette;
