/**
 * AppSats bitcoin wallet / betting app

 * @format
 * @flow
 */

import React from "react";
import { Provider } from "mobx-react";
import { YellowBox } from "react-native";

import wallet from "./src/stores/wallet";
import Main from "./src/components/Main";

YellowBox.ignoreWarnings([
  "Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.\n" +
    "\n" +
    "Please update the following components: withAnimatable",

  "Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.\n" +
    "\n" +
    "Please update the following components: Carousel"
]);

//TODO check if we have a saved wallet, or if we must onboard the user

const App = () => {
  return (
    <Provider wallet={wallet}>
      <Main/>
    </Provider>
  );
};

export default App;
