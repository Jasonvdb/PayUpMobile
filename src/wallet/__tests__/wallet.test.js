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
});

//TODO Maybe get a testnet xpub with a large transaction history and load that to test this. Then it can be committed.
describe("mainnet transactions with locally stored words", () => {
	let wallet;

	beforeAll(async () => {
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
	});

	afterAll(() => {
		wallet = null;
	});

	it("check known transactions", async () => {
		let receiveTransactionsCount = 0;
		let sentTransactionsCount = 0;

		wallet.neatTransactionHistory.forEach(
			({ receivedValueInSats, sentValueInSats, timeMoment }) => {
				if (receivedValueInSats) {
					receiveTransactionsCount++;
				}

				if (sentValueInSats) {
					sentTransactionsCount++;
				}
			}
		);

		expect(receiveTransactionsCount).toBe(1);
		expect(sentTransactionsCount).toBe(2);
	}, 600000);

	it("check total wallet balance", async () => {
		const { balances } = wallet;

		// expect(balances).toMatchObject({
		// 	confirmedInSats: 1,
		// 	unconfirmedInSats: 2,
		// 	lastReceivedMoment: "TODO"
		// });
	});
});
