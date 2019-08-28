import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import TxIcon from "./TxIcon";
import displayCurrency from "../../../helpers/displayCurrency";
import theme from "../../../config/theme";
import moment from "moment";
import Button from "../../elements/button/Button";
import settings from "../../../config/settings";
import BottomSheet from "../../elements/bottom-sheet/BottomSheet";

const TransactionContent = ({
  txid,
  sentValueInSats,
  receivedValueInSats,
  feeInSats,
  confirmed,
  timeMoment
}) => {
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

class TransactionDetailsBottomSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    //If we have a transaction
    if (!prevProps.transaction && this.props.transaction && this.RBSheet) {
      this.RBSheet.open();

      //TODO start interval for updating this address
    }
  }

  render() {
    const { transaction, onClose } = this.props;

    return (
      <BottomSheet
        closeOnDragDown
        ref={ref => {
          this.RBSheet = ref;
        }}
        onClose={onClose}
        height={340}
        duration={200}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center"
          }
        }}
      >
        {transaction ? <TransactionContent {...transaction}/> : null}
      </BottomSheet>
    );
  }
}

TransactionDetailsBottomSheet.propTypes = {
  transaction: PropTypes.shape({
    txid: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired,
    feeInSats: PropTypes.number.isRequired,
    outputAddress: PropTypes.string.isRequired,
    receivedValueInSats: PropTypes.number,
    sentValueInSats: PropTypes.number,
    timeMoment: PropTypes.instanceOf(moment)
  }),
  onClose: PropTypes.func.isRequired
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

export default TransactionDetailsBottomSheet;
