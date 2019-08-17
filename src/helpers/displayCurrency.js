export default value => {
	const sats = (value * 100000000).toString();

	// str = str.slice(0, -3);
	// str = parseInt(str);
	// console.log(sats);
	//TODO
	return `${sats.slice(0, -3)}k sats`;
};
