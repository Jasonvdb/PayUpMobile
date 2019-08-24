import {
	formattedTransactionsFromAddresses,
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

  rawTransactions = {};

  neatTransactionHistory = [];

  addressBalances = {};

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

  	this.mnemonic = mnemonic.trim();
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
  	if (this.busyUpdatingAddressTxData) {
  		return;
  	}

  	if (this.addressUpdateQueue.length === 0) {
  		this.busyUpdatingAddressTxData = false;
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

  	rawTransactions.forEach(tx => {
  		const { txid } = tx;
  		this.rawTransactions[txid] = { ...tx, refreshedAt: new Date() };
  	});
  }

  //Used to poll when the user is waiting for funds
  async updateAddressBalance(address) {
  	const {
  		confirmedValueInSats,
  		unconfirmedValueInSats
  	} = await getAddressBalance(this.apiBaseUrl, address);

  	//If there's a confirmed balance, update the rest of the wallet
  	if (confirmedValueInSats > 0) {
  		await this.updateAddressTransactions(address);
  		this.updateTransactionHistory();
  	}

  	//TODO call updateAddressTransactions and then updateTransactionHistory

  	this.addressBalances[address] = {
  		confirmedValueInSats,
  		unconfirmedValueInSats,
  		updatedAt: new Date()
  	};
  }

  updateTransactionHistory() {
  	this.neatTransactionHistory = formattedTransactionsFromAddresses(
  		this.rawTransactions,
  		this.receiveAddresses,
  		this.changeAddresses
  	);
  }
}
