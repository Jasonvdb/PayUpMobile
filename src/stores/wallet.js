import { action, computed, decorate, observable } from "mobx";
import Wallet from "../wallet/Wallet";

decorate(Wallet, {
  isInitialized: computed,
  xpub: observable,
  createNewWallet: action,
  importExistingWallet: action,
  balances: computed,
  updateTransactionHistory: action,
  neatTransactionHistory: observable
});

const wallet = new Wallet();

export default wallet;
