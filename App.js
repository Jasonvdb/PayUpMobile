/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";

import MainNavigator from "./src/components/routes/MainNavigator";
import Container from "./src/components/onboarding/Container";

import { YellowBox } from "react-native";

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
	return <Container/>;
};

export default App;
