export default value => {
	const sats = parseInt((value * 100000000).toFixed(0));

	const numberString = `${sats}`
		.slice(0, -3)
		.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	return `${numberString}k sats`;
};
