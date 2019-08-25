import React, { Component } from "react";
import { Text, TouchableOpacity, Linking } from "react-native";
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
    const { onPress, url } = this.props;
    if (url) {
      Linking.openURL(url);
    }
    onPress();
  };

  render() {
    const { children, variant, style } = this.props;

    let labelStyle = styles.label;
    let containerStyle = { ...styles.container, ...style };
    let gradientContainerProps = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      colors: theme.defaultButtonGradients
    };

    switch (variant) {
      case "cta": {
        labelStyle = { ...labelStyle, ...styles.ctaLabel };
        containerStyle = { ...containerStyle, ...styles.ctaContainer };
        gradientContainerProps = {
          ...gradientContainerProps,
          colors: theme.ctaButtonGradients
        };
        break;
      }
      case "text": {
        labelStyle = { ...labelStyle, ...styles.textLabel };
        containerStyle = { ...containerStyle, ...styles.textContainer };
        gradientContainerProps = {
          colors: ["transparent"]
        };
        break;
      }
    }

    //TODO don't use TouchableOpacity for android

    return (
      <TouchableOpacity onPress={this.onPressHandler}>
        <LinearGradient {...gradientContainerProps} style={containerStyle}>
          <Text style={labelStyle}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  variant: "default",
  style: {},
  onPress: () => {}
};

Button.propTypes = {
  onPress: PropTypes.func,
  url: PropTypes.string,
  children: PropTypes.string,
  variant: PropTypes.oneOf(["default", "cta", "text"]),
  style: PropTypes.object
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
