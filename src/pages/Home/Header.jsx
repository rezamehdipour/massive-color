import { Link } from "react-router-dom";

// CSS
import "./Header.scss";

const Header = (props) => {
	return (
		<header>
			<div className="container mx-auto">
				<div className="wrapper">
					<h1>React Colors</h1>
					<Link to="/palette/new">Create Palette +</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
