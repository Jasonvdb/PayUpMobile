/**
 * @format
 */

import "react-native";
import React from "react";
import { shallow, render } from "enzyme";

import ProfileButton from "../ProfileButton";

describe("ProfileButton", () => {
	describe("Rendering", () => {
		it("should match to snapshot ", () => {
			const component = shallow(<ProfileButton onPress={() => {}}/>);
			expect(component).toMatchSnapshot();
		});
	});

	describe("Interaction", () => {
		describe("onPressHandler", () => {
			it("should call onPress", () => {
				// Arrange
				const mockOnPress = jest.fn(); // 1. mock function
				const component = shallow(
					<ProfileButton
						onPress={mockOnPress} // 2. passing in mock function as props
					/>,
				);
				const instance = component.instance(); // 3. getting an instance of component

				// Act
				instance.onPressHandler(); // 4. manually triggering onPressHandler()

				// Assert
				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1); // 5. checking return values
			});
		});
	});
});
