import React from "react";
import { inject, observer } from "mobx-react";

import OnBoarding from "./onboarding/OnBoarding";
import MainNavigator from "./routes/MainNavigator";

//TODO check if we have a saved wallet, or if we must on board the user

const Main = props => {
  const { wallet } = props;

  if (wallet.isInitialized) {
    return <MainNavigator/>;
  }

  return <OnBoarding/>;
};

export default inject("wallet")(observer(Main));
