import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import OnBoarding from "./onboarding/OnBoarding";
import MainNavigator from "./routes/MainNavigator";
import Wallet from "../wallet/Wallet";

//TODO check if we have a saved wallet, or if we must on board the user

const Main = props => {
  const { wallet } = props;

  if (wallet.isInitialized) {
    return <MainNavigator/>;
  }

  return <OnBoarding/>;
};

Main.propTypes = {
  wallet: PropTypes.instanceOf(Wallet)
};

export default inject("wallet")(observer(Main));
