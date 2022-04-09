import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addPalette } from "../../redux/palettes/palettesSlice";
import { setName, clear } from "../../redux/newPalette/newPalette";

// Emoji Picker
import { Picker as EmojiPicker } from "emoji-mart";

// Toast
import { toast } from "react-toastify";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// MUI Icon
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// CSS
import "./Header.scss";
import "emoji-mart/css/emoji-mart.css";

toast.configure();
const Header = ({ handleToggleSidebar, sidebar }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const newPalette = useSelector((s) => s.newPalette);
	const palettes = useSelector((s) => s.palettes);
	const [newPaletteName, setNewPaletteName] = useState("");
	const [enterPaletteNameDialog, setEnterPaletteNameDialog] = useState(false);
	const handleOpenEnterPaletteNameDialog = () => setEnterPaletteNameDialog(true);
	const handleCloseEnterPaletteNameDialog = () => setEnterPaletteNameDialog(false);
	const handleLetsSelectEmojiForPalette = () => {
		if (newPaletteName.length > 0) {
			if (palettes.find((p) => p.paletteName === newPaletteName) === undefined) {
				dispatch(setName(newPaletteName));
				handleOpenSelectEmojiDialog(); // Open Select Palette Emoji Dialog
				handleCloseEnterPaletteNameDialog(); // Close the Enter Palette Name Dialog
			} else {
				toast.error("Name is not unique!", {
					position: toast.POSITION.BOTTOM_LEFT,
					autoClose: 3000,
				});
			}
		} else {
			toast.error("Enter a valid name", {
				position: toast.POSITION.BOTTOM_LEFT,
				autoClose: 3000,
			});
		}
	};
	const [selectEmojiDialog, setSelectEmojiDialog] = useState(false);
	const handleOpenSelectEmojiDialog = () => setSelectEmojiDialog(true);
	const handleCloseSelectEmojiDialog = () => setSelectEmojiDialog(false);
	const handleSelectEmoji = (emoji) => {
		let newPaletteCopy = { ...newPalette };
		newPaletteCopy.emoji = emoji.native;
		newPaletteCopy.id = newPaletteName.replace(/(\s+)/g, "-").toLocaleLowerCase();
		dispatch(addPalette(newPaletteCopy));
		dispatch(clear());
		navigate("/");
		toast.success("Palette Successfully Added!", {
			position: toast.POSITION.BOTTOM_LEFT,
			autoClose: 3000,
		});
	};

	return (
		<header>
			<div className="left">
				<IconButton onClick={handleToggleSidebar} style={{ fontSize: "24px" }}>
					{sidebar === false ? (
						<AddCircleIcon fontSize="inherit" />
					) : (
						<AddCircleIcon fontSize="inherit" style={{ transform: "rotate(45deg)" }} />
					)}
				</IconButton>
				<h2 className="title">Create a Palette</h2>
			</div>
			<div className="buttons">
				<button className="back" onClick={() => navigate(-1)}>
					Go Back
				</button>
				<button
					className="save"
					onClick={handleOpenEnterPaletteNameDialog}
					disabled={newPalette.colors.length < 1 ? true : false}
				>
					Save Palette
				</button>
			</div>

			<Dialog
				open={enterPaletteNameDialog}
				onClose={handleCloseEnterPaletteNameDialog}
				style={{ fontSize: "16px" }}
			>
				<DialogTitle fontSize="inherit">Enter name of palette</DialogTitle>
				<DialogContent fontSize="inherit">
					<TextField
						autoFocus
						margin="dense"
						label="Palette name"
						type="text"
						fullWidth
						variant="standard"
						value={newPaletteName}
						onChange={(e) => setNewPaletteName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions fontSize="inherit">
					<Button onClick={handleCloseEnterPaletteNameDialog}>Cancel</Button>
					<Button
						onClick={handleLetsSelectEmojiForPalette}
						disabled={newPaletteName.length > 0 ? false : true}
					>
						Next
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={selectEmojiDialog} onClose={handleCloseSelectEmojiDialog}>
				<EmojiPicker onSelect={handleSelectEmoji} />
			</Dialog>
		</header>
	);
};

export default Header;
