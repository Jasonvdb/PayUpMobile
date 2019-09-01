import React from "react";
import { View, Text } from "react-native";
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../tabs/home/HomeScreen";
import SettingsScreen from "../tabs/settings/SettingsScreen";
import Header from "../elements/header/Header";
import ProfileScreen from "../tabs/settings/profile/ProfileScreen";
import BottomTabBar from "../elements/bottom-tab/BottomTabBar";
import BetsScreen from "../tabs/bets/BetsScreen";
import BetView from "../tabs/bets/BetView";
import WalletScreen from "../tabs/wallet/WalletScreen";

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

const DummyMakeBetScreen = () => (
	<View>
		<Text>DummyMakeBetScreen</Text>
	</View>
);

const HomeNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Bet: {
			screen: BetView
		}
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions
	}
);

const WalletNavigator = createStackNavigator(
	{
		Wallet: {
			screen: WalletScreen
		}
	},
	{
		initialRouteName: "Wallet",
		defaultNavigationOptions
	}
);

const BetsNavigator = createStackNavigator(
	{
		Bets: {
			screen: BetsScreen
		},
		Bet: {
			screen: BetView
		}
	},
	{
		initialRouteName: "Bets",
		defaultNavigationOptions
	}
);

const NewBetsNavigator = createStackNavigator(
	{
		NewBet: {
			screen: DummyMakeBetScreen
		}
	},
	{
		initialRouteName: "NewBet",
		defaultNavigationOptions
	}
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
	}
);

const MainTabNavigator = createBottomTabNavigator(
	{
		Home: HomeNavigator,
		Wallet: WalletNavigator,
		NewBet: NewBetsNavigator,
		Bets: BetsNavigator,
		Settings: SettingsNavigator
	},
	{
		tabBarComponent: BottomTabBar
	}
);

export default createAppContainer(MainTabNavigator);
