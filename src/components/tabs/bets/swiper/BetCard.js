import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import theme from "../../../../config/theme";
import LinearGradient from "react-native-linear-gradient";
import displayCurrency from "../../../../helpers/displayCurrency";

const BetCard = props => {
  const { item, index, isSelected } = props;

  const { type, onPress } = item;

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={theme[`${type}Gradients`] || []}
        style={styles.root}
      >
        <View style={styles.row1}>
          <Text style={styles.headingText}>{displayCurrency(400000)} bet</Text>
        </View>

        <View style={styles.row2}>
          <Text style={styles.subHeading}>Winning outcome</Text>
          <Text style={styles.valueText}>Muller gets a baby</Text>
        </View>

        <View style={styles.row3}>
          <View>
            <Text style={styles.subHeading}>Buddy</Text>
            <Text style={styles.valueText}>Mario</Text>
          </View>
          <View>
            <Text style={styles.subHeading}>Ends in</Text>
            <Text style={styles.valueText}>6 hours</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

BetCard.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.oneOf(["active", "lost", "won", "add"])
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool
};

const styles = StyleSheet.create({
  root: {
    height: 160,
    borderRadius: 12,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: theme.brand1,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 12,

    display: "flex",
    justifyContent: "space-around"
  },
  headingText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 24
  },
  subHeading: {
    color: "#FFF",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "300",
    marginBottom: 2
  },
  valueText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500"
  },
  row1: {
    flex: 1
  },
  row2: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  row3: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row"
  }
});

export default BetCard;
