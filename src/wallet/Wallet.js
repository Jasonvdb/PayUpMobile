import axios from "axios";

import {
	generateMnemonic,
	getAddressFromXpub,
	getXpubFromMnemonic
} from "./wallet-functions";
import { getAddressBalance, getAddressTransactions } from "./blockexplorer";

const bitcoin = require("bitcoinjs-lib");

const networks = {
	mainnet: {
		network: bitcoin.networks.bitcoin,
		apiBaseUrl: "https://blockstream.info/api/"
	},
	testnet: {
		network: bitcoin.networks.testnet,
		apiBaseUrl: "https://blockstream.info/testnet/api/"
	}
};

/**
 * HD Wallet (BIP39).
 * BIP49 (P2SH Segwit)
 * @see https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki
 */
export default class Wallet {
  network = null;

  mnemonic = null;

  xpub = null;

  receiveAddresses = [];

  changeAddresses = [];

  apiBaseUrl = null;

  addressUpdateQueue = [];

  addressRawTransactions = {};

  transactionHistory = [];

  constructor(networkName) {
  	if (!networkName || !networks[networkName]) {
  		throw new Error(
  			`Please specify a valid network (${Object.keys(networks).join(", ")})`
  		);
  	}
  	const { network, apiBaseUrl } = networks[networkName];
  	this.network = network;
  	this.apiBaseUrl = apiBaseUrl;
  }

  async createNewWallet() {
  	const mnemonic = await generateMnemonic();
  	this._init(mnemonic);
  }

  importExistingWallet(mnemonic) {
  	this._init(mnemonic);
  }

  _init(mnemonic) {
  	if (this.mnemonic) {
  		throw new Error("Existing wallet already loaded.");
  	}

  	this.mnemonic = mnemonic;
  	this.xpub = getXpubFromMnemonic(this.mnemonic, this.network);
  	this.appendDerivedAddresses(20);
  }

  appendDerivedAddresses(numberOfAddresses) {
  	if (!this.xpub) {
  		throw new Error("No wallet loaded.");
  	}

  	const startIndex = this.receiveAddresses.length;
  	const endIndex = startIndex + numberOfAddresses;

  	for (let index = startIndex; index < endIndex; index++) {
  		this.receiveAddresses.push(
  			getAddressFromXpub(this.xpub, index, this.network, "receive")
  		);

  		this.changeAddresses.push(
  			getAddressFromXpub(this.xpub, index, this.network, "change")
  		);
  	}
  }

  queueAddressForUpdate(address) {
  	this.addressUpdateQueue.push(address);
  	this.processAddressTransactionsFromQueue();
  }

  processAddressTransactionsFromQueue() {
  	//Busy processing already OR nothing to process
  	if (
  		this.busyUpdatingAddressTxData ||
      this.addressUpdateQueue.length === 0
  	) {
  		return;
  	}

  	const address = this.addressUpdateQueue[0];

  	this.busyUpdatingAddressTxData = true;
  	this.updateAddressTransactions(address)
  		.then(() => {
  			this.addressUpdateQueue.shift();
  		})
  		.catch(e => {
  			throw e;
  		})
  		.then(() => {
  			this.busyUpdatingAddressTxData = false;
  			this.processAddressTransactionsFromQueue();
  		});
  }

  async updateAddressTransactions(address) {
  	const rawTransactions = await getAddressTransactions(
  		this.apiBaseUrl,
  		address
  	);

  	this.addressRawTransactions[address] = {
  		rawTransactions,
  		updatedAt: new Date()
  	};
  }

  // async updateAddressBalance(address) {
  // 	const {
  // 		confirmedValueInSats,
  // 		unconfirmedValueInSats
  // 	} = await getAddressBalance(this.apiBaseUrl, address);
  //
  // 	this.addressBalances[address] = {
  // 		confirmedValueInSats,
  // 		unconfirmedValueInSats,
  // 		updatedAt: new Date()
  // 	};
  // }

  updateTransactionHistory() {
  	const formattedTransactions = [];

  	this.receiveAddresses.forEach(address => {
  		const addressData = this.addressRawTransactions[address];

  		//Have data, can get tx history
  		if (addressData && Array.isArray(addressData.rawTransactions)) {
  			addressData.rawTransactions.forEach(tx => {
  				const { txid, vin, vout, fee, status, ...rest } = tx;

  				if (Array.isArray(vout)) {
  					vout.forEach(output => {
  						const { scriptpubkey_address, value } = output;
  						if (scriptpubkey_address === address && !isNaN(value)) {
  							formattedTransactions.push({
  								txid,
  								timestamp_utc: status.block_time,
  								received_value_in_sats: output.value,
  								fee_in_sats: fee
  							});
  						}
  					});
  				}
  			});
  		} else {
  			//No Data, add to processing queue TODO
  			this.queueAddressForUpdate(address);
  		}
  	});

  	formattedTransactions.sort((a, b) => {
  		if (a.timestamp_utc > b.timestamp_utc) {
  			return -1;
  		}
  		if (a.timestamp_utc < b.timestamp_utc) {
  			return 1;
  		}
  		return 0;
  	});

  	//TODO get sent TX

  	//TODO check receive addresses
  	this.transactionHistory = formattedTransactions;
  }
}
