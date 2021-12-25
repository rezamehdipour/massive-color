import chroma from "chroma-js";

function calcPercentage(number) {
	return Math.round((number / 1) * 100);
}

export function getRandomColorHex() {
	const randomColorHex = chroma.random().hex();
	return randomColorHex;
}

export function getHex(color) {
	const hex = chroma(color).hex();
	return hex;
}

export function getRgb(color) {
	let rgbArray = chroma(color).rgb();
	let rgbString = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
	return rgbString;
}
export function getHsl(color) {
	const hslArray = chroma(color).hsl();
	const hue = isNaN(hslArray[0]) ? 0 : Math.round(hslArray[0]);
	const saturation = calcPercentage(hslArray[1]);
	const lightness = calcPercentage(hslArray[2]);
	const hslString = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	return hslString;
}

export function getScale(color = "#ffa500") {
	const lightenColor = chroma(color).brighten(2);
	const darkenColor = chroma(color).darken(2);
	let scale = chroma.scale([lightenColor, darkenColor]).mode("lab").colors(9);
	scale[4] = color;
	return scale;
}

export function getLuminance(color) {
	return chroma(color).luminance();
}
