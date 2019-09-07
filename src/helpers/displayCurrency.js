export default sats => {
  let stringSats = `${sats}`;
  if (sats > 1000) {
    stringSats = `${stringSats.slice(0, -3)}k`;
  }

  //Format numbers with spaces for thousdand separators
  const numberString = stringSats.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return `${numberString} sat${numberString === "1" ? "" : "s"}`;
};
