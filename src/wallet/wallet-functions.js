import { NativeModules } from "react-native";
import moment from "moment";

const { RNRandomBytes } = NativeModules;

const bitcoin = require("bitcoinjs-lib");
const bip39 = require("bip39");
const bip32 = require("bip32");
const crypto = require("crypto");
const BigNumber = require("bignumber.js");

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

//https://learnmeabitcoin.com/glossary/wif
export const getWifFromIndex = (mnemonic, network, index, type) => {
  let derive;
  if (type == "receive") {
    derive = 0;
  } else if (type === "change") {
    derive = 1;
  } else {
    throw new Error("Invalid type. Must be 'receive' or 'change'");
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const node = bip32.fromSeed(seed);

  const child = node.derive(derive);
  const derivedChild = child.derive(index);
  return derivedChild.toWIF();
};

export const childNodeToP2shSegwitAddress = (hdNode, network) => {
  const redeem = bitcoin.payments.p2wpkh({ pubkey: hdNode.publicKey, network });

  const res = bitcoin.payments.p2sh({
    redeem,
    network
  });

  console.log(JSON.stringify(redeem));

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

//TODO test this
export const doesOwnAddress = (
  checkAddress,
  receiveAddresses,
  changeAddresses
) => {
  const receiveIndex = receiveAddresses.indexOf(checkAddress);
  if (receiveIndex > -1) {
    return { type: "receive", index: receiveIndex };
  }

  const changeIndex = changeAddresses.indexOf(checkAddress);
  if (changeIndex > -1) {
    return { type: "change", index: changeIndex };
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

        const ownAddressDetails = doesOwnAddress(
          scriptpubkey_address,
          receiveAddresses,
          changeAddresses
        );

        if (ownAddressDetails && ownAddressDetails.type === "receive") {
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
        } else if (!ownAddressDetails) {
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

//TODO shouldn't need this
// export const ownedUtxos = (
//   rawTransactions,
//   receiveAddresses,
//   changeAddresses
// ) => {
//   const ownedUtxos = [];
//
//   Object.keys(rawTransactions).forEach(txid => {
//     const { vin, vout, fee, status } = rawTransactions[txid];
//
//     //Received
//     if (Array.isArray(vout)) {
//       vout.forEach(output => {
//         const { scriptpubkey_address } = output;
//
//         const ownAddressDetails = doesOwnAddress(
//           scriptpubkey_address,
//           receiveAddresses,
//           changeAddresses
//         );
//
//         if (ownAddressDetails) {
//           ownedUtxos.push({
//             ...output,
//             addressType: ownAddressDetails.type
//           });
//         } else {
//           //TODO check this hasn't been spent either, else we think we have more than we do
//         }
//       });
//     }
//   });
//
//   return ownedUtxos;
// };

const getWitnessUtxo = out => {
  delete out.address;
  out.script = Buffer.from(out.script, "hex");
  return out;
};

export const createTransactionHex = (utxos, toAddress, network) => {
  let availableToSpendInSats = 0;

  for (const utxo of utxos) {
    availableToSpendInSats += utxo.value;
  }

  //TODO check we have enough to spend here

  const psbtTx = new bitcoin.Psbt();

  const inputs = [];
  for (const utxo of utxos) {
    const res = {
      address: "3DouMyivEwqPHMtUpeAB7wD8Z68YzxEeYJ",
      hash: {
        type: "Buffer",
        data: [
          132,
          238,
          241,
          163,
          158,
          51,
          84,
          188,
          71,
          33,
          214,
          168,
          62,
          143,
          75,
          95,
          250,
          45,
          82,
          246
        ]
      },
      output: {
        type: "Buffer",
        data: [
          169,
          20,
          132,
          238,
          241,
          163,
          158,
          51,
          84,
          188,
          71,
          33,
          214,
          168,
          62,
          143,
          75,
          95,
          250,
          45,
          82,
          246,
          135
        ]
      },
      redeem: {
        name: "p2wpkh",
        address: "bc1qsf9jdlgud4sljxkg7gznsujz7fhk2enc620wzp",
        hash: {
          type: "Buffer",
          data: [
            130,
            75,
            38,
            253,
            28,
            109,
            97,
            249,
            26,
            200,
            242,
            5,
            56,
            114,
            66,
            242,
            111,
            101,
            102,
            120
          ]
        },
        output: {
          type: "Buffer",
          data: [
            0,
            20,
            130,
            75,
            38,
            253,
            28,
            109,
            97,
            249,
            26,
            200,
            242,
            5,
            56,
            114,
            66,
            242,
            111,
            101,
            102,
            120
          ]
        },
        pubkey: {
          type: "Buffer",
          data: [
            3,
            44,
            246,
            4,
            31,
            114,
            153,
            233,
            18,
            236,
            17,
            68,
            171,
            77,
            46,
            219,
            210,
            167,
            111,
            177,
            79,
            144,
            93,
            16,
            35,
            114,
            103,
            188,
            102,
            189,
            89,
            4,
            255
          ]
        }
      },
      name: "p2sh-p2wpkh"
    };

    const redeem = {
      name: "p2wpkh",
      address: "bc1q2atxplakxp0ur5mtspunptw2axfsupara3a2az",
      hash: {
        type: "Buffer",
        data: [
          87,
          86,
          96,
          255,
          182,
          48,
          95,
          193,
          211,
          107,
          128,
          121,
          48,
          173,
          202,
          233,
          147,
          14,
          7,
          163
        ]
      },
      output: {
        type: "Buffer",
        data: [
          0,
          20,
          87,
          86,
          96,
          255,
          182,
          48,
          95,
          193,
          211,
          107,
          128,
          121,
          48,
          173,
          202,
          233,
          147,
          14,
          7,
          163
        ]
      },
      pubkey: {
        type: "Buffer",
        data: [
          2,
          30,
          112,
          233,
          154,
          104,
          232,
          193,
          70,
          83,
          33,
          189,
          17,
          152,
          189,
          170,
          192,
          97,
          159,
          81,
          239,
          66,
          222,
          22,
          160,
          253,
          50,
          205,
          77,
          7,
          240,
          246,
          3
        ]
      }
    };

    console.log(Object.keys(utxo));

    const input = {
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        script: Buffer.from(utxo.address, "hex"), //TODO not sure this is correct
        value: utxo.value //TODO
      }, //TODO find this
      //payment.redeem.output; //TODO find this in the childNodeToP2shSegwitAddress (redeem var)
      redeemScript: Buffer.from([
        0,
        20,
        87,
        86,
        96,
        255,
        182,
        48,
        95,
        193,
        211,
        107,
        128,
        121,
        48,
        173,
        202,
        233,
        147,
        14,
        7,
        163
      ])
    };

    inputs.push(input);
    // const input = utxo;
    //
  }

  psbtTx.addInputs(inputs);

  psbtTx.addOutput({
    address: toAddress,
    value: availableToSpendInSats //TODO allow custom
  });

  // .signAllInputs(keyPair)
  // .finalizeAllInputs()
  // .extractTransaction();
  //

  return psbtTx.finalizeAllInputs().extractTransaction();
};
