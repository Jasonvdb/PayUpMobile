import moment from "moment";
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

  unusedReceiveAddressIndex = 0;

  changeAddresses = [];

  apiBaseUrl = null;

  addressUpdateQueue = [];

  rawTransactions = {};

  neatTransactionHistory = [];

  addressBalances = {};

  busyUpdatingAddressTxData = false;

  addressUpdatesInQueue = false;

  constructor() {}

  async createNewWallet(networkName) {
    this.setNetworkDetails(networkName);

    const mnemonic = await generateMnemonic();
    this._init(mnemonic);
  }

  importExistingWallet(mnemonic, networkName) {
    this.setNetworkDetails(networkName);
    this._init(mnemonic);
  }

  setNetworkDetails(networkName) {
    if (!networkName || !networks[networkName]) {
      throw new Error(
        `Please specify a valid network (${Object.keys(networks).join(", ")})`
      );
    }
    const { network, apiBaseUrl } = networks[networkName];
    this.network = network;
    this.apiBaseUrl = apiBaseUrl;
  }

  _init(mnemonic) {
    if (this.mnemonic) {
      throw new Error("Existing wallet already loaded.");
    }

    this.mnemonic = mnemonic.trim();
    this.xpub = getXpubFromMnemonic(this.mnemonic, this.network);
    this.appendDerivedAddresses(20, "receive");
    this.appendDerivedAddresses(20, "change");
  }

  get isInitialized() {
    return !!this.xpub;
  }

  appendDerivedAddresses(numberOfAddresses, type) {
    if (!this.xpub) {
      throw new Error("No wallet loaded.");
    }

    if (type !== "receive" && type !== "change") {
      throw new Error(
        "Invalid type for appendDerivedAddresses. Must be 'receive' or 'change'"
      );
    }

    let startIndex = 0;
    if (type === "receive") {
      startIndex = this.receiveAddresses.length;
    }

    if (type === "change") {
      startIndex = this.changeAddresses.length;
    }

    const endIndex = startIndex + numberOfAddresses;

    for (let index = startIndex; index < endIndex; index++) {
      const address = getAddressFromXpub(this.xpub, index, this.network, type);

      if (type === "receive") {
        this.receiveAddresses.push(address);
      }

      if (type === "change") {
        this.changeAddresses.push(address);
      }
    }
  }

  refreshAllAddresses() {
    this.receiveAddresses.forEach(address =>
      this.queueAddressForUpdate(address)
    );

    this.changeAddresses.forEach(address =>
      this.queueAddressForUpdate(address)
    );
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
      this.addressUpdatesInQueue = false;
      return;
    }

    const address = this.addressUpdateQueue[0];

    this.addressUpdatesInQueue = true;

    this.busyUpdatingAddressTxData = true;
    this.updateAddressTransactions(address)
      .then(() => {
        this.addressUpdateQueue.shift();
        this.updateTransactionHistory();
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

      this.rawTransactions[txid] = {
        ...tx,
        updatedAtMoment: moment()
      };
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

    this.addressBalances[address] = {
      confirmedValueInSats,
      unconfirmedValueInSats,
      updatedAtMoment: moment()
    };
  }

  get balances() {
    let lastReceivedMoment = null;

    let totalConfirmedReceivedInSats = 0;
    let totalUnconfirmedReceivedInSats = 0;

    let totalConfirmedSentInSats = 0;
    let totalUnconfirmedSentInSats = 0;

    let test = 0;
    this.neatTransactionHistory.forEach(tx => {
      const {
        receivedValueInSats,
        sentValueInSats,
        timeMoment,
        feeInSats,
        confirmed
      } = tx;

      if (receivedValueInSats) {
        test += receivedValueInSats;
      } else {
        test -= sentValueInSats;
      }

      if (receivedValueInSats) {
        if (confirmed) {
          totalConfirmedReceivedInSats += receivedValueInSats;
        } else {
          totalUnconfirmedReceivedInSats += receivedValueInSats;
        }

        if (timeMoment) {
          if (lastReceivedMoment === null) {
            lastReceivedMoment = timeMoment;
          } else if (timeMoment.isAfter(lastReceivedMoment)) {
            lastReceivedMoment = timeMoment;
          }
        }
      } else if (sentValueInSats) {
        if (confirmed) {
          totalConfirmedSentInSats += sentValueInSats + feeInSats;
        } else {
          totalUnconfirmedSentInSats += sentValueInSats + feeInSats;
        }
      }
    });

    const result = {
      totalConfirmedReceivedInSats,
      totalUnconfirmedReceivedInSats,
      totalConfirmedSentInSats,
      totalUnconfirmedSentInSats,
      totalBalanceInSats: Math.max(
        totalConfirmedReceivedInSats +
          totalUnconfirmedReceivedInSats -
          totalConfirmedSentInSats -
          totalUnconfirmedSentInSats,
        0
      ),
      lastReceivedMoment
    };

    return result;
  }

  updateTransactionHistory() {
    this.neatTransactionHistory = formattedTransactionsFromAddresses(
      this.rawTransactions,
      this.receiveAddresses,
      this.changeAddresses
    );
  }

  async unusedReceiveAddress() {
    let unusedAddress = null;

    while (!unusedAddress) {
      const receiveAddress = this.receiveAddresses[
        this.unusedReceiveAddressIndex
      ];

      if (!receiveAddress) {
        //TODO test this
        this.appendDerivedAddresses(5, "receive");
      }

      await this.updateAddressBalance(receiveAddress);

      const balances = this.addressBalances[receiveAddress];
      if (balances) {
        const { confirmedValueInSats, unconfirmedValueInSats } = balances;

        if (!confirmedValueInSats && !unconfirmedValueInSats) {
          //Address is clean
          unusedAddress = receiveAddress;
        } else {
          this.unusedReceiveAddressIndex++;
        }
      }
    }

    return unusedAddress;
  }
}
