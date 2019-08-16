import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home/HomeScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import Header from "../elements/header/Header";
import ProfileScreen from "../screens/profile/ProfileScreen";

const defaultNavigationOptions = {
	headerTitle: props => <Header {...props}/>,
	headerLeft: null,
	headerStyle: {
		borderBottomWidth: 0,
		height: 80
	}
};

const MainNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Settings: {
			screen: SettingsScreen
		},
		Profile: {
			screen: ProfileScreen
		}
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions
	},
);

export default createAppContainer(MainNavigator);
