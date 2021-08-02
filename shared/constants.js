export const getLogoStyle = ({ theme }) => {
	if (theme === 'light') {
		return {
			fill: '#fff',
			shazamLogoCircleFill: '#fff',
			shazamLogoCircleOpacity: 0.3,
			shazamLogoSFill: '#fff',
		};
	}

	return {
		fill: '#242424',
		shazamLogoCircleFill: '#000',
		shazamLogoCircleOpacity: 1,
		shazamLogoSFill: '#000',
	};
};

export const genreColors = [
	'#1abc9c',
	'#3498db',
	'#e74c3c',
	'#f1c40f',
	'#8e44ad',
	'#2c3e50',
	'#d35400',
	'#7f8c8d',
	'#273c75',
	'#2ecc71',
	'#8c7ae6',
	'#F64740',
	'#f05365',
	'#007f5f',
	'#b100e8',
];
