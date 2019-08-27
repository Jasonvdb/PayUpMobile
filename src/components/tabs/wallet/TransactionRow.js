/**
 * Home screen with bets and transaction summary
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import TxIcon from "./TxIcon";
import displayCurrency from "../../../helpers/displayCurrency";
import theme from "../../../config/theme";
import moment from "moment";

const TransactionRow = props => {
  const {
    txid,
    confirmed,
    feeInSats,
    outputAddress,
    receivedValueInSats,
    sentValueInSats,
    timeMoment,
    onPress
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  );
};

TransactionRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  txid: PropTypes.string.isRequired,
  confirmed: PropTypes.bool.isRequired,
  feeInSats: PropTypes.number.isRequired,
  outputAddress: PropTypes.string.isRequired,
  receivedValueInSats: PropTypes.number,
  sentValueInSats: PropTypes.number,
  timeMoment: PropTypes.instanceOf(moment)
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
    paddingRight: 18
  },
  detailsContainer: {
    flex: 4
  },
  valueContainer: {
    flex: 2,
    display: "flex",
    justifyContent: "flex-end"
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
