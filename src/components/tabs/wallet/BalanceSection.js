import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import Wallet from "../../../wallet/Wallet";
import displayCurrency from "../../../helpers/displayCurrency";
import theme from "../../../config/theme";

const BalanceSection = props => {
  const { wallet, style, maskValues, hideBets } = props;

  const balances = wallet.balances;
  const { totalBalanceInSats } = balances;

  return (
    <View style={{ ...styles.root, ...style }}>
      <View>
        <Text style={styles.subHeadingText}>In wallet</Text>
        <Text style={{ ...styles.valueText, ...styles.receivedText }}>
          {maskValues ? "---" : displayCurrency(totalBalanceInSats)}
        </Text>
      </View>

      {!hideBets ? (
        <View>
          <Text style={{ ...styles.subHeadingText, ...styles.rightAlignText }}>
            Locked up in bets
          </Text>
          <Text style={{ ...styles.valueText, ...styles.rightAlignText }}>
            {maskValues ? "---" : displayCurrency(0)}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

BalanceSection.defaultProps = {
  style: {},
  maskValues: false,
  hideBets: false
};

BalanceSection.propTypes = {
  wallet: PropTypes.instanceOf(Wallet).isRequired,
  style: PropTypes.object,
  maskValues: PropTypes.bool,
  hideBets: PropTypes.bool
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: theme.sidePadding,
    paddingRight: theme.sidePadding
  },
  subHeadingText: {
    fontWeight: "300",
    fontSize: 12,
    color: theme.fontColor2,
    marginBottom: 2
  },
  valueText: {
    fontWeight: "600",
    fontSize: 26,
    color: theme.fontColor1
  },
  receivedText: {
    color: theme.receivedColor
  },
  rightAlignText: {
    textAlign: "right"
  }
});

export default inject("wallet")(observer(BalanceSection));
