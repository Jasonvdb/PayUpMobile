export default value => {
	const sats = Math.round(value * 100000000).toString();

	const numberString = `${sats.slice(0, -3)}`.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		" ",
	);

	return `${numberString}k sats`;
};
