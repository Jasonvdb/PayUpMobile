import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import TxIcon from "./TxIcon";
import displayCurrency from "../../../helpers/displayCurrency";
import theme from "../../../config/theme";
import moment from "moment";
import Button from "../../elements/button/Button";
import settings from "../../../config/settings";

const TransactionDetails = props => {
  const {
    txid,
    confirmed,
    feeInSats,
    outputAddress,
    receivedValueInSats,
    sentValueInSats,
    timeMoment
  } = props;

  let iconVariant;
  if (sentValueInSats) {
    iconVariant = "sent";
  } else if (receivedValueInSats) {
    iconVariant = "received";
  }

  return (
    <View style={styles.root}>
      <View>
        {sentValueInSats ? (
          <Text style={{ ...styles.valueText, ...styles.sentText }}>
            Sent {displayCurrency(sentValueInSats)}
          </Text>
        ) : null}
        {receivedValueInSats ? (
          <Text style={{ ...styles.valueText, ...styles.receivedText }}>
            Received {displayCurrency(receivedValueInSats)}
          </Text>
        ) : null}

        <Text style={styles.feeText}>Fee: {displayCurrency(feeInSats)}</Text>

        <Text style={styles.confirmationText}>
          {confirmed ? "Confirmed" : "Unconfirmed"} transaction
        </Text>
      </View>

      {iconVariant ? (
        <TxIcon
          confirmed={confirmed}
          size={"large"}
          variant={iconVariant}
          style={styles.icon}
        />
      ) : null}

      {timeMoment ? (
        <Text style={styles.dateText}>{timeMoment.format("LLLL")}</Text>
      ) : null}

      <Button url={settings.blockExplorerTxUrl(txid)} variant={"text"}>
        Open in block explorer
      </Button>
    </View>
  );
};

TransactionDetails.propTypes = {
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
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    padding: 20
  },
  valueText: {
    fontWeight: "600",
    fontSize: 26,
    textAlign: "center"
  },
  feeText: {
    fontWeight: "200",
    fontSize: 16,
    textAlign: "center",
    color: theme.fontColor2,
    marginTop: 10
  },
  receivedText: {
    color: theme.receivedColor
  },
  sentText: {
    color: theme.sentColor
  },
  confirmationText: {
    color: theme.fontColor2,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400"
  },
  dateText: {
    color: theme.fontColor2,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "200"
  }
});

export default TransactionDetails;
