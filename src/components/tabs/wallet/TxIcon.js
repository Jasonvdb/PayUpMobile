/**
 * Home screen with bets and transaction summary
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import theme from "../../../config/theme";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const TxIcon = props => {
  const { variant, size, confirmed } = props;

  let rootStyle = styles.root;
  let iconStyle = styles.icon;
  let iconName = "";
  let iconSize = 35;

  if (variant === "sent") {
    iconName = "ios-arrow-round-up";
    rootStyle = { ...rootStyle, ...styles.sent };
  }

  if (variant === "received") {
    iconName = "ios-arrow-round-down";
    rootStyle = { ...rootStyle, ...styles.received };
  }

  if (!confirmed) {
    rootStyle = { ...rootStyle, ...styles.unconfirmed };
  }

  if (size === "large") {
    rootStyle = { ...rootStyle, ...styles.largeRoot };
    iconSize = 70;
    iconStyle = { ...iconStyle, ...styles.largeIcon };
  }

  return (
    <View style={rootStyle}>
      <Icon style={iconStyle} name={iconName} size={iconSize} color={"#FFF"}/>
    </View>
  );
};

TxIcon.defaultProps = {
  size: "small",
  confirmed: true
};

TxIcon.propTypes = {
  variant: PropTypes.oneOf(["sent", "received"]),
  size: PropTypes.oneOf(["small", "large"]),
  confirmed: PropTypes.bool
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 25,
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  largeRoot: {
    width: 96,
    height: 96,
    borderRadius: 60
  },
  sent: {
    backgroundColor: theme.sentColor
  },
  received: {
    backgroundColor: theme.receivedColor
  },
  unconfirmed: {
    backgroundColor: theme.unconfirmedColor
  },
  icon: {
    top: -1
  },
  largeIcon: {
    top: 1
  }
});
export default TxIcon;