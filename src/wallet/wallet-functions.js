import { NativeModules } from "react-native";
import moment from "moment";

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

const doesOwnAddress = (checkAddress, receiveAddresses, changeAddresses) => {
  if (receiveAddresses.indexOf(checkAddress) > -1) {
    return "receive";
  }

  if (changeAddresses.indexOf(checkAddress) > -1) {
    return "change";
  }

  return false;
};

export const formattedTransactionsFromAddresses = (
  rawTransactions,
  receiveAddresses,
  changeAddresses
) => {
  const unfilteredResults = [];

  Object.keys(rawTransactions).forEach(txid => {
    const { vin, vout, fee, status } = rawTransactions[txid];

    //Received
    if (Array.isArray(vout)) {
      vout.forEach(output => {
        const { scriptpubkey_address, value } = output;

        const ownAddressType = doesOwnAddress(
          scriptpubkey_address,
          receiveAddresses,
          changeAddresses
        );

        if (ownAddressType === "receive") {
          unfilteredResults.push({
            txid,
            outputAddress: scriptpubkey_address,
            timeMoment: status.block_time
              ? moment(status.block_time * 1000, "x")
              : null,
            receivedValueInSats: value ? value : 0,
            feeInSats: fee,
            confirmed: status.confirmed
          });
        } else if (!ownAddressType) {
          //Not owned address, must be sent
          unfilteredResults.push({
            txid,
            outputAddress: scriptpubkey_address,
            timeMoment: status.block_time
              ? moment(status.block_time * 1000, "x")
              : null,
            sentValueInSats: value ? value : 0,
            feeInSats: fee,
            confirmed: status.confirmed
          });
        }
      });
    }
  });

  //Remove sent transactions when there is a receive one for same txid. The removed sent txs will be from another wallet.
  const filteredResults = [];
  unfilteredResults.forEach(formattedTransaction => {
    const { txid, sentValueInSats } = formattedTransaction;
    let shouldInclude = true;
    if (sentValueInSats) {
      const existingReceiveForTx = unfilteredResults.find(
        ({ txid: receiveTxid, receivedValueInSats }) =>
          receivedValueInSats && receiveTxid === txid
      );

      if (existingReceiveForTx) {
        shouldInclude = false;
      }
    }

    if (shouldInclude) {
      filteredResults.push(formattedTransaction);
    }
  });

  //Sort by time
  filteredResults.sort((a, b) => {
    if (!a.timeMoment || a.timeMoment.isAfter(b.timeMoment)) {
      return -1;
    }
    if (a.timeMoment.isBefore(b.timeMoment)) {
      return 1;
    }
    return 0;
  });

  return filteredResults;
};

export const createTransactionHex = (
  utxos,
  toAddress,
  amount,
  fixedFee,
  changeAddress
) => {
  const feeInSatoshis = parseInt((fixedFee * 100000000).toFixed(0));
  const amountToOutputSatoshi = parseInt(
    ((amount - fixedFee) * 100000000).toFixed(0)
  ); // how much payee should get
  const txb = new bitcoin.TransactionBuilder();
  let unspentAmountSatoshi = 0;
  const ourOutputs = {};
  let outputNum = 0;
  for (const unspent of utxos) {
    if (unspent.confirmations < 1) {
      // using only confirmed outputs
      continue;
    }
    txb.addInput(unspent.txid, unspent.vout);
    ourOutputs[outputNum] = ourOutputs[outputNum] || {};
    const keyPair = bitcoin.ECPair.fromWIF(unspent.wif);
    const pubKey = keyPair.getPublicKeyBuffer();
    const pubKeyHash = bitcoin.crypto.hash160(pubKey);
    const redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(
      pubKeyHash
    );
    ourOutputs[outputNum].keyPair = keyPair;
    ourOutputs[outputNum].redeemScript = redeemScript;
    ourOutputs[outputNum].amount = unspent.amount;
    unspentAmountSatoshi += unspent.amount;
    if (unspentAmountSatoshi >= amountToOutputSatoshi + feeInSatoshis) {
      // found enough inputs to satisfy payee and pay fees
      break;
    }
    outputNum++;
  }

  if (unspentAmountSatoshi < amountToOutputSatoshi + feeInSatoshis) {
    throw new Error(
      "Not enough balance. Please, try sending a smaller amount."
    );
  }

  // adding outputs

  txb.addOutput(toAddress, amountToOutputSatoshi);
  if (amountToOutputSatoshi + feeInSatoshis < unspentAmountSatoshi) {
    // sending less than we have, so the rest should go back
    if (
      unspentAmountSatoshi - amountToOutputSatoshi - feeInSatoshis >
      3 * feeInSatoshis
    ) {
      // to prevent @dust error change transferred amount should be at least 3xfee.
      // if not - we just dont send change and it wil add to fee
      txb.addOutput(
        changeAddress,
        unspentAmountSatoshi - amountToOutputSatoshi - feeInSatoshis
      );
    }
  }

  // now, signing every input with a corresponding key

  for (let c = 0; c <= outputNum; c++) {
    txb.sign(
      c,
      ourOutputs[c].keyPair,
      ourOutputs[c].redeemScript,
      null,
      ourOutputs[c].amount
    );
  }

  const tx = txb.build();
  return tx.toHex();
};
