import axios from "axios";

export const getAddressBalance = async (baseUrl, address) => {
	const { data } = await axios.get(`${baseUrl}address/${address}`);

	const { chain_stats, mempool_stats } = data;

	const { funded_txo_sum: confirmedValueInSats } = chain_stats;
	const { funded_txo_sum: unconfirmedValueInSats } = mempool_stats;

	return { confirmedValueInSats, unconfirmedValueInSats };
};

export const getAddressTransactions = async (baseUrl, address) => {
	const { data } = await axios.get(`${baseUrl}address/${address}/txs`);

	return data;
};
