import React from "react";
import { shallow, render } from "enzyme";
import OnBoarding from "../OnBoarding";
import Wallet from "../../../wallet/Wallet";

describe("on boarding", () => {
  const origErrorConsole = console.error;
  const origWarnConsole = console.warn;
  beforeEach(() => {
    console.error = message => {
      if (message.indexOf("Use PascalCase" > -1)) {
        return;
      }

      origErrorConsole(message);
    };

    console.warn = message => {
      if (message.indexOf("Animated:" > -1)) {
        return;
      }

      origWarnConsole(message);
    };
  });

  afterEach(() => {
    console.error = origErrorConsole;
    console.warn = origWarnConsole;
  });

  describe("Rendering", () => {
    let wallet;
    beforeAll(() => {
      wallet = new Wallet();
    });

    it("should match to snapshot - on boarding container", () => {
      const component = render(<OnBoarding wallet={wallet}/>);
      expect(component).toMatchSnapshot("On boarding container snapshot");
    });
  });

  // describe("interaction", () => {
  //
  // });
});
