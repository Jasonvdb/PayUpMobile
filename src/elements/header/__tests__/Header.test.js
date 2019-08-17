/**
 * @format
 */

import "react-native";
import React from "react";
import { shallow, render } from "enzyme";

import Header from "../Header";

describe("BottomTabBar", () => {
	describe("Rendering", () => {
		const origConsole = console.error;
		beforeEach(() => {
			console.error = message => {
				if (message.startsWith("Warning:")) {
					return;
				}

				origConsole(message);
			};
		});
		afterEach(() => {
			console.error = origConsole;
		});

		it("should match to snapshot", () => {
			const props = {};

			props.navigation = { state: { routes: [], index: 0 } };

			const component = render(<Header {...props}/>);
			expect(component).toMatchSnapshot();
		});
	});
});
