/**
 * @format
 */

import "react-native";
import React from "react";
import { shallow, render } from "enzyme";

import BottomTabBar from "../BottomTabBar";

import renderer from "react-test-renderer";
import { Text, View } from "react-native";

const DummyScreen = () => (
	<View>
		<Text>Dummy screen</Text>
	</View>
);

const testProps = {
	onTabPress: () => {},
	onTabLongPress: () => {},
	getAccessibilityLabel: () => {},
	navigation: {
		state: {
			routes: [
				{
					key: "HomeTest",
					isTransitioning: false,
					index: 0,
					routes: [{ routeName: "Home", key: "id-1566063909546-0" }],
					routeName: "Home"
				},
				{
					key: "WalletTest",
					isTransitioning: false,
					index: 0,
					routes: [{ routeName: "Wallet", key: "id-1566063909546-1" }],
					routeName: "Wallet"
				},
				{
					key: "BetsTest",
					isTransitioning: false,
					index: 0,
					routes: [{ routeName: "Bets", key: "id-1566063909546-2" }],
					routeName: "Bets"
				},
				{
					key: "SettingsTest",
					isTransitioning: false,
					index: 0,
					routes: [{ routeName: "Settings", key: "id-1566063909546-3" }],
					routeName: "Settings"
				}
			],
			index: 0
		}
	}
};

describe("BottomTabBar", () => {
	describe("Rendering", () => {
		it("should render", () => {
			//renderer.create(<BottomTabBar {...testProps}/>);
		});

		it("should match to snapshot", () => {
			const component = shallow(<BottomTabBar {...testProps}/>);
			expect(component).toMatchSnapshot();
		});
	});
});
