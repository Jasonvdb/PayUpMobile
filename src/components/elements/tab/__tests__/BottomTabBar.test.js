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
					key: "Home",
					isTransitioning: false,
					index: 0,
					routes: [{ routeName: "Home", key: "id-1566063909546-0" }],
					routeName: "Home"
				},
				{
					key: "Wallet",
					isTransitioning: false,
					index: 0,
					routes: [{ routeName: "Wallet", key: "id-1566063909546-1" }],
					routeName: "Wallet"
				},
				{
					key: "Bets",
					isTransitioning: false,
					index: 0,
					routes: [{ routeName: "Bets", key: "id-1566063909546-2" }],
					routeName: "Bets"
				},
				{
					key: "Settings",
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
		it("should match to snapshot", () => {
			const component = shallow(<BottomTabBar {...testProps}/>);
			expect(component).toMatchSnapshot();
		});
	});

	describe("Interaction", () => {
		describe("onTabPressHandler", () => {
			it("should call onTabPress", () => {
				// Arrange
				const mockOnPress = jest.fn(); // 1. mock function
				const component = shallow(<BottomTabBar {...testProps} onTabPress={mockOnPress}/>);
				const instance = component.instance(); // 3. getting an instance of component

				// Act
				instance.onTabPressHandler(); // 4. manually triggering onPressHandler()

				// Assert
				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1); // 5. checking return values
			});

			it("should call onTabLongPress", () => {
				// Arrange
				const mockOnPress = jest.fn(); // 1. mock function
				const component = shallow(<BottomTabBar {...testProps} onTabLongPress={mockOnPress}/>);
				const instance = component.instance(); // 3. getting an instance of component

				// Act
				instance.onTabLongPressHandler(); // 4. manually triggering onPressHandler()

				// Assert
				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1); // 5. checking return values
			});
		});
	});
});
