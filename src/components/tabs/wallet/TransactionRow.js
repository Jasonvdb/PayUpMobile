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
import TxIcon from "./TxIcon";
import displayCurrency from "../../../helpers/displayCurrency";
import theme from "../../../config/theme";

const TransactionRow = props => {
  const {
    txid,
    confirmed,
    feeInSats,
    outputAddress,
    receivedValueInSats,
    sentValueInSats,
    timeMoment
  } = props;

  return (
    <View style={styles.root}>
      <View style={styles.iconContainer}>
        <TxIcon
          variant={sentValueInSats ? "sent" : "received"}
          style={styles.icon}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.fromText}>Wallet funds</Text>

        <Text style={styles.timeText}>
          {timeMoment ? timeMoment.format("D MMM, h:mm:ss a") : "unconfirmed"}
        </Text>
      </View>

      <View style={styles.valueContainer}>
        {sentValueInSats ? (
          <Text style={{ ...styles.valueText, ...styles.sentText }}>
            -{displayCurrency(sentValueInSats)}
          </Text>
        ) : null}
        {receivedValueInSats ? (
          <Text style={{ ...styles.valueText, ...styles.receivedText }}>
            {displayCurrency(receivedValueInSats)}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

TransactionRow.propTypes = {
  onPress: PropTypes.func.isRequired
  // children: PropTypes.string,
  // subTitle: PropTypes.string,
  // animate: PropTypes.bool
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "#FFF",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 26,
    marginBottom: 8,
    borderRadius: 6,

    paddingLeft: 18,
    paddingRight: 18
  },
  iconContainer: {
    //flex: 1,

    paddingRight: 18
    // borderStyle: "solid",
    // borderColor: "green",
    // borderWidth: 1
  },
  detailsContainer: {
    flex: 4

    // borderStyle: "solid",
    // borderColor: "blue",
    // borderWidth: 1
  },
  valueContainer: {
    flex: 2,
    display: "flex",
    justifyContent: "flex-end"

    // borderStyle: "solid",
    // borderColor: "red",
    // borderWidth: 1
  },
  fromText: {
    fontSize: 14,
    color: theme.fontColor1,
    fontWeight: "500"
  },
  timeText: {
    fontSize: 12,
    color: theme.fontColor2
  },
  valueText: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "right"
  },
  receivedText: {
    color: theme.receivedColor
  },
  sentText: {
    color: theme.sentColor
  }
});
export default TransactionRow;
