import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";

import theme from "../../../config/theme";

const CtaButton = ({
  route,
  onPress,
  onLongPress,
  getAccessibilityLabel,
  isActive
}) => (
  <Animatable.View
    animation={isActive ? "bounceOut" : "bounceIn"}
    easing={"ease-in-out"}
    duration={500}
  >
    <TouchableOpacity
      onPress={() => onPress(route)}
      onLongPress={() => onLongPress(route)}
      accessibilityLabel={getAccessibilityLabel({
        route
      })}
    >
      <LinearGradient
        colors={theme.ctaButtonGradients}
        style={styles.ctaButton}
      >
        <Icon name={"ios-add"} size={35} color={"#FFF"}/>
      </LinearGradient>
    </TouchableOpacity>
  </Animatable.View>
);

CtaButton.propTypes = {
  route: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
  getAccessibilityLabel: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default CtaButton;

const styles = StyleSheet.create({
  ctaButton: {
    top: -39,
    backgroundColor: theme.brand1,
    width: 56,
    height: 56,
    borderRadius: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowColor: theme.brand1
  }
});
