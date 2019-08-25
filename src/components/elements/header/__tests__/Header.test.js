/**
 * @format
 */

import "react-native";
import React from "react";
import { shallow, render } from "enzyme";

import Header from "../Header";

describe("Header", () => {
	describe("Rendering", () => {
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

		it("should match to snapshot WITHOUT profile button", () => {
			const props = {};

			props.navigation = { state: { routes: [], index: 0 } };

			const component = render(<Header {...props}/>);
			expect(component).toMatchSnapshot();
		});

		it("should match to snapshot WITH profile button", () => {
			const props = {};

			props.navigation = { state: { routes: [], index: 0 } };

			const component = render(<Header {...props} onProfilePress={() => {}}/>);
			expect(component).toMatchSnapshot();
		});

		it("animated should match to snapshot", () => {
			const props = {};

			props.navigation = { state: { routes: [], index: 0 } };

			const component = render(<Header animate {...props}/>);
			expect(component).toMatchSnapshot();
		});
	});
});
