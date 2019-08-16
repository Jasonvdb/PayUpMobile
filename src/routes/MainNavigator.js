import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../tabs/home/HomeScreen";
import SettingsScreen from "../tabs/settings/SettingsScreen";
import Header from "../elements/header/Header";
import ProfileScreen from "../tabs/settings/profile/ProfileScreen";
import BottomTab from "../elements/tab/BottomTab";
import BottomTabBar2 from "../elements/tab/BottomTabBar2";

const defaultNavigationOptions = {
	headerTitle: props => <Header {...props}/>,
	headerLeft: null,
	headerStyle: {
		borderBottomWidth: 0,
		height: 80
	}
};

const DummyScreen = () => (
	<View>
		<Text>Dummy screen</Text>
	</View>
);

const HomeNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		}
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions
	},
);

const WalletNavigator = createStackNavigator(
	{
		Wallet: {
			screen: DummyScreen
		}
	},
	{
		initialRouteName: "Wallet",
		defaultNavigationOptions
	},
);

const BetsNavigator = createStackNavigator(
	{
		Bets: {
			screen: DummyScreen
		}
	},
	{
		initialRouteName: "Bets",
		defaultNavigationOptions
	},
);

const SettingsNavigator = createStackNavigator(
	{
		Settings: {
			screen: SettingsScreen
		},
		Profile: {
			screen: ProfileScreen
		}
	},
	{
		initialRouteName: "Settings",
		defaultNavigationOptions
	},
);

const MainTabNavigator = createBottomTabNavigator(
	{
		Home: HomeNavigator,
		Wallet: WalletNavigator,
		Bets: BetsNavigator,
		Settings: SettingsNavigator
	},
	{
		tabBarComponent: BottomTabBar2
	},
);

export default createAppContainer(MainTabNavigator);
