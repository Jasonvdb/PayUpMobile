/**
 * @format
 */

import "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { shallow, mount, render } from "enzyme";

import CtaButton from "../CtaButton";

const testProps = {
	route: {},
	onPress: () => {},
	onLongPress: () => {},
	getAccessibilityLabel: () => {},
	isActive: false
};

describe("CtaButton", () => {
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
				<CtaButton {...testProps} isActive={false}/>
			);
			expect(inactiveComponent).toMatchSnapshot("Route not active");

			const activeComponent = render(<CtaButton {...testProps} isActive/>);
			expect(activeComponent).toMatchSnapshot("Route active");
		});
	});
	describe("Interaction", () => {
		describe("onPress", () => {
			it("should call onPress", () => {
				const mockOnPress = jest.fn();
				const wrapper = shallow(
					<CtaButton {...testProps} onPress={mockOnPress}/>
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
					<CtaButton {...testProps} onLongPress={mockOnPress}/>
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
