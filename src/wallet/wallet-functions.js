import { NativeModules } from "react-native";

const { RNRandomBytes } = NativeModules;

const bitcoin = require("bitcoinjs-lib");
const bip39 = require("bip39");
const bip32 = require("bip32");
const crypto = require("crypto");

const DERIVATION_PATH = "m/49'/0'/0'";

const getRandomBytesBuffer = async () => {
	return await new Promise((resolve, reject) => {
		// CLI/CI environment
		if (typeof RNRandomBytes === "undefined") {
			crypto.randomBytes(32, (err, buff) => {
				if (err) reject(err);
				resolve(buff);
			});
		} else {
			// RN environment
			RNRandomBytes.randomBytes(32, (err, bytes) => {
				if (err) reject(new Error(err));
				resolve(Buffer.from(bytes, "base64"));
			});
		}
	});
};

export const generateMnemonic = async () => {
	const randomBytesBuffer = await getRandomBytesBuffer();
	const words = bip39.entropyToMnemonic(randomBytesBuffer.toString("hex"));

	return words;
};

export const validateMnemonic = words => {
	return bip39.validateMnemonic(words);
};

export const getXpubFromMnemonic = (mnemonic, network) => {
	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const root = bip32.fromSeed(seed, network);

	const child = root.derivePath(DERIVATION_PATH).neutered();
	const xpub = child.toBase58();

	return xpub;
};

export const getXprivFromMnemonic = (mnemonic, network) => {
	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const node = bip32.fromSeed(seed, network);
	const string = node.toBase58();

	return string;
};

export const childNodeToP2shSegwitAddress = (hdNode, network) => {
	const res = bitcoin.payments.p2sh({
		redeem: bitcoin.payments.p2wpkh({ pubkey: hdNode.publicKey, network }),
		network
	});

	return res.address;
};

export const getAddressFromXpub = (xpub, index, network, type = "receive") => {
	let derive;
	if (type == "receive") {
		derive = 0;
	} else if (type === "change") {
		derive = 1;
	} else {
		throw new Error("Invalid type. Must be 'receive' or 'change'");
	}

	const hdNode = bip32.fromBase58(xpub, network);
	const child = hdNode.derive(derive);
	return childNodeToP2shSegwitAddress(child.derive(index), network);
};
