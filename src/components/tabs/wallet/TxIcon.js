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
  const { variant } = props;

  let rootStyle = styles.root;
  let iconName = "";

  if (variant === "sent") {
    iconName = "ios-arrow-round-up";
    rootStyle = { ...rootStyle, ...styles.sent };
  }

  if (variant === "received") {
    iconName = "ios-arrow-round-down";
    rootStyle = { ...rootStyle, ...styles.received };
  }

  return (
    <View style={rootStyle}>
      <Icon style={styles.icon} name={iconName} size={35} color={"#FFF"}/>
    </View>
  );
};

TxIcon.defaultProps = {};

TxIcon.propTypes = {
  variant: PropTypes.oneOf(["sent", "received"])
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
  sent: {
    backgroundColor: theme.sentColor
  },
  received: {
    backgroundColor: theme.receivedColor
  },
  icon: {
    top: -1
  }
});
export default TxIcon;
