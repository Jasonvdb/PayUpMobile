import Wallet from "../Wallet";

const fs = require("fs");

const networkName = "testnet";

describe("initializing wallet", () => {
	it("load in an existing mnemonic phrase (BIP39)", () => {
		const mnemonic =
      "arena coin myth kangaroo age obey scrap fog exercise space logic rib uphold become ahead mixed power shed state raccoon wreck weird blame ability";

		const wallet = new Wallet(networkName);
		wallet.importExistingWallet(mnemonic);

		//Should have loaded in first 20 addresses
		expect(wallet.receiveAddresses.length).toBe(20);
		expect(wallet.changeAddresses.length).toBe(20);
	});

	it("generate a new wallet", async () => {
		const wallet = new Wallet(networkName);
		await wallet.createNewWallet();

		expect(wallet.receiveAddresses.length).toBe(20);
		expect(wallet.changeAddresses.length).toBe(20);
	});

	it("fail to make a new wallet without network passed", async () => {
		const words = "";

		expect(() => {
			const wallet = new Wallet();
		}).toThrowError();
	});

	it("fail to derive addresses without initializing the wallet first", async () => {
		const wallet = new Wallet(networkName);

		expect(() => {
			wallet.appendDerivedAddresses(20);
		}).toThrowError();
	});

	it("fail to import a wallet after one has been initialized", async () => {
		const wallet = new Wallet(networkName);
		await wallet.createNewWallet();

		expect(() => {
			wallet.importExistingWallet("should broken");
		}).toThrowError();
	});
});

describe("testnet transactions", () => {
	let wallet;

	beforeEach(async () => {
		const words = [];
		for (let index = 0; index < 24; index++) {
			words.push("appsats");
		}

		const mnemonic = words.join(" ");

		//Test only works on testnet
		wallet = new Wallet("testnet");
		await wallet.importExistingWallet(mnemonic);
	});

	afterEach(() => {
		wallet = null;
	});

	it("check first address balance", async () => {
		const firstReceive0 = wallet.receiveAddresses[0];
		await wallet.updateAddressBalance(firstReceive0);
		const {
			confirmedValueInSats,
			unconfirmedValueInSats
		} = wallet.addressBalances[firstReceive0];

		expect(confirmedValueInSats).not.toBeNaN();
		expect(unconfirmedValueInSats).not.toBeNaN();
	});

	it("check first address transactions", async () => {
		const firstReceive0 = wallet.receiveAddresses[0];
		await wallet.updateAddressTransactions(firstReceive0);
		wallet.updateTransactionHistory();

		const transactions = wallet.neatTransactionHistory;

		//Know there's been at least one tx on testnet for this
		expect(transactions.length).toBeGreaterThan(1);

		//TODO check what txs we have
	});

	it("check total wallet balance", async () => {
		//TODO
	});
});

//TODO once these words are scrapped, keep them in the code to test transaction history with
describe("mainnet transactions with locally stored words", () => {
	let wallet;

	beforeEach(async () => {
		const filePath = "./test-words";
		const mnemonic = fs.readFileSync(filePath, {
			encoding: "utf-8",
			flag: "r"
		});

		if (!mnemonic) {
			throw new Error(`Missing words (${filePath})`);
		}

		//Test only works on testnet
		wallet = new Wallet("mainnet");
		await wallet.importExistingWallet(mnemonic);
	});

	afterEach(() => {
		wallet = null;
	});

	it("check known transactions", async () => {
		const numberOfReceiveAddressesToCheck = 5; //wallet.receiveAddresses.length
		const numberOfChangeAddressesToCheck = 5; //wallet.changeAddresses.length;

		for (let index = 0; index < numberOfReceiveAddressesToCheck; index++) {
			const address = wallet.receiveAddresses[index];
			await wallet.updateAddressTransactions(address);
		}

		for (let index = 0; index < numberOfChangeAddressesToCheck; index++) {
			const address = wallet.changeAddresses[index];
			await wallet.updateAddressTransactions(address);
		}

		wallet.updateTransactionHistory();
		//
		const transactions = wallet.neatTransactionHistory;

		let receiveTransactions = 0;
		let sentTransactions = 0;

		transactions.forEach(({ receivedValueInSats, sentValueInSats }) => {
			if (receivedValueInSats) {
				receiveTransactions++;
			}

			if (sentValueInSats) {
				sentTransactions++;
			}
		});

		expect(receiveTransactions).toBe(1);
		expect(sentTransactions).toBe(2);
	}, 600000);
});
