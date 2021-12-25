// Components
import Header from "./Header";
import Palettes from "./Palettes";

// Framer Motion
import { motion } from "framer-motion";

// CSS
import "./Home.scss";

const homeVariants = {
	initial: {
		x: "-100vw",
	},
	animate: {
		x: "0",
	},
	exit: {
		x: "-100vw",
	},
	transition: {
		ease: "linear",
	},
};

const Home = (props) => {
	return (
		<motion.div
			className="Home"
			variants={homeVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition="transition"
		>
			<Header />
			<main>
				<Palettes />
			</main>
		</motion.div>
	);
};

export default Home;
