/**
 * @format
 */

import "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { shallow, mount } from "enzyme";

import CtaButton from "../CtaButton";

describe("CtaButton", () => {
	describe("Rendering", () => {
		it("should match to snapshot ", () => {
			const component = shallow(<CtaButton onPress={() => {}}/>);
			expect(component).toMatchSnapshot();
		});
	});

	describe("Interaction", () => {
		describe("onPress", () => {
			it("should call onPress", () => {
				const mockOnPress = jest.fn();
				const wrapper = shallow(<CtaButton onPress={mockOnPress}/>);
				wrapper
					.find(TouchableOpacity)
					.first()
					.props()
					.onPress();

				expect(mockOnPress).toHaveBeenCalled();
				expect(mockOnPress).toHaveBeenCalledTimes(1); // 5. checking return values
			});
		});
	});
});
