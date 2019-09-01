import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  Linking,
  View,
  TouchableHighlight,
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import theme from "../../../config/theme";

// 1. Changed to a class based component
class Button extends Component {
  constructor(props) {
    super(props);
  }

  // 2. Custom function called onPress TouchableOpacity
  onPressHandler = () => {
    const { onPress, url, disabled } = this.props;
    if (disabled) {
      return;
    }

    if (url) {
      Linking.openURL(url);
    }
    onPress();
  };

  render() {
    const { children, variant, disabled, style } = this.props;

    let labelStyle = styles.label;
    let containerStyle = { ...styles.container };
    let gradientContainerProps = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      colors: theme.defaultButtonGradients
    };

    const androidUnderlayColor = "transparent";

    switch (variant) {
      case "cta": {
        labelStyle = { ...labelStyle, ...styles.ctaLabel };
        containerStyle = { ...containerStyle, ...styles.ctaContainer };
        gradientContainerProps = {
          ...gradientContainerProps,
          colors: !disabled
            ? theme.ctaButtonGradients
            : theme.disabledButtonGradients
        };
        break;
      }
      case "text": {
        labelStyle = { ...labelStyle, ...styles.textLabel };
        containerStyle = { ...containerStyle, ...styles.textContainer };
        gradientContainerProps = null;
        break;
      }
    }

    const Container = gradientContainerProps ? LinearGradient : View;

    const content = (
      <Container {...gradientContainerProps} style={containerStyle}>
        <Text style={labelStyle}>{children}</Text>
      </Container>
    );

    if (Platform.OS === "ios") {
      return (
        <TouchableOpacity onPress={this.onPressHandler} style={style}>
          {content}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableHighlight
        underlayColor={androidUnderlayColor}
        onPress={this.onPressHandler}
      >
        <View style={style}>{content}</View>
      </TouchableHighlight>
    );
  }
}

Button.defaultProps = {
  variant: "default",
  style: {},
  onPress: () => {},
  disabled: false
};

Button.propTypes = {
  onPress: PropTypes.func,
  url: PropTypes.string,
  children: PropTypes.string,
  variant: PropTypes.oneOf(["default", "cta", "text"]),
  style: PropTypes.object,
  disabled: PropTypes.bool
};

const styles = {
  container: {
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 30,
    height: 55,
    color: "#fff"
  },
  label: {
    alignSelf: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "200",
    textTransform: "uppercase"
  },
  ctaContainer: {
    height: 55
  },
  ctaLabel: {
    fontSize: 22
  },
  textContainer: {
    height: 45
  },
  textLabel: {
    color: theme.defaultButtonLabelColor,
    fontSize: 18
  }
};

export default Button;
