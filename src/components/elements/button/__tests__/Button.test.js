import React from "react";
import { shallow, render } from "enzyme";
import Button from "../Button";

const mockOpenURL = jest.fn();

// Set openURL module function to jest.fn
jest.mock("Linking", () => ({
  openURL: mockOpenURL
}));

describe("button", () => {
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
    it("should match to snapshot - CTA", () => {
      const component = render(<Button variant={"cta"}>CTA button</Button>);
      expect(component).toMatchSnapshot("CTA button snapshot");
    });

    it("should match to snapshot - Default", () => {
      const component = render(<Button>Default button</Button>);
      expect(component).toMatchSnapshot("Default button snapshot");
    });

    it("should match to snapshot - Text", () => {
      const component = render(<Button variant={"text"}>Text button</Button>);
      expect(component).toMatchSnapshot("Default button snapshot");
    });
  });

  describe("interaction", () => {
    describe("onPressHandler", () => {
      const mockOnPress = jest.fn();
      let instance;

      beforeEach(() => {
        instance = shallow(
          <Button onPress={mockOnPress} url="https://www.test.com">
            Press me
          </Button>
        ).instance();
        jest.clearAllMocks();
      });

      it("should call onPress", () => {
        instance.onPressHandler();
        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });

      it("should call openURL if url is provided", () => {
        instance.onPressHandler();
        expect(mockOpenURL).toHaveBeenCalled();
        expect(mockOpenURL).toHaveBeenCalledTimes(1);
        expect(mockOpenURL).toHaveBeenCalledWith("https://www.test.com");
      });

      it("should not call openURL if url is not provided", () => {
        const innerInstance = shallow(
          <Button onPress={mockOnPress}>test label</Button>
        ).instance();
        innerInstance.onPressHandler();
        expect(mockOpenURL).not.toHaveBeenCalled();
      });

      it("should not call anything if neither url nor onPress or is not provided", () => {
        const innerInstance = shallow(<Button>test label</Button>).instance();
        innerInstance.onPressHandler();
        expect(mockOpenURL).not.toHaveBeenCalled();
      });
    });
  });
});
