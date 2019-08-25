import React from "react";
import { shallow, render } from "enzyme";
import Slide from "../Slide";

describe("on boarding slide", () => {
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
    it("should match to snapshot - on boarding slide", () => {
      //TODO render all different scenarios of this
      // const component = render(<Slide/>);
      // expect(component).toMatchSnapshot("On boarding container snapshot");
    });
  });

  // describe("interaction", () => {
  //
  // });
});
