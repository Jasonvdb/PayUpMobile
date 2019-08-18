/**
 * @format
 */

import "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { shallow, render } from "enzyme";

import TabButton from "../TabButton";

const testProps = {
	route: {},
	onPress: () => {},
	onLongPress: () => {},
	getAccessibilityLabel: () => {},
	isActive: true,
	iconString: "user"
};

describe("TabButton", () => {
	const origConsole = console.error;
	beforeEach(() => {
		console.error = message => {
			if (message.indexOf("PascalCase" > -1)) {
				return;
			}

			origConsole(message);
		};
	});
	afterEach(() => {
		console.error = origConsole;
	});
	
	describe("Rendering", () => {
		it("should match to snapshot ", () => {
			const inactiveComponent = render(
				<TabButton {...testProps} isActive={false}/>,
			);
			expect(inactiveComponent).toMatchSnapshot("Inactive TabButton");

			const activeComponent = render(<TabButton {...testProps} isActive/>);
			expect(activeComponent).toMatchSnapshot("Active TabButton");
		});
	});

	describe("Interaction", () => {
		describe("onPress", () => {
			it("should call onPress", () => {
				const mockOnPress = jest.fn();
				const wrapper = shallow(
					<TabButton {...testProps} onPress={mockOnPress}/>,
				);
				wrapper
					.find(TouchableOpacity)
					.first()
					.props()
					.onPress();

				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1);
			});
		});

		describe("onLongPress", () => {
			it("should call onLongPress", () => {
				const mockOnPress = jest.fn();
				const wrapper = shallow(
					<TabButton {...testProps} onLongPress={mockOnPress}/>,
				);
				wrapper
					.find(TouchableOpacity)
					.first()
					.props()
					.onLongPress();

				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1);
			});
		});
	});
});
