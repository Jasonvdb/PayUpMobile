/**
 * @format
 */

const bitcoin = require("bitcoinjs-lib");

import {
	generateMnemonic,
	getAddressFromXpub,
	getXpubFromMnemonic,
	validateMnemonic,
	getXprivFromMnemonic
} from "../wallet-functions";

const litecoinNetwork = {
	wif: 0xb0,
	bip32: {
		public: 0x019da462,
		private: 0x019d9cfe
	}
};

const testDataByNetwork = {
	mainnet: {
		network: bitcoin.networks.bitcoin,
		mnemonic:
      "arena coin myth kangaroo age obey scrap fog exercise space logic rib uphold become ahead mixed power shed state raccoon wreck weird blame ability",
		xpub:
      "xpub6C9uKvZe2TPbGW828AF9fNcCyiR6kjUFUQ7HW5rQXsZ4x7XFHXVXYe1VYMY5f83npyni17vWpm9T4wDhaP54gFMLxfXGc5HkK77SuB6FT5M",
		xpriv:
      "xprv9s21ZrQH143K2bR4wPJkRQQ9cnJuUF2VXXLgngzv2c19XdK1r54n2t9csGb4Y2Uc3KMyAmY3tk96148y5nRBV97XxaYHCAS7XqP3bA4gM5t",
		receiveAddresses: [
			"3LessnBS6BoYKLsCQv9vJyNBEiEJVQ6eQZ",
			"3KbFmdPCgwpZqGTgWyeoA6A1JkFaRYnp9x"
		],
		changeAddresses: [
			"3MYnbKB16fbBEm7JA64Qd7fgzG29b4L3C7",
			"32gYJb5FcgMzubsskCJzTzjdaca58Bi6x1"
		]
	},
	testnet: {
		network: bitcoin.networks.testnet,
		mnemonic:
      "arena coin myth kangaroo age obey scrap fog exercise space logic rib uphold become ahead mixed power shed state raccoon wreck weird blame ability",
		xpub:
      "tpubDCXXrAPKjjM3YJJsaMEEsHwaJqWkk7yK22harduYsnJxhQBxMkLch5gKnPcsBd12ctKcchSPMryVm7iJyEvJZgoe2GGaHbwyu4hrfG5jBR6",
		xpriv:
      "xprv9s21ZrQH143K2bR4wPJkRQQ9cnJuUF2VXXLgngzv2c19XdK1r54n2t9csGb4Y2Uc3KMyAmY3tk96148y5nRBV97XxaYHCAS7XqP3bA4gM5t",
		receiveAddresses: [
			"2NCD5wX7TheJtX8Vk63mnvvMST4SUFhtFXP",
			"2NB9TqNKEJQKv346EC7Gfn39GX6TkBs6rsj"
		],
		changeAddresses: [
			"2ND6zf472i86XSYjqqDgHF4exCcEKNS4kat",
			"2MtEkNL1HE8sM7PWRRKvs5witnxnExi2RTM"
		]
	}
};

//Test all available networks
Object.keys(testDataByNetwork).forEach(networkKey => {
	const testData = testDataByNetwork[networkKey];

	describe(`[${networkKey}] mnemonic usage`, () => {
		it("can validate a mnemonic phrase (BIP39)", () => {
			const { mnemonic } = testData;

			expect(validateMnemonic(mnemonic)).toBeTruthy();
		});

		it("can generate a random valid mnemonic (BIP39)", async () => {
			const words = await generateMnemonic();

			expect(typeof words).toStrictEqual("string");
			expect(words.split(" ").length).toStrictEqual(24);
			expect(validateMnemonic(words)).toBeTruthy();
		});

		it("can get xpub from mnemonic (BIP39 & BIP32)", () => {
			const { mnemonic, network, xpub: expectedXpub } = testData;

			const xpub = getXpubFromMnemonic(mnemonic, network);

			expect(xpub).toStrictEqual(expectedXpub);
		});

		it("can get xpriv from mnemonic (BIP39 & BIP32)", () => {
			const { mnemonic, xpriv: expectedXpriv } = testData;

			const xpriv = getXprivFromMnemonic(mnemonic);

			expect(xpriv).toStrictEqual(expectedXpriv);
		});
	});

	describe(`[${networkKey}] derive addresses`, () => {
		const {
			xpub,
			network,
			receiveAddresses: expectedReceiveAddresses,
			changeAddresses: expectedChangeAddresses
		} = testData;

		it("can derive receive addresses from xpub", () => {
			const receive0a = getAddressFromXpub(xpub, 0, network); //Receive
			const receive0b = getAddressFromXpub(xpub, 0, network, "receive");
			const receive1 = getAddressFromXpub(xpub, 1, network, "receive");

			expect(receive0a).toStrictEqual(expectedReceiveAddresses[0]);
			expect(receive0a).toStrictEqual(receive0b);
			expect(receive1).toStrictEqual(expectedReceiveAddresses[1]);
		});

		it("can derive change addresses from xpub", () => {
			const change0 = getAddressFromXpub(xpub, 0, network, "change");
			const change1 = getAddressFromXpub(xpub, 1, network, "change");

			expect(change0).toStrictEqual(expectedChangeAddresses[0]);
			expect(change1).toStrictEqual(expectedChangeAddresses[1]);
		});

		it("throws error if passed invalid address type", () => {
			expect(() =>
				getAddressFromXpub(xpub, 0, network, "made-up-type")
			).toThrowError();
		});
	});
});
